'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

type Lang = 'en' | 'fr' | 'ar';

interface AuthShellProps {
  mode: 'login' | 'register';
  children: React.ReactNode;
}

const t = {
  en: {
    backHome: 'Back to Home',
    login: {
      title: 'Secure B2B access for procurement and supplier operations.',
      subtitle: 'Sign in to manage orders, supplier activity, and marketplace performance in one trusted workspace.',
    },
    register: {
      title: 'Launch your supplier or buyer account with enterprise-grade workflows.',
      subtitle: 'Create your Agrilink account to access verified B2B procurement, inventory visibility, and role-based operations.',
    },
  },
  fr: {
    backHome: 'Accueil',
    login: {
      title: 'Accès B2B sécurisé pour vos opérations d\'approvisionnement.',
      subtitle: 'Connectez-vous pour gérer vos commandes, vos fournisseurs et vos performances sur une seule plateforme.',
    },
    register: {
      title: 'Lancez votre compte fournisseur ou acheteur avec des workflows professionnels.',
      subtitle: 'Créez votre compte Agrilink pour accéder aux achats B2B vérifiés et aux opérations basées sur les rôles.',
    },
  },
  ar: {
    backHome: 'الرئيسية',
    login: {
      title: 'وصول B2B آمن لعمليات المشتريات والموردين.',
      subtitle: 'سجّل دخولك لإدارة الطلبات ونشاط الموردين وأداء السوق في مساحة عمل واحدة.',
    },
    register: {
      title: 'أنشئ حساب مورد أو مشترٍ بسير عمل احترافي.',
      subtitle: 'أنشئ حسابك في Agrilink للوصول إلى المشتريات B2B الموثّقة والعمليات حسب الدور.',
    },
  },
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

export default function AuthShell({ mode, children }: AuthShellProps) {
  const [language, setLanguage] = useState<Lang>('en');
  const tr = t[language];
  const content = tr[mode];
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
          <div className="mb-4 flex justify-end">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 transition hover:text-white">
              {tr.backHome}
              <ArrowLeft className={`h-3.5 w-3.5 ${isRTL ? '' : 'rotate-180'}`} />
            </Link>
          </div>
          <Link href="/" className="block text-xl font-black tracking-[0.18em] text-white">AGRILINK</Link>
          <h1 className="mt-2 text-xl font-extrabold leading-snug text-white sm:text-2xl">{content.title}</h1>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/72">{content.subtitle}</p>
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

          {/* Top row: brand left, back-to-home right */}
          <div className="relative z-10 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-[0.18em] text-white transition-opacity hover:opacity-80">
              AGRILINK
            </Link>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition-colors duration-200 hover:text-white">
              {tr.backHome}
              <ArrowLeft className={`h-4 w-4 ${isRTL ? '' : 'rotate-180'}`} />
            </Link>
          </div>

          {/* Center content */}
          <div className="relative z-10 max-w-[420px]">
            <h1 className="text-[2.4rem] font-extrabold leading-[1.08] tracking-tight text-white xl:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 text-[0.95rem] leading-[1.7] text-white/72">
              {content.subtitle}
            </p>
          </div>

          {/* Spacer to push content to middle */}
          <div />
        </section>

        {/* Right form panel */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f1f4f8] px-8 py-12 xl:px-16">
          <div className="separator-glow" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,49,49,0.06),transparent_40%),radial-gradient(ellipse_at_80%_100%,rgba(1,40,67,0.07),transparent_40%)]" />
          <div className="w-full max-w-[500px]">
            <div className="mb-8 flex justify-end">
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
          <div className="mb-6 flex justify-end">
            <LangSwitcher language={language} setLanguage={setLanguage} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
