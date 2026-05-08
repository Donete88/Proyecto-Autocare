# Proyecto-Autocare

AutoCare es una solución completa formada por:

Backend API desarrollada en Node.js + Express + MySQL

Aplicación móvil desarrollada en React Native (Expo)

El objetivo del proyecto es permitir a los usuarios:

Registrar y gestionar sus vehículos

Crear y visualizar mantenimientos

Recibir recordatorios

Consultar un calendario de tareas

Filtrar vehículos por marca y tipo

Autenticarse mediante JWT

Estructura del proyecto:
/autocare-api      → Backend (Node.js + Express + MySQL)
/autocare-app      → Frontend móvil (React Native + Expo)

Backend - Autocare API

Tecnologías
Node.js
Express
MySQL
JWT
Bcrypt
Express-validator
Swagger

Estructura principal
autocare-api/
│
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── services/
│   └── config/
├── database.sql
├── app.js
├── server.js
├── package.json
└── .gitignore

Autenticación
Registro y login con JWT
Contraseñas encriptadas con bcrypt
Rutas protegidas con middleware de autenticación
