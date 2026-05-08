import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import LoginForm from '@/components/auth/login-form';

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default async function LoginPage() {
  const session = await auth();
  
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
