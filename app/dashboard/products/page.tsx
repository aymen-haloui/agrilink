import { requireRole } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Products',
  description: 'Manage your products',
};

export default async function ProductsPage() {
  const session = await requireRole('SUPPLIER', 'ADMIN');
  const userId = session.user.id;

  let products;
  if ((session.user as any).role === 'ADMIN') {
    products = await prisma.product.findMany({
      include: { supplier: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  } else {
    products = await prisma.product.findMany({
      where: { supplierId: userId },
      include: { supplier: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Start by adding your first product to your catalog
            </p>
            <Button asChild>
              <Link href="/dashboard/products/new">Add Your First Product</Link>
            </Button>
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
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm font-medium">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        DZD {product.basePrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          product.stock > 0
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {product.supplier.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/dashboard/products/${product.id}`}>
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
