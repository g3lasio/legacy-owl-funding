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
const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY });

// Constante para verificar si HubSpot está configurado
const HUBSPOT_ENABLED = !!process.env.HUBSPOT_API_KEY;

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
if (!apiKey) {
  console.error("Error: SENDGRID_API_KEY no está configurada en las variables de entorno");
} else {
  console.log("SendGrid API key configurada correctamente");
  sgMail.setApiKey(apiKey);
}

// Email verificado en SendGrid que se usará como remitente
const VERIFIED_SENDER = process.env.SENDGRID_VERIFIED_SENDER || "info@0wlfunding.com";

export async function registerRoutes(app: Express): Promise<Server> {
  // Ruta para manejar el formulario de contacto
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      console.log("Procesando nuevo contacto...");
      
      // Crear contacto en HubSpot si está habilitado
      if (HUBSPOT_ENABLED) {
        try {
          console.log("Enviando contacto a HubSpot...");
          
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
          
          await hubspotClient.crm.contacts.basicApi.create(contactObj);
          console.log("Contacto creado/actualizado en HubSpot con éxito");
        } catch (hubspotError) {
          console.error("Error al enviar contacto a HubSpot:", hubspotError);
          // Continuar con el flujo aunque falle HubSpot
        }
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