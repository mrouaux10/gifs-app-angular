# Configuración del Proyecto GifsApp

## 📋 Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- Cuenta en Giphy para obtener API key

## Configuración de la API Key

### 1. Obtener API Key de Giphy

1. Obtener API de https://developers.giphy.com/
2. Crear una cuentr o inicia sesión
3. Crear una nueva aplicación
4. Copiar tAPI key

### 2. Configurar la API Key

1. Copiar el rrchivo de ejemplo:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.example.ts src/environments/environment.development.ts
```

2. Reemplazar `TU_API_KEY_AQUI` con tu API key real en ambos archivos.

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Abrir en el navegador
# http://localhost:4200
```