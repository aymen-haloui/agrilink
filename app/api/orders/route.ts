import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    const userId = session.user.id;

    let orders;
    if (userRole === 'ADMIN') {
      orders = await prisma.order.findMany({
        include: {
          supplier: { select: { name: true, email: true } },
          buyer: { select: { name: true, email: true } },
          items: { include: { product: true } },
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (userRole === 'SUPPLIER') {
      orders = await prisma.order.findMany({
        where: { supplierId: userId },
        include: {
          supplier: { select: { name: true } },
          buyer: { select: { name: true } },
          items: { include: { product: true } },
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      orders = await prisma.order.findMany({
        where: { buyerId: userId },
        include: {
          supplier: { select: { name: true } },
          buyer: { select: { name: true } },
          items: { include: { product: true } },
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error('[v0] Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { supplierId, items, deliveryAddress, deliveryCity, deliveryCountry } = body;

    if (!supplierId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.quantity * item.unitPrice;
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        supplierId,
        buyerId: session.user.id,
        status: 'PENDING',
        totalAmount,
        deliveryAddress: deliveryAddress || '',
        deliveryCity: deliveryCity || '',
        deliveryCountry: deliveryCountry || 'Algeria',
        items: {
          create: items,
        },
      },
      include: {
        items: true,
        supplier: { select: { name: true } },
      },
    });

    // Create notification for supplier
    await prisma.notification.create({
      data: {
        userId: supplierId,
        orderId: order.id,
        type: 'ORDER_CREATED',
        title: 'New Order Received',
        message: `New order ${order.orderNumber} received from ${session.user.name}`,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'ORDER_CREATED',
        entityType: 'ORDER',
        entityId: order.id,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('[v0] Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
