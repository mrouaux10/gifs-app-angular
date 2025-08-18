# GifsApp - GIFs Application with Angular

A modern web application developed in Angular that allows you to search, explore and manage GIFs using the Giphy API.

## Features

- Real-time GIF search
- Trending page
- Search history
- Modern and responsive interface with Tailwind CSS
- Developed with Angular 20

## Technologies used

- **Frontend:** Angular 20
- **Styling:** Tailwind CSS
- **API:** Giphy API
- **Testing:** Jasmine & Karma

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Giphy account to get API key

## Quick installation

1. **Clone the repository:**
```bash
git clone https://github.com/TU_USUARIO/gifs-app.git
cd gifs-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API Key:**
   - Go to [SETUP.md](./SETUP.md) for detailed instructions
   - Get your Giphy API key
   - Configure the environment variable or environment files

4. **Run in development mode:**
```bash
npm start
```

5. **Open in browser:**
```
http://localhost:4200
```

## Available scripts

- `npm start` - Starts the development server
- `npm run build` - Builds the application for production
- `npm test` - Runs unit tests
- `npm run watch` - Builds in watch mode

## Project structure

```
src/app/gifs/
├── components/          # Reusable components
│   ├── gif-list/       # GIF list
│   ├── gif-list-item/  # Individual GIF item
│   ├── side-menu/      # Side menu
│   └── side-menu-options/ # Menu options
├── interfaces/          # TypeScript interfaces
├── mappers/            # Data mappers
├── pages/              # Main pages
│   ├── dashboard/      # Main dashboard
│   ├── search/         # Search page
│   ├── trending/       # Trending page
│   └── history/        # Search history
└── services/           # Application services
```

## API Configuration

**IMPORTANT:** This project requires a Giphy API key to work.

**See [SETUP.md](./SETUP.md) for complete configuration instructions.**

## Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Building

```bash
# Build for development
npm run build

# Build for production
npm run build --prod
```