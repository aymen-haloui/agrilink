# Agrilink - Setup Guide

This comprehensive Agrilink marketplace application is built with Next.js 16, TypeScript, Prisma, Next Auth.js, and shadcn/ui with full i18n support (English, French, Arabic RTL).

## Quick Start

### 1. Environment Setup

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/agrilink"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here-min-32-characters"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Setup

The application uses PostgreSQL. Make sure your PostgreSQL server is running.

```bash
# Install dependencies
pnpm install

# Push Prisma schema to database
pnpm exec prisma db push

# Seed database with demo data
pnpm exec prisma db seed

# Or use the npm script
pnpm db:seed
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Demo Credentials

After seeding the database, you can login with:

- **Admin**: admin@agrilink.dz / password123
- **Supplier 1**: supplier1@agrilink.dz / password123
- **Supplier 2**: supplier2@agrilink.dz / password123
- **Supplier 3**: supplier3@agrilink.dz / password123
- **Buyer 1**: buyer1@agrilink.dz / password123
- **Buyer 2**: buyer2@agrilink.dz / password123
- **Buyer 3**: buyer3@agrilink.dz / password123

## Project Structure

```
/app
  /api                    # API routes
    /auth                 # Authentication endpoints
    /orders              # Order management endpoints
  /dashboard              # Protected dashboard routes
    /products            # Product management
    /orders              # Order management
    /payments            # Payment tracking
    /notifications       # Notification center
    /users               # User management (admin)
    /analytics           # Analytics & reports (admin)
    /settings            # User settings
  /login                  # Login page
  /register               # Registration page
  layout.tsx              # Root layout

/components
  /ui                     # shadcn/ui components
  /auth                   # Authentication components
  /dashboard              # Dashboard components

/lib
  auth.ts                 # Next Auth configuration
  auth-utils.ts          # Auth utility functions
  rbac.ts                 # Role-based access control
  prisma.ts              # Prisma client
  
/prisma
  schema.prisma          # Database schema
  seed.ts                # Seed data script

/public/locales          # i18n translation files
  /en, /fr, /ar
    common.json
    auth.json
    products.json
    orders.json
    dashboard.json
    notifications.json
```

## Key Features Implemented

### Phase 1 Complete (Foundation & Authentication)

1. **Database Schema** ✅
   - 10+ core models (User, Product, Order, OrderItem, Payment, Notification, Rating, Review, AuditLog)
   - Complete relationships and constraints
   - Enum types for status management

2. **Authentication & RBAC** ✅
   - Next Auth.js with credentials provider
   - JWT-based session management
   - Four user roles: ADMIN, SUPPLIER, BUYER, OPERATOR
   - Role-based access control (RBAC) middleware
   - Account status tracking (PENDING_VERIFICATION, VERIFIED, SUSPENDED)

3. **Internationalization (i18n)** ✅
   - Support for English, French, and Arabic (RTL)
   - Automatic language detection
   - 6 translation namespaces (common, auth, products, orders, dashboard, notifications)
   - RTL support with document direction switching

4. **User Registration & Onboarding** ✅
   - Sign-up form with role selection (Supplier/Buyer)
   - Email validation
   - Password strength requirements
   - Terms & conditions acceptance
   - Account creation with pending verification status

5. **Admin Dashboard** ✅
   - Role-based navigation sidebar
   - Header with user info and quick actions
   - KPI statistics cards (Orders, Revenue, Products, Users)
   - Performance metrics display
   - Recent orders widget
   - Getting started guides

6. **Product Management** ✅
   - Product listing page with filtering
   - Product table with stock status
   - Add/Edit product capability (scaffolded)
   - Supplier-specific product views

7. **Order Management** ✅
   - Order listing page
   - Role-specific order views (Supplier/Buyer)
   - Order status tracking
   - Order details view (scaffolded)
   - API endpoints for CRUD operations

8. **Demo Data** ✅
   - 20 sample suppliers/buyers
   - 100+ sample products across categories
   - 200+ sample orders in various states
   - Sample payments, ratings, and notifications

## Architecture Decisions

### Authentication
- **Next Auth.js** with credentials provider for custom username/password auth
- JWT sessions for stateless authentication
- Secure password hashing with bcrypt
- Per-user `lastLogin` timestamp tracking
- Account suspension capability

### Database
- **Prisma ORM** with PostgreSQL
- Comprehensive schema with proper indexes
- Audit logging for compliance
- Row-level security ready (indexes for common queries)

### Authorization
- **RBAC System** with granular permissions
- Role-based menu navigation
- Permission checking for API endpoints
- Resource ownership validation

### Internationalization
- **next-i18next** for translation management
- Namespace-based organization
- RTL support for Arabic
- Browser language detection

### UI Framework
- **shadcn/ui** components for consistency
- **Tailwind CSS v4** for styling
- Dark mode support
- Responsive design

## Next Steps (Phases 2-3)

1. **Payment Integration**
   - Payment status tracking
   - Invoice generation
   - Payment method management

2. **Advanced Features**
   - Product ratings and reviews
   - Dispute resolution system
   - Real-time notifications
   - Advanced search and filtering

3. **Admin Tools**
   - User management dashboard
   - Analytics and reporting
   - Audit log viewer
   - System settings

4. **Enhancements**
   - Email notifications
   - File upload for product images
   - Wishlist/favorites
   - Chat/messaging system
   - Mobile app

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Session secret (min 32 chars)
- `NEXTAUTH_URL` - Application URL

## Troubleshooting

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql postgresql://user:password@localhost:5432/agrilink

# Recreate schema
pnpm exec prisma db push --force-reset
```

### Authentication Issues
- Ensure `NEXTAUTH_SECRET` is set to a 32+ character random string
- Check cookies are enabled in browser
- Clear browser cookies and try again

### i18n Not Working
- Ensure JSON files are in `/public/locales/{lang}/{namespace}.json`
- Check browser language settings
- Manually switch language to test

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - Sign in/out endpoints

### Orders
- `GET /api/orders` - List orders (role-based)
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details
- `PATCH /api/orders/[id]` - Update order status

## Performance Notes

- Prisma queries include indexes on common filters (role, status, createdAt)
- Dashboard uses server-side data fetching
- i18n files are cached in browser localStorage
- Consider adding caching for high-traffic endpoints

## Security Considerations

- All routes use Next Auth session validation
- Passwords hashed with bcrypt (10 rounds)
- SQL injection prevention via Prisma
- CSRF protection via Next Auth
- Rate limiting recommended for production
- Audit logging for compliance

## Support

For detailed setup instructions or issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Next Auth.js](https://next-auth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
