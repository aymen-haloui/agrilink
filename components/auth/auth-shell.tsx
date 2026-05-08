'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

type Lang = 'en' | 'fr' | 'ar';

interface AuthShellProps {
  title: string;
  subtitle: string;
  mode: 'login' | 'register';
  children: React.ReactNode;
}

const t = {
  en: { backHome: 'Back to Home', createAccount: 'Create account', signIn: 'Sign in' },
  fr: { backHome: 'Accueil', createAccount: 'Créer un compte', signIn: 'Se connecter' },
  ar: { backHome: 'الرئيسية', createAccount: 'إنشاء حساب', signIn: 'تسجيل الدخول' },
};

function LangSwitcher({ language, setLanguage }: { language: Lang; setLanguage: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-[#d0dbe6] bg-[#f8fafc] p-0.5 shadow-[0_1px_4px_rgba(1,40,67,0.08)]">
      {(['en', 'fr', 'ar'] as Lang[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
            language === lang
              ? 'bg-[#012843] text-white shadow-sm'
              : 'text-[#647d94] hover:text-[#012843]'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

export default function AuthShell({ title, subtitle, mode, children }: AuthShellProps) {
  const [language, setLanguage] = useState<Lang>('en');
  const tr = t[language];
  const isRTL = language === 'ar';

  const imageUrl =
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80';

  return (
    <div
      className="min-h-screen overflow-hidden bg-[#f1f4f8]"
      style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── Mobile / Tablet banner ── */}
      <div
        className="relative flex min-h-[220px] items-end overflow-hidden sm:min-h-[260px] lg:hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(1,40,67,0.55) 0%, rgba(1,40,67,0.82) 100%), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        <div className="relative z-10 w-full px-5 pb-7 pt-5 sm:px-8">
          <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 transition hover:text-white">
            <ArrowLeft className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            {tr.backHome}
          </Link>
          <Link href="/" className="block text-base font-black tracking-[0.18em] text-white">AGRILINK</Link>
          <h1 className="mt-2 text-xl font-extrabold leading-snug text-white sm:text-2xl">{title}</h1>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/72">{subtitle}</p>
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden lg:grid lg:min-h-screen" style={{ gridTemplateColumns: '45% 55%' }}>
        {/* Left hero panel */}
        <section
          className="grain-overlay relative flex flex-col justify-between overflow-hidden p-10 xl:p-14"
          style={{
            backgroundImage: `linear-gradient(160deg, rgba(1,40,67,0.92) 0%, rgba(1,40,67,0.78) 50%, rgba(1,40,67,0.65) 100%), url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_14%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(255,49,49,0.22),transparent_32%)]" />
          <div className="absolute -top-12 right-16 h-40 w-40 rounded-full bg-[#ff3131]/20 blur-3xl" />
          <div className="absolute bottom-20 left-8 h-36 w-36 rounded-full bg-white/8 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition-colors duration-200 hover:text-white">
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {tr.backHome}
            </Link>
            <Link href="/" className="mt-5 block text-sm font-black tracking-[0.20em] text-white/90 hover:text-white">
              AGRILINK
            </Link>
          </div>

          <div className="relative z-10 max-w-[420px]">
            <h1 className="text-[2.4rem] font-extrabold leading-[1.08] tracking-tight text-white xl:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-[0.95rem] leading-[1.7] text-white/72">
              {subtitle}
            </p>
          </div>

          {/* Bottom brand strip */}
          <div className="relative z-10 rounded-2xl border border-white/14 bg-white/[0.08] px-5 py-4 backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Trusted platform</p>
            <p className="mt-1 text-sm font-medium text-white/80">
              B2B agricultural marketplace for the Algerian market.
            </p>
          </div>
        </section>

        {/* Right form panel */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f1f4f8] px-8 py-12 xl:px-16">
          <div className="separator-glow" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,49,49,0.06),transparent_40%),radial-gradient(ellipse_at_80%_100%,rgba(1,40,67,0.07),transparent_40%)]" />
          <div className="w-full max-w-[500px]">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href={mode === 'login' ? '/register' : '/login'}
                className="text-sm font-medium text-[#647d94] transition-colors hover:text-[#012843]"
              >
                {mode === 'login' ? tr.createAccount : tr.signIn} →
              </Link>
              <LangSwitcher language={language} setLanguage={setLanguage} />
            </div>
            {children}
          </div>
        </section>
      </div>

      {/* ── Mobile form area ── */}
      <div className="relative bg-[#f1f4f8] px-4 py-8 sm:px-8 sm:py-10 lg:hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,49,49,0.05),transparent_40%)]" />
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href={mode === 'login' ? '/register' : '/login'}
              className="text-sm font-medium text-[#647d94] transition-colors hover:text-[#012843]"
            >
              {mode === 'login' ? tr.createAccount : tr.signIn} →
            </Link>
            <LangSwitcher language={language} setLanguage={setLanguage} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
