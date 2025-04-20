# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Packages and dependencies

# React router dom
npm i react-router-dom

# React Icon
npm install react-icons --save

# Axios
npm i axios

Aquí tienes un ejemplo de `README.md` en formato Markdown para el repositorio [Caninos_SABS](https://github.com/JoaoOrtz/Caninos_SABS.git), basado en el contenido del PDF que compartiste:

---

# 🐾 Caninos SABS

**Caninos SABS** es una plataforma web desarrollada como parte del proyecto de formación del SENA. Su objetivo es permitir la gestión eficiente de la información de la empresa a través de un sistema administrativo interno y una landing page informativa para los usuarios.

## 📌 Descripción del Proyecto

Esta aplicación web full stack permite:

- Visualizar información de la empresa, productos, servicios y categorías.
- Administrar usuarios, roles, productos y categorías desde un panel interno.
- Autenticarse con seguridad mediante tokens JWT.
- Consumir una API RESTful desarrollada en Node.js.

## 🧰 Tecnologías Utilizadas

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [TailwindCSS](https://tailwindcss.com/) o Bootstrap (según la implementación)

### Backend
- Node.js
- Express
- Sequelize
- MySQL
- JWT (autenticación)
- CORS, Dotenv

> 🔗 API disponible en: [https://github.com/sena-yeison/taller_reactjs](https://github.com/sena-yeison/taller_reactjs)

## 🖼️ Funcionalidades

### 🌐 Landing Page
- Inicio: Presentación general de la empresa.
- Quiénes somos: Historia y misión.
- Productos, servicios y categorías: Visualizados desde la API.

### 🔐 Panel Administrativo
- Login con autenticación JWT.
- Gestión de usuarios, roles, productos, categorías y datos de la empresa.
- Control de acceso según roles.

## 📦 Instalación y Uso

### 🚀 Frontend

1. Clonar el repositorio:

```bash
git clone https://github.com/JoaoOrtz/Caninos_SABS.git
cd Caninos_SABS
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar aplicación:

```bash
npm run dev
```

### 🔙 Backend

1. Clonar el backend desde:

```bash
git clone https://github.com/sena-yeison/taller_reactjs.git
```

2. Configurar la base de datos y variables `.env`.

3. Ejecutar el servidor:

```bash
npm install
npm run dev
```

> Asegúrate de tener la base de datos configurada correctamente y que el backend esté corriendo para poder consumir la API desde el frontend.

## 📚 Documentación

Consulta la documentación completa del proyecto y del consumo de API aquí:

- [Notion del proyecto](https://capricious-breath-652.notion.site/PROYECTO-FINAL-REACT-JS-1b5b9b7c87878007a837ee74d229e045)

## 🎥 Canal de YouTube

Accede al mini curso sobre consumo de API con React en el canal:

- [Canal de YouTube (enlace pendiente)](https://www.youtube.com/channel/xxxxx)

## 📅 Fecha de Entrega

🗓️ **Domingo 27 de abril**

## 🧾 Requisitos de Entrega

- Repositorio en GitHub con el código fuente.
- Capturas o videos mostrando el funcionamiento.
- Este archivo `README.md` con instrucciones claras de uso.

---

¿Te gustaría que incluya capturas de pantalla o instrucciones más detalladas para la base de datos o el .env?