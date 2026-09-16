![GymApp Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=4f46e5,8b5cf6&height=250&section=header&text=GymApp&fontSize=80&fontAlignY=40&desc=Sistema%20Integral%20de%20Administracion%20by%20CISQ%20Lab&descAlignY=65&descSize=22&fontColor=ffffff)
GymApp es una plataforma integral de gestión diseñada específicamente para la administración de gimnasios. Permite llevar un control exacto de los socios, automatizar los estados de las membresías y visualizar estadísticas clave en tiempo real mediante un panel de control intuitivo.
Desarrollado por **CISQ lab**.

## Características Principales

- **Gestión de Socios:** Registro de clientes con información de contacto y fotografía.
- **Control de Membresías Automatizado:** Cálculo automático de fechas de vencimiento y actualización de estados mediante tareas programadas (Cron Jobs) en el servidor.
- **Panel de Administración (Dashboard):** Visualización de métricas clave (miembros activos, vencidos, pagos del mes).
- **Interfaz Optimizada:** Listados de usuarios con paginación desde el servidor y filtros dinámicos para garantizar un alto rendimiento.
- **Soporte Multi-sucursal/Entorno:** Preparado para manejar configuraciones de zona horaria precisas, asegurando consistencia en los datos sin importar la ubicación del servidor.

## Stack Tecnológico

El proyecto está dividido en una arquitectura Cliente-Servidor utilizando tecnologías modernas:

### Frontend
- **React** - Librería principal para la interfaz de usuario.
- **Tailwind CSS** - Framework de estilos de utilidad para un diseño responsive y moderno (Dark/Light mode).
- **React Router Dom** - Manejo de rutas y navegación.

### Backend & Base de Datos
- **Node.js & Express** - Servidor y creación de la API RESTful.
- **MySQL (Aiven Cloud)** - Base de datos relacional en la nube.
- **mysql2 (Promise Pool)** - Manejo eficiente de conexiones concurrentes y consultas preparadas.
- **node-cron** - Ejecución de tareas en segundo plano para la automatización de membresías.

## 🚀 Instalación y Configuración Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### Prerrequisitos
- [Node.js](https://nodejs.org/) (v16 o superior)
- Una instancia de MySQL (Local o en la nube)

### 1. Clonar el repositorio
git clone https://github.com/CISQ-Lab/GYMAPP.git
cd GYMAPP


### 2. Configurar las variables de entorno
Usa el archivo .env.example en la raíz del proyecto backend y configura tu conexión a la base de datos

### 3. Instalar dependencias
Navega a las carpetas del frontend y backend para instalar los paquetes necesarios:

# En la carpeta del backend
npm install

# En la carpeta del frontend
npm install

### 4. Iniciar la aplicación
# Iniciar servidor backend (ejemplo usando nodemon)
npm run dev

# Iniciar el cliente de React (Vite/Create React App)
npm run dev

Este proyecto es propiedad de **CISQ lab**. Todos los derechos reservados.
