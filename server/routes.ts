import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import sgMail from "@sendgrid/mail";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Client } from "@hubspot/api-client";

// Definir __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializar cliente de HubSpot
const hubspotApiKey = process.env.HUBSPOT_API_KEY;
const hubspotClient = new Client({ accessToken: hubspotApiKey });

// Constante para verificar si HubSpot está configurado
const HUBSPOT_ENABLED = !!hubspotApiKey;

// Log para verificar estado de la configuración de HubSpot
if (HUBSPOT_ENABLED) {
  console.log("HubSpot está configurado y habilitado correctamente");
  // Intentar hacer una petición de prueba a HubSpot
  setTimeout(async () => {
    try {
      const response = await hubspotClient.apiRequest({
        method: 'GET',
        path: '/crm/v3/properties/contacts',
      });
      console.log("✅ Conexión con HubSpot verificada exitosamente");
    } catch (error) {
      console.error("❌ Error al conectar con HubSpot:", error.message);
      console.error("Detalles del error:", error);
    }
  }, 1000); // Esperamos 1 segundo para no bloquear el inicio
} else {
  console.error("HubSpot no está configurado. La API key no está presente en las variables de entorno.");
}

// Configurar multer para manejar la carga de archivos
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
});

// Configurar SendGrid con la API key (obtenida de variables de entorno)
const apiKey = process.env.SENDGRID_API_KEY;
console.log("Verificando estado de SendGrid:");
console.log("SENDGRID_API_KEY definida:", !!apiKey);
if (apiKey) {
  console.log("SendGrid API key configurada correctamente (longitud:", apiKey.length, "caracteres)");
  sgMail.setApiKey(apiKey);
} else {
  console.error("Error: SENDGRID_API_KEY no está configurada en las variables de entorno");
  console.log("Variables de entorno disponibles:", Object.keys(process.env).filter(key => !key.startsWith('npm_')).join(', '));
}

// Email verificado en SendGrid que se usará como remitente
const VERIFIED_SENDER = process.env.SENDGRID_VERIFIED_SENDER || "info@0wlfunding.com";

