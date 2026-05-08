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
  en: {
    backHome: 'Back to Home',
    createAccount: 'Create account',
    signIn: 'Sign in',
  },
  fr: {
    backHome: 'Accueil',
    createAccount: 'Créer un compte',
    signIn: 'Se connecter',
  },
  ar: {
    backHome: 'الرئيسية',
    createAccount: 'إنشاء حساب',
    signIn: 'تسجيل الدخول',
  },
};

function LangSwitcher({ language, setLanguage }: { language: Lang; setLanguage: (l: Lang) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Language"
      className="inline-flex rounded-xl border border-[#d0dbe6] bg-white/88 p-1 shadow-sm"
    >
      {(['en', 'fr', 'ar'] as Lang[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
            language === lang
              ? 'bg-[#012843] text-white shadow-sm'
              : 'text-[#4f697f] hover:bg-[#eef3f8] hover:text-[#012843]'
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
    <div className="min-h-screen overflow-hidden bg-[#f5f7fa] lg:grid lg:grid-cols-2" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left brand panel — desktop only */}
      <section
        className="grain-overlay relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12"
        style={{
          backgroundImage: `linear-gradient(165deg, rgba(1,40,67,0.88) 0%, rgba(1,40,67,0.72) 42%, rgba(1,40,67,0.62) 100%), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(255,49,49,0.26),transparent_34%),radial-gradient(circle_at_76%_80%,rgba(1,40,67,0.48),transparent_38%)]" />
        <div className="absolute -top-16 right-20 h-44 w-44 rounded-full bg-[#ff3131]/24 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white">
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {tr.backHome}
            </Link>

            <Link href="/" className="mt-6 inline-flex items-center gap-3">
              <span className="text-lg font-extrabold tracking-wide text-white">Agrilink</span>
            </Link>

            <div className="mt-12 max-w-xl animate-fade-slide">
              <h1 className="text-5xl font-extrabold leading-[1.04] text-white xl:text-6xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/78 xl:text-xl">{subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right form panel */}
      <section className="relative flex min-h-screen items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="separator-glow hidden lg:block" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(255,49,49,0.08),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(1,40,67,0.09),transparent_34%)]" />
        <div className="w-full max-w-xl">
          {/* Mobile header */}
          <div className="mb-7 flex items-center justify-between lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#012843]">
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {tr.backHome}
            </Link>
            <div className="flex items-center gap-2">
              <LangSwitcher language={language} setLanguage={setLanguage} />
              <Link
                href={mode === 'login' ? '/register' : '/login'}
                className="rounded-xl border border-[#d1dbe6] px-3 py-2 text-xs font-semibold text-[#012843]"
              >
                {mode === 'login' ? tr.createAccount : tr.signIn}
              </Link>
            </div>
          </div>

          {/* Desktop: back to home + language switcher above the form */}
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#567087] transition hover:text-[#012843]">
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {tr.backHome}
            </Link>
            <LangSwitcher language={language} setLanguage={setLanguage} />
          </div>

          {children}
        </div>
      </section>
    </div>
  );
}
