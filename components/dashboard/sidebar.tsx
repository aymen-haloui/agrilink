'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  BarChart3,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  session: Session;
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
    roles: ['ADMIN', 'SUPPLIER', 'BUYER', 'OPERATOR'],
  },
  {
    icon: Package,
    label: 'Products',
    href: '/dashboard/products',
    roles: ['ADMIN', 'SUPPLIER'],
  },
  {
    icon: ShoppingCart,
    label: 'Orders',
    href: '/dashboard/orders',
    roles: ['ADMIN', 'SUPPLIER', 'BUYER'],
  },
  {
    icon: CreditCard,
    label: 'Payments',
    href: '/dashboard/payments',
    roles: ['ADMIN', 'SUPPLIER', 'BUYER'],
  },
  {
    icon: Bell,
    label: 'Notifications',
    href: '/dashboard/notifications',
    roles: ['ADMIN', 'SUPPLIER', 'BUYER'],
  },
  {
    icon: Users,
    label: 'Users',
    href: '/dashboard/users',
    roles: ['ADMIN', 'OPERATOR'],
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    href: '/dashboard/analytics',
    roles: ['ADMIN', 'OPERATOR'],
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/dashboard/settings',
    roles: ['ADMIN', 'SUPPLIER', 'BUYER'],
  },
];

export default function DashboardSidebar({ session }: DashboardSidebarProps) {
  const pathname = usePathname();

  const userRole = ((session.user as any)?.role as string) || 'BUYER';
  const userEmail = session.user?.email || 'unknown@agrilink';
  const visibleItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="border-b border-border px-6 py-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
            AG
          </div>
          <span className="font-semibold">Agrilink</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-4 space-y-3">
        <div className="px-4 py-3 rounded-lg bg-muted">
          <p className="text-xs text-muted-foreground">Signed in as</p>
          <p className="text-sm font-semibold truncate">{userEmail}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {userRole.toLowerCase()}
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
