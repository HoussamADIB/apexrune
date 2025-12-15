# ApexRune - Salesforce Optimization Website

A modern, responsive landing page for ApexRune, a Salesforce optimization service. Built with Vite for fast development and instant hot reload.

## 🚀 Quick Start

### Local Development

1. Navigate to the web app directory:
   ```bash
   cd web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## 📦 Build for Production

```bash
cd web-app
npm run build
```

The built files will be in `web-app/dist/`

## 🌐 Deployment

### Netlify

This project is configured for Netlify deployment:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the `netlify.toml` configuration
3. Build settings:
   - **Base directory:** `web-app`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `web-app/dist`

The site will be automatically deployed on every push to the main branch.

## 📁 Project Structure

```
.
├── web-app/              # Vite web application
│   ├── src/
│   │   ├── main.js      # Main JavaScript file
│   │   └── style.css    # Styles
│   ├── index.html       # HTML entry point
│   └── package.json     # Dependencies
├── lib/                 # Flutter app (legacy)
├── netlify.toml         # Netlify configuration
└── README.md
```

## 🛠️ Technologies

- **Vite** - Fast build tool and dev server
- **Vanilla JavaScript** - No framework dependencies
- **Modern CSS** - Responsive design with CSS Grid and Flexbox

## 📝 Features

- ✅ Fully responsive design
- ✅ Modern UI/UX
- ✅ Fast development with hot module replacement
- ✅ Optimized for production builds
- ✅ SEO-friendly structure
