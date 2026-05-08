import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { UserRole, UserStatus } from '@/lib/rbac';

interface CustomSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    status: UserStatus;
  };
}

/**
 * Get current session on server
 */
export async function getServerSession() {
  return (await auth()) as CustomSession | null;
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

/**
 * Require specific role(s)
 */
export async function requireRole(...roles: UserRole[]) {
  const session = await requireAuth();
  if (!roles.includes(session.user.role)) {
    redirect('/unauthorized');
  }
  return session;
}

/**
 * Require verified account
 */
export async function requireVerified() {
  const session = await requireAuth();
  if (session.user.status !== 'VERIFIED') {
    redirect('/auth/verify-email');
  }
  return session;
}

/**
 * Check if user has permission
 */
export async function requirePermission(permission: string) {
  const session = await requireAuth();
  
  const permissions: Record<UserRole, string[]> = {
    ADMIN: [
      'manage:users',
      'manage:products',
      'manage:orders',
      'manage:payments',
      'view:analytics',
      'view:audit-logs',
      'manage:disputes',
    ],
    SUPPLIER: [
      'create:products',
      'edit:own-products',
      'delete:own-products',
      'view:own-orders',
      'manage:own-orders',
      'view:sales-analytics',
      'respond:reviews',
    ],
    BUYER: [
      'create:orders',
      'view:own-orders',
      'manage:own-orders',
      'create:ratings',
      'create:reviews',
      'view:products',
      'view:purchase-history',
    ],
    OPERATOR: [
      'view:orders',
      'update:order-status',
      'view:users',
      'create:notifications',
      'view:reports',
    ],
  };

  const userPermissions = permissions[session.user.role] || [];
  if (!userPermissions.includes(permission)) {
    redirect('/unauthorized');
  }
  
  return session;
}
