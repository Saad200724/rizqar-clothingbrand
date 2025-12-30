# Rizqar - Modest Fashion E-Commerce

## Overview

Rizqar is a luxury e-commerce web application for modest men's fashion. The platform offers a curated selection of clothing including hoodies, thobes, kurtis, and outerwear. Built as a single-page application with React, it features a dark/obsidian theme with gold accents, smooth animations, and a mobile-first responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and dev server (runs on port 5000)
- **React Router** for client-side routing with these pages:
  - `/` - Home page with hero carousel, categories, and featured products
  - `/shop` - Product listing with filtering
  - `/product/:slug` - Individual product details
  - `*` - 404 catch-all

### UI Component System
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind CSS** for styling with custom CSS variables for theming
- **Framer Motion** for animations and transitions
- **Lucide React** for icons

### State Management
- **Zustand** for cart state with localStorage persistence
- **TanStack Query** (React Query) for server state management (currently unused but available)

### Data Layer
Currently uses static TypeScript data files in `src/data/`:
- `products.ts` - Product catalog with MongoDB-ready schema (includes `_id` fields)
- `orders.ts` - Order structure ready for database integration

The data structures are designed for easy migration to MongoDB with fields like `_id`, `slug`, `createdAt`, etc.

### Project Structure
```
src/
├── components/
│   ├── ui/          # shadcn/ui primitives
│   ├── layout/      # Navigation, MainLayout, CartDrawer, BottomTabBar
│   └── home/        # Home page sections (Hero, Categories, Products, etc.)
├── data/            # Static data (products, orders)
├── hooks/           # Custom hooks (use-mobile, use-toast)
├── pages/           # Route components
├── store/           # Zustand stores (cartStore)
└── lib/             # Utilities (cn function)
```

### Design System
- Dark theme with obsidian color palette
- CSS variables defined in `src/index.css` using HSL values
- Custom font: Inter (Google Fonts)
- Glass morphism effects via custom CSS classes

## External Dependencies

### UI Libraries
- Radix UI primitives (dialog, dropdown, accordion, etc.)
- Embla Carousel for product carousels
- react-day-picker for date selection
- cmdk for command palette functionality
- vaul for drawer components
- sonner for toast notifications

### Utilities
- date-fns for date formatting
- class-variance-authority for component variants
- clsx and tailwind-merge for class name handling
- zod with @hookform/resolvers for form validation
- react-hook-form for form state management

### Theming
- next-themes for theme switching (dark mode support)

### No Backend Currently
The application is frontend-only. Product and order data is hardcoded. Ready for integration with:
- A REST API or GraphQL backend
- MongoDB database (schemas are pre-designed)
- Payment processing (Stripe, etc.)