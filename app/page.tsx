'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Lang = 'en' | 'fr' | 'ar';

const copy: Record<
  Lang,
  {
    nav: {
      product: string;
      pricing: string;
      signIn: string;
      register: string;
      language: string;
    };
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    stats: Array<{ label: string; value: string }>;
    featuresTitle: string;
    features: Array<{ title: string; description: string }>;
    footer: string;
  }
> = {
  en: {
    nav: {
      product: 'Marketplace',
      pricing: 'Solutions',
      signIn: 'Sign In',
      register: 'Register',
      language: 'Language',
    },
    hero: {
      badge: 'Built for Algerian Agri Trade',
      title: 'Connect farms, suppliers, and buyers in one B2B flow.',
      subtitle:
        'Agrilink helps wholesalers source faster, track inventory in real time, and close deals with verified partners.',
      ctaPrimary: 'Enter Dashboard',
      ctaSecondary: 'Sign In',
    },
    stats: [
      { label: 'Active Suppliers', value: '280+' },
      { label: 'Monthly Orders', value: '12K' },
      { label: 'On-time Fulfillment', value: '97%' },
    ],
    featuresTitle: 'Why teams choose Agrilink',
    features: [
      {
        title: 'Unified Product Catalog',
        description: 'Manage SKUs, pricing tiers, and stock levels in one workspace.',
      },
      {
        title: 'Role-based Workflows',
        description: 'Buyers, suppliers, and operators each get tools tailored to their role.',
      },
      {
        title: 'Operational Visibility',
        description: 'Track order status, payments, and notifications from a single dashboard.',
      },
    ],
    footer: 'Agrilink - B2B Agricultural Marketplace',
  },
  fr: {
    nav: {
      product: 'Marketplace',
      pricing: 'Solutions',
      signIn: 'Se connecter',
      register: 'Inscription',
      language: 'Langue',
    },
    hero: {
      badge: 'Concu pour le commerce agricole algerien',
      title: 'Reliez fermes, fournisseurs et acheteurs dans un seul flux B2B.',
      subtitle:
        'Agrilink aide les grossistes a s approvisionner plus vite, suivre le stock en temps reel et conclure avec des partenaires verifies.',
      ctaPrimary: 'Ouvrir le Dashboard',
      ctaSecondary: 'Se connecter',
    },
    stats: [
      { label: 'Fournisseurs actifs', value: '280+' },
      { label: 'Commandes mensuelles', value: '12K' },
      { label: 'Livraisons a temps', value: '97%' },
    ],
    featuresTitle: 'Pourquoi les equipes choisissent Agrilink',
    features: [
      {
        title: 'Catalogue produits unifie',
        description: 'Gerez les SKU, paliers de prix et niveaux de stock dans un seul espace.',
      },
      {
        title: 'Flux selon les roles',
        description: 'Acheteurs, fournisseurs et operateurs disposent d outils adaptes.',
      },
      {
        title: 'Visibilite operationnelle',
        description: 'Suivez commandes, paiements et notifications depuis un tableau unique.',
      },
    ],
    footer: 'Agrilink - Place de marche B2B agricole',
  },
  ar: {
    nav: {
      product: 'السوق',
      pricing: 'الحلول',
      signIn: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      language: 'اللغة',
    },
    hero: {
      badge: 'مبني للتجارة الزراعية في الجزائر',
      title: 'اربط المزارع والموردين والمشترين في مسار B2B واحد.',
      subtitle:
        'Agrilink يساعد تجار الجملة على التوريد بسرعة، متابعة المخزون لحظيا، واغلاق الصفقات مع شركاء موثقين.',
      ctaPrimary: 'الدخول الى لوحة التحكم',
      ctaSecondary: 'تسجيل الدخول',
    },
    stats: [
      { label: 'موردون نشطون', value: '+280' },
      { label: 'طلبات شهرية', value: '12K' },
      { label: 'تسليم في الموعد', value: '%97' },
    ],
    featuresTitle: 'لماذا تختار الفرق Agrilink',
    features: [
      {
        title: 'كتالوج موحد للمنتجات',
        description: 'ادارة الاصناف والتسعير ومستويات المخزون من مساحة واحدة.',
      },
      {
        title: 'سير عمل حسب الدور',
        description: 'المشتري والمورد والمشغل لكل منهم ادوات مناسبة لمساره.',
      },
      {
        title: 'رؤية تشغيلية كاملة',
        description: 'تتبع الطلبات والمدفوعات والتنبيهات من لوحة تحكم واحدة.',
      },
    ],
    footer: 'Agrilink - منصة B2B للقطاع الزراعي',
  },
};

export default function HomePage() {
  const [language, setLanguage] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('agrilink-lang') as Lang | null;
    if (saved && ['en', 'fr', 'ar'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('agrilink-lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = useMemo(() => copy[language], [language]);
  const rtl = language === 'ar';

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(252,253,255,0.95),transparent_38%),radial-gradient(circle_at_80%_15%,rgba(1,40,67,0.12),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(255,49,49,0.12),transparent_28%)]" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-12 pt-8 sm:px-10 lg:px-14">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card/85 px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground">
              AG
            </div>
            <div>
              <p className="text-base font-extrabold tracking-wide">Agrilink</p>
              <p className="text-xs text-muted-foreground">B2B Agricultural Network</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">{t.nav.product}</span>
            <span className="hidden text-sm text-muted-foreground sm:inline">{t.nav.pricing}</span>
            <Link
              href="/login"
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              {t.nav.signIn}
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              {t.nav.register}
            </Link>
            <label className="hidden text-sm font-semibold text-muted-foreground sm:inline" htmlFor="language-selector">
              {t.nav.language}
            </label>
            <select
              id="language-selector"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Lang)}
              className="rounded-lg border border-input bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </header>

        <div className={`mt-10 grid items-start gap-8 lg:grid-cols-[1.2fr,0.8fr] ${rtl ? 'text-right' : 'text-left'}`}>
          <div className="rounded-3xl border border-border bg-card/95 p-7 shadow-[0_14px_50px_rgba(1,40,67,0.14)] sm:p-10">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              {t.hero.badge}
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight text-foreground sm:text-5xl">
              {t.hero.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.hero.subtitle}
            </p>

            <div className={`mt-8 flex flex-wrap gap-3 ${rtl ? 'justify-end' : 'justify-start'}`}>
              <Link
                href="/dashboard"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground transition hover:bg-muted"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <aside className="grid gap-4">
            {t.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-accent p-5 text-accent-foreground shadow-[0_10px_24px_rgba(1,40,67,0.2)]"
              >
                <p className="text-3xl font-black">{item.value}</p>
                <p className="mt-1 text-sm text-accent-foreground/80">{item.label}</p>
              </div>
            ))}
          </aside>
        </div>

        <section className={`mt-10 ${rtl ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl font-black text-foreground">{t.featuresTitle}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {t.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-card/95 p-5"
              >
                <h3 className="text-base font-extrabold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground">
          {t.footer}
        </footer>
      </section>
    </main>
  );
}
