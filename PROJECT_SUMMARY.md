# ApexRune Website - Project Summary

## Project Overview
A modern, responsive landing page for ApexRune, a Salesforce optimization and consulting service. Built with Vite for fast development and instant hot reload.

## Tech Stack
- **Frontend Framework**: Vanilla JavaScript (no framework dependencies)
- **Build Tool**: Vite 7.2.4
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Deployment**: Netlify (configured)
- **Version Control**: Git/GitHub

## Repository
- **GitHub**: `git@github.com:HoussamADIB/apexrune.git`
- **Netlify**: Auto-deploys on push to `main` branch

## Project Structure
```
flutter-project/
├── web-app/                    # Main web application
│   ├── src/
│   │   ├── main.js            # Main app entry point
│   │   ├── style.css          # All styles
│   │   ├── services.js        # Service tabs functionality
│   │   ├── router.js          # Page routing system
│   │   ├── certifications.js  # Certifications carousel
│   │   └── dashboard-animations.js  # Hero dashboard animations
│   ├── public/
│   │   └── certifications/    # Certification badge images
│   ├── index.html
│   ├── package.json
│   └── netlify.toml           # Netlify configuration
├── lib/                        # Flutter app (legacy, not used)
└── README.md
```

## Key Features Implemented

### 1. Hero Section
- **Left Side**: Headline, description, CTA buttons
- **Right Side**: System Overview dashboard with:
  - Org Performance card (98/100 score) with +24% Speed badge
  - Health card (Excellent, 0 Critical Issues)
  - Data Quality card (99.9%, Duplicates removed)
  - Recent Optimizations list
  - **Animations**: Metrics animate from low to high values on page load

### 2. Certifications Carousel
- Hexagonal Salesforce certification badges
- 9 certifications displayed in scrollable carousel
- Navigation arrows (left/right)
- Real certification images from `/public/certifications/`
- Responsive: 5 badges desktop, 3 tablet, 1 mobile

### 3. Core Services Section
- **Header**: "← Back to Home" link, "Our Services" title, description
- **4 Service Cards** in 2x2 grid:
  - Custom Development (blue icon, "Project based")
  - System Integration (purple icon, "Project based")
  - Health Checks (green icon, "Starting at $1,500")
  - Process Automation (yellow icon, "Retainer based")
- Each card includes: icon, engagement tag, title, description, feature list with checkmarks, "Discuss Your Project" button

### 4. Other Sections
- Problems section (dark blue background)
- Why Choose Us section (2 founders, 24 certifications)
- Testimonials section
- Final CTA section
- Footer with contact info and links

### 5. Interactive Features
- Service tabs functionality (removed from main page, but code exists)
- Service detail pages with routing (`#/service/service-name`)
- Smooth animations and transitions
- Responsive design

## Key Files & Their Purpose

### `web-app/src/main.js`
- Main application entry point
- Contains all HTML structure
- Initializes all modules

### `web-app/src/style.css`
- All styling for the website
- Responsive breakpoints
- Animation styles

### `web-app/src/services.js`
- Service data and tab switching functionality
- Service detail page content

### `web-app/src/router.js`
- Hash-based routing (`#/service/name`)
- Handles navigation between pages
- Service detail page rendering

### `web-app/src/certifications.js`
- Certification badge data
- Carousel functionality
- Image handling

### `web-app/src/dashboard-animations.js`
- Hero dashboard loading animations
- Number counting animations
- Intersection Observer for trigger

### `netlify.toml`
- Netlify deployment configuration
- Base directory: `web-app`
- Build command: `npm install && npm run build`
- Publish directory: `dist`

## Certification Images
Located in `/web-app/public/certifications/`:
- Platform Developer I
- AI Associate
- AI Specialist
- Technical Architect
- Platform Developer II
- Sales Cloud Consultant
- Service Cloud Consultant
- Platform App Builder
- Administrator

## Development Commands

### Local Development
```bash
cd web-app
npm install
npm run dev
```
Runs on `http://localhost:5173` with hot reload

### Build for Production
```bash
cd web-app
npm run build
```
Outputs to `web-app/dist/`

## Deployment
- **Platform**: Netlify
- **Auto-deploy**: Enabled (deploys on push to `main`)
- **Build Settings**: Auto-detected from `netlify.toml`
- **URL**: Check Netlify dashboard for live URL

## Design System

### Colors
- Primary Blue: `#1E40AF`
- Bright Blue: `#3B82F6`
- Dark Blue: `#1E3A8A`
- Green: `#10B981`
- Text Dark: `#1F2937`
- Text Light: `#6B7280`
- White: `#FFFFFF`

### Typography
- Font: System fonts (San Francisco, Segoe UI, etc.)
- Headlines: 2.5-3.5rem, bold
- Body: 1rem-1.125rem
- Small text: 0.75rem-0.875rem

## Current State

### ✅ Completed
- Full homepage with all sections
- Hero dashboard with animations
- Certifications carousel with real images
- Core services section (4 cards)
- Service detail pages with routing
- Responsive design
- Netlify deployment configured
- GitHub repository set up

### 🔄 In Progress / Notes
- Service tabs functionality exists but not used on main page (code in `services.js`)
- Some old service content may still exist in codebase
- Router handles service detail pages

## Important Notes

1. **Default Service**: "Salesforce Quick Start" is set as default active service
2. **Animations**: Dashboard animations trigger when section becomes visible (Intersection Observer)
3. **Images**: Certification images are in `/web-app/public/certifications/` - add new ones there
4. **Routing**: Uses hash-based routing (`#/service/name`) for service pages
5. **Hot Reload**: Vite provides instant hot module replacement during development

## Next Steps / Future Enhancements

1. Add contact form functionality
2. Connect "Discuss Your Project" buttons to contact form or booking system
3. Add more service detail pages
4. Implement form handling (Netlify Forms or external service)
5. Add analytics tracking
6. SEO optimization
7. Performance optimization
8. Add more animations/transitions

## Quick Start for New Chat Session

1. **Navigate to project**: `cd /Users/hadib/Documents/flutter-project`
2. **Start dev server**: `cd web-app && npm run dev`
3. **View site**: `http://localhost:5173`
4. **Make changes**: Edit files in `web-app/src/`
5. **Deploy**: Push to GitHub, Netlify auto-deploys

## Key Contacts / Info
- Repository: `git@github.com:HoussamADIB/apexrune.git`
- Netlify: Check Netlify dashboard for deployment status
- Local dev: `http://localhost:5173`

---

**Last Updated**: Based on conversation ending with Core Services section implementation




