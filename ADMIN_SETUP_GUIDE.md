# Admin Dashboard Setup Guide

This guide explains how to set up admin access for the dashboard in your Next.js application using Clerk authentication.

## 🔧 Setting Up Admin Role in Clerk

### Step 1: Access Clerk Dashboard
1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign in to your account
3. Select your project

### Step 2: Configure User Metadata
1. Navigate to **Users** in the sidebar
2. Find and click on the user you want to make an admin
3. Click on the **Metadata** tab
4. In the **Public Metadata** section, add the following JSON:
   ```json
   {
     "role": "admin"
   }
   ```
5. Click **Save**

### Step 3: Refresh User Session
- Sign out of your application
- Sign back in to refresh the user session
- The Dashboard button should now appear in the navbar

## 🔍 Troubleshooting

### Dashboard Button Not Appearing
1. **Check if you're signed in**: The button only appears for authenticated users
2. **Verify role in metadata**: Look for the debug info in the navbar (development mode only)
3. **Clear browser cache**: Sometimes cached data can cause issues
4. **Check console logs**: Open browser developer tools and look for any errors

### Dashboard Button Redirects to Home Page
This happens when:
- User doesn't have admin role set in Clerk metadata
- User session hasn't been refreshed after role assignment
- There's a typo in the role value (must be exactly "admin")

### Common Issues

#### Issue: Role shows as "none" or undefined
**Solution**: 
- Double-check the metadata was saved correctly in Clerk
- Ensure you're editing **Public Metadata**, not Private Metadata
- Sign out and sign back in

#### Issue: Button appears but clicking redirects to home
**Solution**:
- Check if the role value is exactly "admin" (case-sensitive)
- Verify the user session is properly refreshed
- Check browser network tab for redirect responses

#### Issue: Server errors or crashes
**Solution**:
- Check terminal logs for specific error messages
- Ensure all environment variables are properly set
- Restart the development server

## 🚀 Testing Admin Access

1. **Start the development server**: `npm run dev`
2. **Sign in** with your admin account
3. **Look for the debug info** in the navbar (shows current role)
4. **Verify Dashboard button** appears (blue button with dashboard icon)
5. **Click Dashboard button** - should navigate to `/admin`
6. **Confirm admin panel loads** with product management interface

## 🔒 Security Notes

- Admin role is stored in **Public Metadata** (visible to client)
- Server-side validation occurs in middleware for all admin routes
- Non-admin users are automatically redirected from admin pages
- All admin API endpoints should also verify user role

## 📝 Default User Roles

- **No role set**: Regular user (buyer access only)
- **role: "admin"**: Full admin access to dashboard
- **role: "user"**: Explicitly set regular user (same as no role)

## 🛠️ Development Mode Features

- Debug info shows current user role and ID in navbar
- Console logs help track authentication flow
- Error query parameters provide feedback on access issues

Remove debug features before deploying to production!