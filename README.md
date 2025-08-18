# GifsApp - Aplicación de GIFs con Angular

Una aplicación web moderna desarrollada en Angular que permite buscar, explorar y gestionar GIFs utilizando la API de Giphy.

## Características

- Búsqueda de GIFs en tiempo real
- Página de tendencias
- Historial de búsquedas
- Interfaz moderna y responsive con Tailwind CSS
- Desarrollada con Angular 20

## Tecnologías utilizadas

- **Frontend:** Angular 20
- **Styling:** Tailwind CSS
- **API:** Giphy API
- **Testing:** Jasmine & Karma

## Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- Cuenta en Giphy para obtener API key

## Instalación rápida

1. **Clonar el repositorio:**
```bash
git clone https://github.com/TU_USUARIO/gifs-app.git
cd gifs-app
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar API Key:**
   - Ve a [SETUP.md](./SETUP.md) para instrucciones detalladas
   - Obtén tu API key de Giphy
   - Configura la variable de entorno o archivos de environment

4. **Ejecutar en modo desarrollo:**
```bash
npm start
```

5. **Abrir en el navegador:**
```
http://localhost:4200
```

## Scripts disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run watch` - Construye en modo watch

## Estructura del proyecto

```
src/app/gifs/
├── components/          # Componentes reutilizables
│   ├── gif-list/       # Lista de GIFs
│   ├── gif-list-item/  # Item individual de GIF
│   ├── side-menu/      # Menú lateral
│   └── side-menu-options/ # Opciones del menú
├── interfaces/          # Interfaces TypeScript
├── mappers/            # Mappers de datos
├── pages/              # Páginas principales
│   ├── dashboard/      # Dashboard principal
│   ├── search/         # Página de búsqueda
│   ├── trending/       # Página de tendencias
│   └── history/        # Historial de búsquedas
└── services/           # Servicios de la aplicación
```

## Configuración de API

**IMPORTANTE:** Este proyecto requiere una API key de Giphy para funcionar. 

**Ver [SETUP.md](./SETUP.md) para instrucciones completas de configuración.**

## Testing

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas con coverage
npm run test:coverage
```

## Building

```bash
# Build para desarrollo
npm run build

# Build para producción
npm run build --prod
```