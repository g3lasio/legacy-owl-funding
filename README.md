
# Legacy Owl Funding

![Legacy Logo](attached_assets/Legacy%20logo%20white.png)

## Descripción del Proyecto

Legacy Owl Funding es una plataforma de inversión inmobiliaria que permite a los usuarios aprovechar su perfil crediticio para acceder a oportunidades de inversión premium sin necesidad de capital inicial. El sistema conecta a inversionistas con diferentes niveles de experiencia a proyectos inmobiliarios rentables a través de un modelo de negocio innovador basado en la calificación crediticia.

## Características Principales

- **Inversión Sin Capital**: Acceso a inversiones inmobiliarias utilizando el perfil crediticio
- **Proceso de Precalificación**: Sistema de evaluación para determinar la elegibilidad de los inversionistas
- **Niveles de Programa**: Tres niveles de participación (Legacy Founder, Legacy VIP, Legacy Executive)
- **Portal Informativo**: Información detallada sobre oportunidades de inversión y metodología
- **Formulario de Contacto**: Canal directo para la comunicación con el equipo de Legacy Capital

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca principal para la construcción de interfaces
- **TypeScript**: Lenguaje tipado para mejorar la robustez del código
- **Tailwind CSS**: Framework de utilidades CSS para el diseño
- **Shadcn/UI**: Componentes UI accesibles y personalizables
- **Framer Motion**: Biblioteca para animaciones fluidas
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas
- **Wouter**: Enrutamiento ligero para React

### Backend
- **Express.js**: Framework de servidor Node.js
- **TypeScript**: Tipado estático para el backend
- **Drizzle ORM**: ORM para interactuar con la base de datos
- **Multer**: Middleware para manejo de archivos
- **Express Session**: Manejo de sesiones
- **Passport.js**: Autenticación

### Herramientas de Desarrollo
- **Vite**: Herramienta de construcción rápida
- **ESBuild**: Compilador JavaScript rápido
- **Drizzle Kit**: CLI para migraciones de base de datos
- **PostCSS**: Procesador CSS
- **TailwindCSS**: Utilidades CSS

## Estructura del Proyecto

```
├── client/               # Código frontend React
│   ├── public/           # Archivos estáticos públicos
│   ├── src/              # Código fuente React
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Componentes de página
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilidades y configuraciones
│   │   └── App.tsx       # Componente principal
│   └── index.html        # Punto de entrada HTML
├── server/               # Código backend Express
│   ├── index.ts          # Punto de entrada del servidor
│   ├── routes.ts         # Definición de rutas API
│   ├── storage.ts        # Lógica de almacenamiento
│   └── vite.ts           # Configuración de Vite para el servidor
├── shared/               # Código compartido entre cliente/servidor
│   └── schema.ts         # Esquemas de datos compartidos
├── uploads/              # Directorio para archivos subidos
├── attached_assets/      # Recursos gráficos y activos adjuntos
└── varios archivos de configuración (package.json, tsconfig.json, etc.)
```

## Funcionalidades Detalladas

### Página de Inicio
- Hero section con animaciones y call-to-action
- Sección de propuesta de valor que destaca los beneficios clave
- Niveles de programa detallados con características y precios
- Sección FAQ con preguntas frecuentes
- Testimonios de usuarios
- Formulario de contacto

### Sistema de Precalificación
- Proceso de 4 pasos para evaluar la elegibilidad
- Recopilación de información sobre:
  - Perfil del inversionista
  - Perfil crediticio
  - Documentación relevante
  - Revisión final
- Carga de documentos con verificación de seguridad
- Proceso de confirmación y seguimiento

### Portal de Usuario (Planificado)
- Dashboard personalizado
- Seguimiento de inversiones
- Documentos y contratos
- Comunicación con el equipo Legacy

## Flujo de Trabajo del Proyecto

1. **Diseño y Planificación**: Creación de wireframes, definición de la arquitectura
2. **Desarrollo Frontend**: Implementación de componentes y páginas
3. **Desarrollo Backend**: API RESTful, manejo de datos y autenticación
4. **Integración**: Conexión de frontend y backend
5. **Pruebas**: Testing de la aplicación
6. **Despliegue**: Lanzamiento en producción

## Instalación y Uso

### Requisitos Previos
- Node.js (v16.x o superior)
- npm o yarn

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/g3lasio/legacy-owl-funding.git
cd legacy-owl-funding
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (crear archivo .env basado en .env.example)

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en http://0.0.0.0:3000

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run check`: Comprueba errores de tipado con TypeScript
- `npm run db:push`: Actualiza la base de datos con el esquema actual

## Despliegue

El proyecto está configurado para ser desplegado en Replit. El archivo de configuración `.replit` ya incluye las configuraciones necesarias para el despliegue.

## Seguridad

El proyecto implementa varias medidas de seguridad:
- Encriptación de datos sensibles
- Manejo seguro de sesiones
- Validación de entradas
- Protección contra ataques comunes (XSS, CSRF)

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Créditos

Desarrollado por el equipo de Legacy Capital Partners.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.

## Contacto

- **Email**: info@0wlfunding.com
- **Teléfono**: (743) 240-2088
- **Dirección**: 2901 Owens, Fairfield, CA, 94534
