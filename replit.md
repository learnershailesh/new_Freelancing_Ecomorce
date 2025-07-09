# REST Express E-commerce Application

## Overview

This is a full-stack e-commerce application built with a modern React frontend and Express.js backend. The application displays a product catalog with features like product listings, detailed product information, and shopping cart functionality. It uses PostgreSQL for data storage with Drizzle ORM, and is styled using Tailwind CSS with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL session store (connect-pg-simple)
- **API Structure**: RESTful endpoints under `/api` prefix

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe database schema with Zod validation
- **Migrations**: Drizzle Kit for schema management
- **Storage**: Abstracted storage interface with memory fallback for development

## Key Components

### Database Schema
Located in `shared/schema.ts`, defines:
- **Users table**: Basic user authentication (id, username, password)
- **Products table**: Product catalog (id, name, price, originalPrice, image, description, rating, badge, category)
- **Validation**: Zod schemas for type safety and validation

### API Endpoints
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product by ID

### Frontend Components
- **Layout Components**: Header, Footer, Hero section
- **Product Components**: ProductCard, ProductGrid with loading states
- **UI Components**: Complete shadcn/ui component library
- **Pages**: Home page with product catalog, 404 page

### Storage Layer
- **Interface**: `IStorage` abstraction for data operations
- **Implementation**: `MemStorage` class with hardcoded product data
- **Future**: Designed to easily swap with PostgreSQL implementation

## Data Flow

1. **Client Request**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle HTTP requests and responses
3. **Storage Layer**: Storage interface abstracts data operations
4. **Database**: Currently uses in-memory storage, configured for PostgreSQL
5. **Response**: JSON data returned to client with proper error handling

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **State Management**: TanStack Query for server state
- **UI Framework**: Radix UI components, Tailwind CSS
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Utilities**: clsx, tailwind-merge, date-fns

### Backend Dependencies
- **Core**: Express.js, TypeScript
- **Database**: Drizzle ORM, Neon Database driver
- **Session**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution

### Build Tools
- **Frontend**: Vite with React plugin
- **Backend**: esbuild for production builds
- **Database**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with hot reload
- **Database**: Configured for PostgreSQL via DATABASE_URL environment variable

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Files**: Express serves built frontend files
- **Database**: Production PostgreSQL database via DATABASE_URL

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Build Process**: Unified build command creates both frontend and backend builds

The application is designed for easy deployment to platforms like Replit, with proper environment variable configuration and build processes for both development and production environments.