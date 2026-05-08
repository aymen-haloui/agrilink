import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import RegisterForm from '@/components/auth/register-form';
import AuthShell from '@/components/auth/auth-shell';

export const metadata = {
  title: 'Create Account',
  description: 'Register for a new account',
};

export default async function RegisterPage() {
  const session = await auth();
  const hasValidSession = !!session?.user?.id && !!(session.user as any)?.role;
  
  if (hasValidSession) {
    redirect('/dashboard');
  }

  return (
    <AuthShell
      mode="register"
      title="Launch your supplier or buyer account with enterprise-grade workflows."
      subtitle="Create your Agrilink account to access verified B2B procurement, inventory visibility, and role-based operations."
    >
      <RegisterForm />
    </AuthShell>
  );
}
