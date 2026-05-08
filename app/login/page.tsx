import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import LoginForm from '@/components/auth/login-form';
import AuthShell from '@/components/auth/auth-shell';

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default async function LoginPage() {
  const session = await auth();
  const hasValidSession = !!session?.user?.id && !!(session.user as any)?.role;
  
  if (hasValidSession) {
    redirect('/dashboard');
  }

  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  );
}
