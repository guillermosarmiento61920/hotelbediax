# HotelBediaX - Destinations Management Portal

HotelBediaX es un proyecto Full Stack desarrollado como prueba técnica para la gestión de destinos turísticos.  
El objetivo es permitir crear, leer, actualizar, eliminar y filtrar destinos desde una interfaz moderna (SPA) desarrollada en React, conectada a una API REST creada en .NET.

---

## Tecnologías utilizadas

### Backend (.NET 8)

- **ASP.NET Core Web API**
- **Entity Framework Core** con **InMemory Database** (mock de datos)
- **Swagger / OpenAPI** para documentación interactiva
- **CORS habilitado** para permitir conexión con el frontend

### Frontend (React + Vite)

- **React 19**
- **@tanstack/react-query** para manejo de consultas asíncronas y caché
- **Axios** para las llamadas HTTP
- **React Window** para renderizar grandes volúmenes de datos (200.000+ registros)
- **Tailwind CSS** para diseño rápido y responsivo

---

## Funcionalidades implementadas

- Crear un nuevo destino
- Ver todos los destinos con paginación y filtro
- Editar los datos de un destino
- Eliminar destinos
- Filtrar por texto y tipo de destino
- Interfaz tipo dashboard SPA
- Carga eficiente de miles de registros

---

## Estructura del proyecto

### Backend (`HotelBediaX.Api`)

HotelBediaX.Api/
├── Controllers/
│ └── DestinationsController.cs # Endpoints CRUD principales
├── Data/
│ ├── AppDbContext.cs # Contexto de Entity Framework
│ └── Seeder.cs # Generador de datos falsos (200k)
├── Models/
│ └── Destination.cs # Modelo base de destino
├── Program.cs # Configuración de la app
└── HotelBediaX.Api.csproj

### Frontend (`hotel-bediax-ui`)

hotel-bediax-ui/
├── src/
│ ├── api/
│ │ └── destinations.js # Llamadas HTTP al backend
│ ├── components/
│ │ └── DestinationsList.jsx # Tabla de destinos
│ │ └── DestinationForm.jsx # Crear/modificar destino
│ ├── App.jsx # Layout principal (sidebar + contenido)
│ ├── main.jsx # Punto de entrada (React Query + Router)
│ └── index.css # Estilos globales
├── public/
├── package.json
├── vite.config.js
└── .env

## Cómo ejecutar

### 1\_ Backend (.NET)

cd HotelBediaX.Api
dotnet run

### 2\_ Backend (.NET)

cd hotel-bediax-ui
npm install
npm run dev
