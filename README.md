# HotelBediaX - Destinations Management Portal

HotelBediaX es un proyecto Full Stack desarrollado como prueba técnica para la gestión de destinos turísticos.  
El objetivo es permitir crear, leer, actualizar, eliminar y filtrar destinos desde una interfaz moderna (SPA) desarrollada en React, conectada a una API REST creada en .NET.

---

## Tecnologías utilizadas

### Backend (.NET 8)

- **ASP.NET Core Web API**
- **Entity Framework Core** con **SQLite** (base de datos autocontenida)
- **Swagger / OpenAPI** para documentación interactiva
- **CORS habilitado** para permitir conexión con el frontend

### Frontend (React + Vite)

- **React 19**
- **@tanstack/react-query** para manejo de consultas asíncronas y caché
- **Axios** para las llamadas HTTP
- **React Window** para renderizar grandes volúmenes de datos (200.000+ registros)
- **MaterialUI** para diseño rápido y responsivo

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

hotel-bediax/backend/HotelBediaX.Api/

### Frontend (`hotel-bediax-ui`)

hotel-bediax/frontend/hotel-bediax-ui/

## Cómo ejecutar

### 1\_ Backend (.NET)

cd ./hotel-bediax/backend/HotelBediaX.Api
dotnet restore ./HotelBediaX.Api.csproj
dotnet build ./HotelBediaX.Api.csproj
dotnet run --project HotelBediaX.Api.csproj

### 2\_ Frontend (React)

cd ./hotel-bediax/frontend/hotel-bediax-ui
npm install --legacy-peer-deps
npm run dev

### La app se estara corriendo en http://localhost:5173/
