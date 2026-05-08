import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

const errorMessages: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration. Please try again later.',
  AccessDenied: 'You do not have permission to access this resource.',
  Verification: 'The verification link is invalid or has expired.',
  Default: 'An unexpected error occurred. Please try again.',
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params?.error ?? 'Default';
  const message = errorMessages[error] ?? errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1f4f8] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#dce5ef] bg-white p-10 shadow-[0_2px_8px_rgba(1,40,67,0.06),0_24px_56px_rgba(1,40,67,0.12)] text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-7 w-7 text-[#ff3131]" />
        </div>
        <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-[#012843]">Authentication Error</h1>
        <p className="mb-8 text-[0.95rem] leading-relaxed text-[#647d94]">{message}</p>
        <Link
          href="/login"
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#ff3131] to-[#ff5a5a] text-sm font-semibold text-white shadow-[0_4px_14px_rgba(255,49,49,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(255,49,49,0.40)]"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
