import { Session } from 'next-auth';

export type UserRole = 'ADMIN' | 'SUPPLIER' | 'BUYER' | 'OPERATOR';
export type UserStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'SUSPENDED' | 'INACTIVE';

// Define role-based permissions
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

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    status: UserStatus;
  };
}

export function hasPermission(
  session: CustomSession | null,
  permission: string
): boolean {
  if (!session?.user) {
    return false;
  }

  const userPermissions = permissions[session.user.role] || [];
  return userPermissions.includes(permission);
}

export function hasRole(session: CustomSession | null, roles: UserRole[]): boolean {
  if (!session?.user) {
    return false;
  }

  return roles.includes(session.user.role);
}

export function isVerified(session: CustomSession | null): boolean {
  if (!session?.user) {
    return false;
  }

  return session.user.status === 'VERIFIED';
}

export function getPermissions(role: UserRole): string[] {
  return permissions[role] || [];
}

// Role hierarchy for checking if user has access to admin features
export function canAccessAdminPanel(session: CustomSession | null): boolean {
  return hasRole(session, ['ADMIN', 'OPERATOR']);
}

export function canAccessSupplierPanel(session: CustomSession | null): boolean {
  return hasRole(session, ['ADMIN', 'SUPPLIER']);
}

export function canAccessBuyerPanel(session: CustomSession | null): boolean {
  return hasRole(session, ['ADMIN', 'BUYER']);
}

// Check if user is account owner
export function isAccountOwner(session: CustomSession | null, userId: string): boolean {
  return session?.user?.id === userId;
}

// Check if user is resource owner
export function isResourceOwner(
  session: CustomSession | null,
  resourceOwnerId: string
): boolean {
  return session?.user?.id === resourceOwnerId || session?.user?.role === 'ADMIN';
}
