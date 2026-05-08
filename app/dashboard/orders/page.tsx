import { requireAuth } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Orders',
  description: 'View and manage orders',
};

export default async function OrdersPage() {
  const session = await requireAuth();
  const userId = session.user.id;
  const userRole = (session.user as any).role;

  let orders;
  if (userRole === 'ADMIN') {
    orders = await prisma.order.findMany({
      include: {
        supplier: { select: { name: true } },
        buyer: { select: { name: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  } else if (userRole === 'SUPPLIER') {
    orders = await prisma.order.findMany({
      where: { supplierId: userId },
      include: {
        supplier: { select: { name: true } },
        buyer: { select: { name: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  } else {
    orders = await prisma.order.findMany({
      where: { buyerId: userId },
      include: {
        supplier: { select: { name: true } },
        buyer: { select: { name: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200',
      CONFIRMED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200',
      SHIPPED: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200',
      DELIVERED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200',
      CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200',
      RETURNED: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-200',
    };
    return colors[status] || colors.PENDING;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">
            {userRole === 'SUPPLIER'
              ? 'Manage incoming supplier orders'
              : 'View and manage your orders'}
          </p>
        </div>
        {userRole === 'BUYER' && (
          <Button asChild className="gap-2">
            <Link href="/dashboard/orders/new">
              <Plus className="h-4 w-4" />
              Create Order
            </Link>
          </Button>
        )}
      </div>

      {orders.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground text-center">
              {userRole === 'BUYER'
                ? 'Create your first order to get started'
                : 'No orders to display'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      {userRole === 'SUPPLIER' ? 'Buyer' : 'Supplier'}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm font-medium">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {userRole === 'SUPPLIER'
                          ? order.buyer.name
                          : order.supplier.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {order.items.length} item(s)
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        DZD {order.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/dashboard/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
