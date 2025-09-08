# Dual Authentication System

This application implements a dual authentication system:

## User Authentication (Clerk)
- **Purpose**: Regular users who want to browse and purchase products
- **Routes**: All public pages, cart, checkout, orders
- **Sign-in URL**: `/sign-in`
- **Sign-up URL**: `/sign-up`
- **Features**: 
  - Modern authentication UI
  - Social login options
  - Password reset
  - User profile management

## Admin Authentication (NextAuth.js)
- **Purpose**: Admin users who manage the store
- **Routes**: All `/admin/*` routes
- **Sign-in URL**: `/admin/login` 
- **Credentials**: Only `admintamago@gmail.com` can access
- **Features**:
  - Credential-based login
  - Session management
  - Admin-only access control

## Setup Instructions

1. **Clerk Setup**:
   - Create a Clerk account at https://clerk.com
   - Create a new application
   - Copy the publishable and secret keys to your `.env.local`

2. **Environment Variables**:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

3. **Database Migration**:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

## Usage

### For Customers:
1. Visit the homepage
2. Browse products and add to cart
3. Click "Sign In" to authenticate via Clerk
4. Proceed to checkout after authentication

### For Admins:
1. Navigate directly to `/admin/login`
2. Use admin credentials to sign in
3. Access admin dashboard for order and product management

## Security Features

- **Route Protection**: Middleware protects routes based on authentication type
- **User Isolation**: Users can only access their own orders
- **Admin Restriction**: Only specific email can access admin panel
- **Session Management**: Both systems manage their own sessions independently