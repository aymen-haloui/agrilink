'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, BadgeCheck, Globe2, ShieldCheck, Truck } from 'lucide-react';

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
    badge: 'Enterprise marketplace',
    clientNote: 'Client note',
    clientQuote: '"Agrilink helped us reduce procurement cycle time and improve supplier reliability across regions."',
    clientRole: 'Regional Operations Lead',
    procurementPulse: 'Procurement pulse',
    openRFQs: 'Open RFQs',
    transitLoads: 'Transit loads',
    createAccount: 'Create account',
    signIn: 'Sign in',
    metrics: [
      { label: 'Verified suppliers', value: '2,840+' },
      { label: 'Live monthly orders', value: '18.7K' },
      { label: 'Coverage areas', value: '58 wilayas' },
    ],
  },
  fr: {
    backHome: 'Accueil',
    badge: 'Place de marché entreprise',
    clientNote: 'Témoignage',
    clientQuote: '"Agrilink nous a permis de réduire les délais d\'approvisionnement et d\'améliorer la fiabilité des fournisseurs."',
    clientRole: 'Responsable des opérations régionales',
    procurementPulse: 'Tableau de bord',
    openRFQs: 'Appels d\'offres',
    transitLoads: 'Chargements en transit',
    createAccount: 'Créer un compte',
    signIn: 'Se connecter',
    metrics: [
      { label: 'Fournisseurs vérifiés', value: '2 840+' },
      { label: 'Commandes mensuelles', value: '18,7K' },
      { label: 'Zones couvertes', value: '58 wilayas' },
    ],
  },
  ar: {
    backHome: 'الرئيسية',
    badge: 'سوق المؤسسات',
    clientNote: 'تعليق العميل',
    clientQuote: '"أغريلينك ساعدنا على تقليل دورة التوريد وتحسين موثوقية الموردين عبر المناطق."',
    clientRole: 'مدير العمليات الإقليمية',
    procurementPulse: 'لوحة المشتريات',
    openRFQs: 'طلبات العروض',
    transitLoads: 'الشحنات',
    createAccount: 'إنشاء حساب',
    signIn: 'تسجيل الدخول',
    metrics: [
      { label: 'موردون موثوقون', value: '+2,840' },
      { label: 'طلبات شهرية', value: '18.7K' },
      { label: 'مناطق التغطية', value: '58 ولاية' },
    ],
  },
};

const metricIcons = [BadgeCheck, Globe2, Truck];

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
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
                <ShieldCheck className="h-3.5 w-3.5" />
                {tr.badge}
              </p>
              <h1 className="mt-5 text-5xl font-extrabold leading-[1.04] text-white xl:text-6xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/78 xl:text-xl">{subtitle}</p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {tr.metrics.map((item, i) => {
                const Icon = metricIcons[i];
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/26 bg-white/[0.14] p-4 shadow-[0_18px_35px_rgba(1,40,67,0.36)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/[0.18]"
                  >
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff3131]/26">
                      <Icon className="h-4 w-4 text-[#ffd0d0]" />
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-white/72">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute right-0 top-28 hidden w-[280px] rounded-2xl border border-white/20 bg-white/[0.12] p-4 shadow-[0_18px_40px_rgba(1,40,67,0.35)] backdrop-blur-md xl:block animate-float">
              <p className="text-xs uppercase tracking-[0.14em] text-white/65">{tr.procurementPulse}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-white/10 p-2">
                  <p className="text-white/65">{tr.openRFQs}</p>
                  <p className="mt-1 text-base font-bold text-white">184</p>
                </div>
                <div className="rounded-lg bg-white/10 p-2">
                  <p className="text-white/65">{tr.transitLoads}</p>
                  <p className="mt-1 text-base font-bold text-white">62</p>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-[#ff3131] to-[#ff8c8c]" />
              </div>
            </div>
          </div>

          <div className="relative mt-auto rounded-2xl border border-white/24 bg-white/[0.12] p-4 shadow-[0_16px_34px_rgba(1,40,67,0.34)] backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">{tr.clientNote}</p>
            <p className="mt-2 text-sm text-white/80">{tr.clientQuote}</p>
            <p className="mt-3 text-xs font-semibold text-white/65">{tr.clientRole}</p>
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
