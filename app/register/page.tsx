import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import RegisterForm from '@/components/auth/register-form';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-8">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
