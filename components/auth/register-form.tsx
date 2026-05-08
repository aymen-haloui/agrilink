'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Building2, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, UserCircle2 } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['SUPPLIER', 'BUYER'], { errorMap: () => ({ message: 'Please select a role' }) }),
  businessName: z.string().min(2, 'Business name is required'),
  terms: z.boolean().refine(v => v === true, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: undefined,
      businessName: '',
      terms: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          businessName: values.businessName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('[v0] Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 relative overflow-hidden rounded-2xl border border-[#dce5ef] bg-white p-7 shadow-[0_2px_8px_rgba(1,40,67,0.06),0_24px_56px_rgba(1,40,67,0.14)] duration-500 sm:p-9">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3131]/30 to-transparent" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#ff3131]/10 blur-2xl" />
      <div className="mb-8 space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff3131]">Enterprise Onboarding</p>
        <h2 className="text-2xl font-extrabold tracking-tight text-[#012843]">Create your account</h2>
        <p className="text-sm leading-relaxed text-[#647d94]">Join Agrilink as a supplier or buyer and start trading with verified partners.</p>
      </div>

      <div className="space-y-4">
        {error && (
          <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="rounded-xl border-green-200 bg-green-50 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>Account created! Redirecting to login...</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a90a4]">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserCircle2 className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#9db0c3]" />
                      <Input placeholder="John Doe" className="h-11 rounded-xl border-[#dce5ef] bg-[#f8fafc] pl-10 text-sm text-[#012843] placeholder:text-[#b0c4d4] transition-all duration-200 hover:border-[#c5d5e4] focus-visible:border-[#ff3131]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ff3131]/15 focus-visible:ring-offset-0" {...field} disabled={isLoading} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a90a4]">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#9db0c3]" />
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        className="h-11 rounded-xl border-[#dce5ef] bg-[#f8fafc] pl-10 text-sm text-[#012843] placeholder:text-[#b0c4d4] transition-all duration-200 hover:border-[#c5d5e4] focus-visible:border-[#ff3131]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ff3131]/15 focus-visible:ring-offset-0"
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
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a90a4]">I am a</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={isLoading} className="h-11 rounded-xl border-[#dce5ef] bg-[#f8fafc] text-sm text-[#012843] focus:border-[#ff3131]/50 focus:ring-2 focus:ring-[#ff3131]/15">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SUPPLIER">Supplier</SelectItem>
                      <SelectItem value="BUYER">Buyer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a90a4]">Business Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#9db0c3]" />
                      <Input
                        placeholder="Your Company Ltd"
                        className="h-11 rounded-xl border-[#dce5ef] bg-[#f8fafc] pl-10 text-sm text-[#012843] placeholder:text-[#b0c4d4] transition-all duration-200 hover:border-[#c5d5e4] focus-visible:border-[#ff3131]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ff3131]/15 focus-visible:ring-offset-0"
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
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a90a4]">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#9db0c3]" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="h-11 rounded-xl border-[#dce5ef] bg-[#f8fafc] pl-10 pr-11 text-sm text-[#012843] placeholder:text-[#b0c4d4] transition-all duration-200 hover:border-[#c5d5e4] focus-visible:border-[#ff3131]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ff3131]/15 focus-visible:ring-offset-0"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7a90a4]">Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-[#9db0c3]" />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="h-11 rounded-xl border-[#dce5ef] bg-[#f8fafc] pl-10 pr-11 text-sm text-[#012843] placeholder:text-[#b0c4d4] transition-all duration-200 hover:border-[#c5d5e4] focus-visible:border-[#ff3131]/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ff3131]/15 focus-visible:ring-offset-0"
                        {...field}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#9db0c3] transition-colors hover:bg-[#f0f4f8] hover:text-[#012843]"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-[#dce5ef] bg-[#f8fafc] p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="border-[#c5d5e4]"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-[#647d94]">
                      I agree to the{' '}
                      <Link href="/terms" className="font-semibold text-[#ff3131] hover:opacity-80">
                        Terms of Service
                      </Link>
                    </FormLabel>
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-gradient-to-r from-[#ff3131] to-[#ff5a5a] text-sm font-semibold tracking-[0.01em] text-white shadow-[0_4px_14px_rgba(255,49,49,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(255,49,49,0.40)] active:translate-y-0"
              disabled={isLoading || success}
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-[#647d94]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#ff3131] hover:opacity-80">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
