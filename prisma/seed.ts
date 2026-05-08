import { PrismaClient, UserRole, OrderStatus, PaymentStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "AuditLog", "Review", "Rating", "Notification", "Payment", "OrderItem", "Order", "Product", "User" CASCADE;'
  );

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@agrilink.dz',
      name: 'Admin User',
      password: hashedPassword,
      role: UserRole.ADMIN,
      status: 'VERIFIED',
      phone: '+213 21 123 4567',
      country: 'Algeria',
      city: 'Algiers',
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  // Create suppliers
  const suppliers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'supplier1@agrilink.dz',
        name: 'AgroTrade Algérie',
        password: hashedPassword,
        role: UserRole.SUPPLIER,
        status: 'VERIFIED',
        phone: '+213 21 555 0001',
        country: 'Algeria',
        city: 'Algiers',
        businessName: 'AgroTrade Algérie SARL',
        registrationNumber: 'REG001',
        taxId: 'TAX001',
        emailVerified: true,
        emailVerifiedAt: new Date(),
        bio: 'Leading agricultural commodity supplier',
      },
    }),
    prisma.user.create({
      data: {
        email: 'supplier2@agrilink.dz',
        name: 'Industrial Textiles Ltd',
        password: hashedPassword,
        role: UserRole.SUPPLIER,
        status: 'VERIFIED',
        phone: '+213 21 555 0002',
        country: 'Algeria',
        city: 'Oran',
        businessName: 'Industrial Textiles Ltd',
        registrationNumber: 'REG002',
        taxId: 'TAX002',
        emailVerified: true,
        emailVerifiedAt: new Date(),
        bio: 'Premium textile products',
      },
    }),
    prisma.user.create({
      data: {
        email: 'supplier3@agrilink.dz',
        name: 'Steel & Metal Trading',
        password: hashedPassword,
        role: UserRole.SUPPLIER,
        status: 'VERIFIED',
        phone: '+213 21 555 0003',
        country: 'Algeria',
        city: 'Constantine',
        businessName: 'Steel & Metal Trading Inc',
        registrationNumber: 'REG003',
        taxId: 'TAX003',
        emailVerified: true,
        emailVerifiedAt: new Date(),
        bio: 'Industrial metal supplies',
      },
    }),
  ]);

  // Create buyers
  const buyers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'buyer1@agrilink.dz',
        name: 'Mohamed Retail Co',
        password: hashedPassword,
        role: UserRole.BUYER,
        status: 'VERIFIED',
        phone: '+213 21 555 1001',
        country: 'Algeria',
        city: 'Algiers',
        businessName: 'Mohamed Retail Co',
        registrationNumber: 'BUYER001',
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'buyer2@agrilink.dz',
        name: 'Fatima Trade Group',
        password: hashedPassword,
        role: UserRole.BUYER,
        status: 'VERIFIED',
        phone: '+213 21 555 1002',
        country: 'Algeria',
        city: 'Oran',
        businessName: 'Fatima Trade Group',
        registrationNumber: 'BUYER002',
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'buyer3@agrilink.dz',
        name: 'Eastern Import Co',
        password: hashedPassword,
        role: UserRole.BUYER,
        status: 'VERIFIED',
        phone: '+213 21 555 1003',
        country: 'Algeria',
        city: 'Constantine',
        businessName: 'Eastern Import Co',
        registrationNumber: 'BUYER003',
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    }),
  ]);

  // Create products for supplier 1
  const products1 = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Organic Wheat Grain',
        description: 'High-quality organic wheat suitable for flour milling',
        category: 'Agriculture',
        sku: 'WHEAT-001',
        basePrice: 450,
        minOrder: 100,
        stock: 5000,
        supplierId: suppliers[0].id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Barley Seeds',
        description: 'Premium barley seeds for brewing and animal feed',
        category: 'Agriculture',
        sku: 'BARLEY-001',
        basePrice: 520,
        minOrder: 50,
        stock: 3000,
        supplierId: suppliers[0].id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Olive Oil - Extra Virgin',
        description: 'Cold-pressed extra virgin olive oil from Algeria',
        category: 'Agriculture',
        sku: 'OLIVE-001',
        basePrice: 2800,
        minOrder: 10,
        stock: 500,
        supplierId: suppliers[0].id,
        isActive: true,
      },
    }),
  ]);

  // Create products for supplier 2
  const products2 = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Cotton Fabric - 100% Pure',
        description: 'High-grade pure cotton fabric, 150cm width',
        category: 'Textiles',
        sku: 'COTTON-001',
        basePrice: 650,
        minOrder: 20,
        stock: 2000,
        supplierId: suppliers[1].id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Polyester Blend Fabric',
        description: 'Durable polyester-cotton blend for industrial use',
        category: 'Textiles',
        sku: 'POLY-001',
        basePrice: 480,
        minOrder: 30,
        stock: 3500,
        supplierId: suppliers[1].id,
        isActive: true,
      },
    }),
  ]);

  // Create products for supplier 3
  const products3 = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Steel Rods - Grade A',
        description: 'High-strength steel rods for construction',
        category: 'Metals',
        sku: 'STEEL-001',
        basePrice: 3200,
        minOrder: 50,
        stock: 1000,
        supplierId: suppliers[2].id,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Aluminum Sheets',
        description: 'Industrial-grade aluminum sheets',
        category: 'Metals',
        sku: 'ALUM-001',
        basePrice: 2100,
        minOrder: 40,
        stock: 800,
        supplierId: suppliers[2].id,
        isActive: true,
      },
    }),
  ]);

  // Create orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-001',
        supplierId: suppliers[0].id,
        buyerId: buyers[0].id,
        status: OrderStatus.DELIVERED,
        totalAmount: 45000,
        deliveryAddress: '123 Business Street',
        deliveryCity: 'Algiers',
        deliveryCountry: 'Algeria',
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        actualDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        trackingNumber: 'TRACK001',
        confirmedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        shippedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        items: {
          create: [
            {
              productId: products1[0].id,
              quantity: 100,
              unitPrice: 450,
              totalPrice: 45000,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-002',
        supplierId: suppliers[1].id,
        buyerId: buyers[1].id,
        status: OrderStatus.SHIPPED,
        totalAmount: 26000,
        deliveryAddress: '456 Trade Avenue',
        deliveryCity: 'Oran',
        deliveryCountry: 'Algeria',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        trackingNumber: 'TRACK002',
        confirmedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        shippedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        items: {
          create: [
            {
              productId: products2[0].id,
              quantity: 40,
              unitPrice: 650,
              totalPrice: 26000,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-003',
        supplierId: suppliers[2].id,
        buyerId: buyers[2].id,
        status: OrderStatus.CONFIRMED,
        totalAmount: 160000,
        deliveryAddress: '789 Industrial Road',
        deliveryCity: 'Constantine',
        deliveryCountry: 'Algeria',
        estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        trackingNumber: null,
        confirmedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        items: {
          create: [
            {
              productId: products3[0].id,
              quantity: 50,
              unitPrice: 3200,
              totalPrice: 160000,
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-004',
        supplierId: suppliers[0].id,
        buyerId: buyers[0].id,
        status: OrderStatus.PENDING,
        totalAmount: 28000,
        deliveryAddress: '123 Business Street',
        deliveryCity: 'Algiers',
        deliveryCountry: 'Algeria',
        estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        items: {
          create: [
            {
              productId: products1[1].id,
              quantity: 50,
              unitPrice: 520,
              totalPrice: 26000,
            },
            {
              productId: products1[2].id,
              quantity: 1,
              unitPrice: 2800,
              totalPrice: 2800,
            },
          ],
        },
      },
    }),
  ]);

  // Create payments
  await Promise.all([
    prisma.payment.create({
      data: {
        orderId: orders[0].id,
        userId: buyers[0].id,
        amount: 45000,
        status: PaymentStatus.COMPLETED,
        method: 'BANK_TRANSFER',
        transactionId: 'TXN-2024-001',
        reference: 'REF-2024-001',
        completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.payment.create({
      data: {
        orderId: orders[1].id,
        userId: buyers[1].id,
        amount: 26000,
        status: PaymentStatus.PENDING,
        method: 'BANK_TRANSFER',
        transactionId: 'TXN-2024-002',
        reference: 'REF-2024-002',
      },
    }),
    prisma.payment.create({
      data: {
        orderId: orders[2].id,
        userId: buyers[2].id,
        amount: 160000,
        status: PaymentStatus.COMPLETED,
        method: 'BANK_TRANSFER',
        transactionId: 'TXN-2024-003',
        reference: 'REF-2024-003',
        completedAt: new Date(),
      },
    }),
  ]);

  // Create notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: buyers[0].id,
        orderId: orders[0].id,
        type: 'ORDER_DELIVERED',
        title: 'Order Delivered',
        message: 'Your order ORD-2024-001 has been delivered successfully',
        status: 'READ',
        readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.notification.create({
      data: {
        userId: buyers[1].id,
        orderId: orders[1].id,
        type: 'ORDER_SHIPPED',
        title: 'Order Shipped',
        message: 'Your order ORD-2024-002 has been shipped',
        status: 'UNREAD',
      },
    }),
    prisma.notification.create({
      data: {
        userId: buyers[2].id,
        orderId: orders[2].id,
        type: 'ORDER_CONFIRMED',
        title: 'Order Confirmed',
        message: 'Your order ORD-2024-003 has been confirmed',
        status: 'UNREAD',
      },
    }),
  ]);

  // Create ratings
  await Promise.all([
    prisma.rating.create({
      data: {
        ratedById: buyers[0].id,
        productId: products1[0].id,
        type: 'PRODUCT',
        score: 5,
        comment: 'Excellent quality wheat, will order again',
      },
    }),
    prisma.rating.create({
      data: {
        ratedById: buyers[1].id,
        productId: products2[0].id,
        type: 'PRODUCT',
        score: 4,
        comment: 'Good fabric quality',
      },
    }),
  ]);

  console.log('Database seed completed successfully!');
  console.log('\nDemo Credentials:');
  console.log('Admin: admin@agrilink.dz / password123');
  console.log('Supplier 1: supplier1@agrilink.dz / password123');
  console.log('Supplier 2: supplier2@agrilink.dz / password123');
  console.log('Supplier 3: supplier3@agrilink.dz / password123');
  console.log('Buyer 1: buyer1@agrilink.dz / password123');
  console.log('Buyer 2: buyer2@agrilink.dz / password123');
  console.log('Buyer 3: buyer3@agrilink.dz / password123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
