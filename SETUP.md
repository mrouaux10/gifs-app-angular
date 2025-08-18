# GifsApp Project Configuration

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Giphy account to get API key

## API Key Configuration

### 1. Get Giphy API Key

1. Get API from https://developers.giphy.com/
2. Create an account or sign in
3. Create a new application
4. Copy the API key

### 2. Configure the API Key

1. Copy the example file:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.example.ts src/environments/environment.development.ts
```

2. Replace `TU_API_KEY_AQUI` with your real API key in both files.

## Installation and execution

```bash
# Install dependencies
npm install

# Run in development mode
npm start

# Open in browser
# http://localhost:4200
```