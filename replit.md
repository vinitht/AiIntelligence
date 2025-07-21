# AI Hub - Content Platform

## Overview

AI Hub is a modern content platform focused on artificial intelligence topics, built with a React frontend and Express.js backend. The application features content discovery, search functionality, subscription management with mock payment processing, and a premium content model. The platform is designed to be cross-platform and scalable with a minimalist blue UI design.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Minimalist blue color scheme with scalable architecture.

## System Architecture

The application follows a monorepo structure with separate client and server directories, sharing common schemas and types through a shared module. The architecture is built around a REST API pattern with TypeScript throughout the stack.

### Directory Structure
- `client/` - React frontend with Vite build system
- `server/` - Express.js backend API
- `shared/` - Common schemas and types using Drizzle ORM
- Root level configuration files for build tools and database

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with development server integration
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Payment Processing**: Stripe React components

### Backend Architecture  
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: PostgreSQL sessions with connect-pg-simple
- **Payment Processing**: Stripe server-side integration
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Data Models
The application uses three main entities:
- **Users**: Authentication, subscription status, and Stripe customer data
- **Content**: Articles/tutorials with categories, premium status, and view tracking
- **Topics**: Trending topics with article counts and icons

### Storage Layer
The system implements an abstraction layer (`IStorage`) with both in-memory implementation for development and database implementation for production. This allows for easy testing and development without requiring database setup.

## Data Flow

1. **Content Discovery**: Users browse content by category or search terms
2. **Content Viewing**: View counts are tracked when users access individual content items
3. **Premium Access**: Premium content requires subscription verification through Stripe
4. **Search**: Full-text search across content titles and descriptions
5. **Subscription Flow**: Stripe Checkout integration for premium subscriptions

## External Dependencies

### Payment Processing
- **Mock Payment System**: Currently implemented with simulated payment processing for development
- Designed to be easily replaceable with real payment processors (Stripe, PayPal, etc.)
- Includes client-side payment forms and server-side payment confirmation APIs

### Database
- **Neon Database**: Serverless PostgreSQL for production data storage
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect

### UI Components
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built component library built on Radix
- **Lucide React**: Icon library for consistent iconography

## Deployment Strategy

The application is configured for deployment on platforms like Replit with:
- **Development**: Concurrent client and server development with Vite middleware
- **Production**: Built static assets served from Express with API routes
- **Database**: Managed PostgreSQL through Neon with connection pooling
- **Environment Variables**: Required for Stripe keys and database connection

### Build Process
1. Client assets built with Vite to `dist/public`
2. Server bundled with esbuild as ESM module
3. Database migrations managed through Drizzle Kit
4. Environment-specific configuration for development vs production

The architecture supports both development flexibility and production scalability, with clear separation between client and server concerns while maintaining type safety through shared schemas.