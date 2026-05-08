'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/dashboard',
        redirect: false,
      });

      if (result?.error) {
        setError(result.error || 'Invalid email or password');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('[v0] Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 relative overflow-hidden rounded-2xl border border-[#dce5ef] bg-white p-7 shadow-[0_2px_8px_rgba(1,40,67,0.06),0_24px_56px_rgba(1,40,67,0.14)] duration-500 sm:p-9">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3131]/30 to-transparent" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#ff3131]/10 blur-2xl" />

      <div className="mb-8 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff3131]">Secure Access</p>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#012843]">Welcome back</h2>
        <p className="text-base leading-relaxed text-[#647d94]">Sign in to access your marketplace workspace.</p>
      </div>

      <div className="space-y-5">
        {error && (
          <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="rounded-xl border-green-200 bg-green-50 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>Sign in successful! Redirecting...</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a90a4]">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#9db0c3]" />
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        className="h-12 rounded-xl border-[#dce5ef] bg-[#f8fafc] pl-10 text-base text-[#012843] placeholder:text-[#b0c4d4] transition-all duration-200 hover:border-[#c5d5e4] focus-visible:border-[#ff3131]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ff3131]/15 focus-visible:ring-offset-0"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a90a4]">Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#ff3131] transition-opacity hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#9db0c3]" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="h-12 rounded-xl border-[#dce5ef] bg-[#f8fafc] pl-10 pr-11 text-base text-[#012843] placeholder:text-[#b0c4d4] transition-all duration-200 hover:border-[#c5d5e4] focus-visible:border-[#ff3131]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ff3131]/15 focus-visible:ring-offset-0"
                        {...field}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#9db0c3] transition-colors hover:bg-[#f0f4f8] hover:text-[#012843]"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-base text-[#647d94]">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                  className="border-[#c5d5e4]"
                />
                Remember me
              </label>
              <span className="flex items-center gap-1 text-xs text-[#9db0c3]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                Secure session
              </span>
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-[#ff3131] to-[#ff5a5a] text-base font-semibold tracking-[0.01em] text-white shadow-[0_4px_14px_rgba(255,49,49,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(255,49,49,0.40)] active:translate-y-0"
              disabled={isLoading || success}
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>

        <Link href="/register" className="block">
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-xl border-[#dce5ef] bg-white text-base font-medium text-[#4a6278] transition-all duration-200 hover:border-[#c5d5e4] hover:bg-[#f5f8fb] hover:text-[#012843]"
          >
            Create an account
          </Button>
        </Link>
      </div>
    </div>
  );
}
