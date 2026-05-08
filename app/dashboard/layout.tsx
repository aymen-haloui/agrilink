import { requireAuth } from '@/lib/auth-utils';
import DashboardSidebar from '@/components/dashboard/sidebar';
import DashboardHeader from '@/components/dashboard/header';

export const metadata = {
  title: 'Agrilink Dashboard',
  description: 'Agrilink B2B Marketplace Dashboard',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar session={session} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader session={session} />
        <main className="flex-1 overflow-auto">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