export async function registerRoutes(app: Express): Promise<Server> {
  // Ruta de prueba para verificar la conexión con SendGrid
  app.get('/api/test-sendgrid', async (req, res) => {
    try {
      if (!apiKey) {
        return res.status(400).json({ 
          success: false, 
          message: "SendGrid API key no está configurada" 
        });
      }
      
      console.log("⏳ Enviando email de prueba con SendGrid...");
      const testEmail = {
        from: VERIFIED_SENDER,
        to: "test@example.com", // Este es un correo de prueba
        subject: "Prueba de conexión SendGrid",
        html: "<h1>Este es un email de prueba</h1><p>Si recibes este email, SendGrid está funcionando correctamente.</p>"
      };
      
      const result = await sgMail.send(testEmail);
      console.log("✅ Email de prueba enviado con éxito:", result);
      
      return res.status(200).json({ 
        success: true, 
        message: "Conexión con SendGrid verificada exitosamente", 
        details: result 
      });
    } catch (error) {
      console.error("❌ Error en la prueba de SendGrid:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Error al conectar con SendGrid", 
        error: error.message,
        details: error
      });
    }
  });

  // Ruta de prueba para verificar la conexión con HubSpot
  app.get('/api/test-hubspot', async (req, res) => {
    try {
      if (!HUBSPOT_ENABLED) {
        return res.status(400).json({ 
          success: false, 
          message: "HubSpot no está configurado. Verifique su API key." 
        });
      }
      
      // Crear un contacto de prueba
      const testContactProperties = {
        email: `test-${Date.now()}@legacycapitalpartners.com`,
        firstname: 'Prueba',
        lastname: 'HubSpot',
        phone: '123456789',
        website: 'legacycapitalpartners.com',
        lead_source: 'Test API'
      };
      
      console.log("⏳ Enviando contacto de prueba a HubSpot...");
      const result = await hubspotClient.crm.contacts.basicApi.create({ properties: testContactProperties });
      
      console.log("✅ Contacto de prueba creado en HubSpot con ID:", result.id);
      return res.status(200).json({ 
        success: true, 
        message: "Conexión con HubSpot verificada exitosamente", 
        contactId: result.id 
      });
    } catch (error) {
      console.error("❌ Error en la prueba de HubSpot:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Error al conectar con HubSpot", 
        error: error.message,
        details: error
      });
    }
  });
  
  // Ruta para manejar el formulario de contacto
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      console.log("Procesando nuevo contacto...");
      
      // Crear contacto en HubSpot si está habilitado
      if (HUBSPOT_ENABLED) {
        try {
          console.log("⏳ Enviando contacto a HubSpot...");
          
          // Crear o actualizar contacto en HubSpot
          const contactObj = {
            properties: {
              email: email,
              firstname: name.split(' ')[0],
              lastname: name.includes(' ') ? name.split(' ').slice(1).join(' ') : '',
              phone: phone,
              message: message,
              website: "legacycapitalpartners.com",
              lead_source: "Website Contact Form"
            }
          };
          
          console.log("📝 Datos del contacto a enviar a HubSpot:", JSON.stringify(contactObj, null, 2));
          
          // Primero verificamos si el contacto ya existe para evitar duplicados
          let contactId;
          try {
            const searchResult = await hubspotClient.crm.contacts.searchApi.doSearch({
              filterGroups: [{
                filters: [{
                  propertyName: 'email',
                  operator: 'EQ',
                  value: email
                }]
              }]
            });
            
            if (searchResult.results && searchResult.results.length > 0) {
              // Contacto existente - actualizar
              contactId = searchResult.results[0].id;
              console.log(`🔄 Contacto existente encontrado con ID: ${contactId}, actualizando...`);
              
              await hubspotClient.crm.contacts.basicApi.update(contactId, contactObj);
              console.log(`✅ Contacto actualizado en HubSpot con éxito. ID: ${contactId}`);
            } else {
              // Nuevo contacto - crear
              const result = await hubspotClient.crm.contacts.basicApi.create(contactObj);
              contactId = result.id;
              console.log(`✅ Nuevo contacto creado en HubSpot con éxito. ID: ${contactId}`);
            }
          } catch (searchError) {
            // Si hay error en la búsqueda, intentamos crear el contacto directamente
            console.log("⚠️ Error al buscar contacto, intentando crear uno nuevo:", searchError.message);
            const result = await hubspotClient.crm.contacts.basicApi.create(contactObj);
            contactId = result.id;
            console.log(`✅ Nuevo contacto creado en HubSpot con éxito. ID: ${contactId}`);
          }
        } catch (hubspotError) {
          console.error("Error al enviar contacto a HubSpot:", hubspotError);
          console.error("Detalles del error:", JSON.stringify(hubspotError, null, 2));
          // Continuar con el flujo aunque falle HubSpot
        }
      } else {
        console.log("HubSpot no está configurado. El contacto no será enviado a HubSpot.");
      }
      
      // También enviar correo electrónico con SendGrid como respaldo
      const result = await sgMail.send({
        from: VERIFIED_SENDER,
        to: "info@0wlfunding.com",
        subject: "Nuevo mensaje de contacto",
        html: `
          <h1>Nuevo mensaje de contacto</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
        `
      });
      
      console.log("Email de contacto enviado con éxito:", result);
      res.status(200).json({ success: true, message: "Mensaje enviado correctamente" });
    } catch (error) {
      console.error("Error al enviar mensaje de contacto:", error);
      res.status(500).json({ success: false, message: "Error al enviar mensaje", error: error.toString() });
    }
  });

  // Ruta para manejar el formulario de cualificación con archivos adjuntos
  app.post('/api/qualify', upload.single('document'), async (req, res) => {
    try {
      const formData = req.body;
      const file = req.file;

      console.log("Recibido formulario de cualificación:", { 
        formData: formData, 
        fileAttached: !!file 
      });

      // Mapear valores para mostrar textos descriptivos en lugar de códigos
      const mapInvestmentAmount = {
        'less50k': 'Menos de $50,000',
        '50k-250k': '$50,000 - $250,000',
        '250k-1m': '$250,000 - $1,000,000',
        'over1m': 'Más de $1,000,000'
      };

      const mapInvestmentType = {
        'none': 'Sin experiencia previa',
        'basic': 'Básica (1-2 propiedades)',
        'intermediate': 'Intermedia (3-5 propiedades)',
        'advanced': 'Avanzada (más de 5 propiedades)',
        'professional': 'Profesional del sector'
      };

      // Crear contacto en HubSpot si está habilitado
      if (HUBSPOT_ENABLED) {
        try {
          console.log("Enviando lead cualificado a HubSpot...");
          
          // Preparar datos para HubSpot
          const contactProperties = {
            email: formData.email || `lead_${Date.now()}@pending.legacycapitalpartners.com`, // Email obligatorio para HubSpot
            firstname: formData.name ? formData.name.split(' ')[0] : 'Prospecto',
            lastname: formData.name && formData.name.includes(' ') ? formData.name.split(' ').slice(1).join(' ') : 'Cualificado',
            phone: formData.phone || '',
            creditScore: formData.creditScore || '',
            annualIncome: formData.annualIncome || '',
            legacyProgramInterest: formData.accreditedStatus || '',
            investmentCapacity: mapInvestmentAmount[formData.investmentAmount as keyof typeof mapInvestmentAmount] || formData.investmentAmount || '',
            realEstateExperience: mapInvestmentType[formData.investmentType as keyof typeof mapInvestmentType] || formData.investmentType || '',
            availableTime: formData.investmentHorizon || '',
            additionalInformation: formData.additionalInfo || '',
            leadSource: 'Website Qualification Form',
            lifecyclestage: 'marketingqualifiedlead',
            leadStatus: 'New'
          };
          
          // Crear contacto en HubSpot
          const hubspotContact = {
            properties: contactProperties
          };
          
          await hubspotClient.crm.contacts.basicApi.create(hubspotContact);
          console.log("Lead cualificado creado en HubSpot con éxito");
        } catch (hubspotError) {
          console.error("Error al enviar lead a HubSpot:", hubspotError);
          // Continuar con el flujo aunque falle HubSpot
        }
      }

      // Crear contenido HTML para el correo
      let htmlContent = `
        <h1>Nueva solicitud de cualificación</h1>
        <h2>Datos del solicitante:</h2>
        <ul>
          <li><strong>Capacidad de Apalancamiento:</strong> ${mapInvestmentAmount[formData.investmentAmount as keyof typeof mapInvestmentAmount] || formData.investmentAmount}</li>
          <li><strong>Experiencia en Bienes Raíces:</strong> ${mapInvestmentType[formData.investmentType as keyof typeof mapInvestmentType] || formData.investmentType}</li>
          <li><strong>Disponibilidad de Tiempo:</strong> ${formData.investmentHorizon}</li>
          <li><strong>Puntaje de Crédito:</strong> ${formData.creditScore}</li>
          <li><strong>Ingreso Anual:</strong> ${formData.annualIncome}</li>
          <li><strong>Programa Legacy:</strong> ${formData.accreditedStatus}</li>
        </ul>
      `;

      if (formData.additionalInfo) {
        htmlContent += `
          <h2>Información Adicional:</h2>
          <p>${formData.additionalInfo}</p>
        `;
      }

      const mailOptions = {
        from: VERIFIED_SENDER,
        to: "info@0wlfunding.com",
        subject: "Nueva solicitud de cualificación",
        html: htmlContent
      };

      // Adjuntar el archivo si existe
      if (file) {
        console.log("Adjuntando archivo:", file.originalname);
        mailOptions.attachments = [
          {
            filename: file.originalname,
            path: file.path
          }
        ];
      }

      console.log("Enviando email de cualificación a través de SendGrid...");
      
      // Enviar el correo con SendGrid
      const result = await sgMail.send(mailOptions);
      
      console.log("Email de cualificación enviado con éxito:", result);
      res.status(200).json({ success: true, message: "Solicitud enviada correctamente" });
    } catch (error) {
      console.error("Error al enviar solicitud de cualificación:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error al enviar solicitud", 
        error: error.toString() 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}