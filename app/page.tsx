'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Boxes,
  ChartColumnBig,
  Globe,
  Handshake,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react';

type Lang = 'en' | 'fr' | 'ar';

const copy: Record<
  Lang,
  {
    nav: {
      marketplace: string;
      features: string;
      resources: string;
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
    trust: Array<{ label: string; value: string }>;
    featuresTitle: string;
    featuresSubtitle: string;
    features: Array<{ title: string; description: string }>;
    footerTitle: string;
    footerColumns: Array<{ heading: string; links: string[] }>;
    footer: string;
  }
> = {
  en: {
    nav: {
      marketplace: 'Marketplace',
      features: 'Features',
      resources: 'Resources',
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
      ctaSecondary: 'Create an Account',
    },
    trust: [
      { label: 'Active Suppliers', value: '280+' },
      { label: 'Monthly Orders', value: '12K' },
      { label: 'On-time Fulfillment', value: '97%' },
      { label: 'Coverage Wilayas', value: '42' },
    ],
    featuresTitle: 'Why teams choose Agrilink',
    featuresSubtitle:
      'Built for modern B2B procurement operations across suppliers, buyers, and logistics teams.',
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
    footerTitle: 'Enterprise-grade marketplace operations, made simple.',
    footerColumns: [
      { heading: 'Marketplace', links: ['Products', 'Orders', 'Payments', 'Notifications'] },
      { heading: 'Suppliers', links: ['Catalog Management', 'Stock Visibility', 'Order Fulfillment', 'Compliance'] },
      { heading: 'Buyers', links: ['Sourcing', 'Procurement Flows', 'Delivery Tracking', 'Support'] },
      { heading: 'Company', links: ['About', 'Contact', 'Privacy', 'Terms'] },
    ],
    footer: 'Agrilink - B2B Agricultural Marketplace',
  },
  fr: {
    nav: {
      marketplace: 'Marketplace',
      features: 'Fonctionnalites',
      resources: 'Ressources',
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
      ctaSecondary: 'Creer un compte',
    },
    trust: [
      { label: 'Fournisseurs actifs', value: '280+' },
      { label: 'Commandes mensuelles', value: '12K' },
      { label: 'Livraisons a temps', value: '97%' },
      { label: 'Wilayas couvertes', value: '42' },
    ],
    featuresTitle: 'Pourquoi les equipes choisissent Agrilink',
    featuresSubtitle:
      'Concu pour les operations B2B modernes entre fournisseurs, acheteurs et logistique.',
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
    footerTitle: 'Operations marketplace de niveau entreprise, simplifiees.',
    footerColumns: [
      { heading: 'Marketplace', links: ['Produits', 'Commandes', 'Paiements', 'Notifications'] },
      { heading: 'Fournisseurs', links: ['Gestion catalogue', 'Visibilite stock', 'Execution commandes', 'Conformite'] },
      { heading: 'Acheteurs', links: ['Approvisionnement', 'Flux achats', 'Suivi livraison', 'Support'] },
      { heading: 'Entreprise', links: ['A propos', 'Contact', 'Confidentialite', 'Conditions'] },
    ],
    footer: 'Agrilink - Place de marche B2B agricole',
  },
  ar: {
    nav: {
      marketplace: 'السوق',
      features: 'المزايا',
      resources: 'الموارد',
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
      ctaSecondary: 'إنشاء حساب جديد',
    },
    trust: [
      { label: 'موردون نشطون', value: '+280' },
      { label: 'طلبات شهرية', value: '12K' },
      { label: 'تسليم في الموعد', value: '%97' },
      { label: 'ولايات مغطاة', value: '42' },
    ],
    featuresTitle: 'لماذا تختار الفرق Agrilink',
    featuresSubtitle:
      'مصمم لعمليات الشراء B2B الحديثة بين الموردين والمشترين وفرق التشغيل.',
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
    footerTitle: 'تشغيل سوق احترافي بمستوى مؤسسي وببساطة.',
    footerColumns: [
      { heading: 'السوق', links: ['المنتجات', 'الطلبات', 'المدفوعات', 'الإشعارات'] },
      { heading: 'الموردون', links: ['إدارة الكتالوج', 'رؤية المخزون', 'تنفيذ الطلبات', 'الامتثال'] },
      { heading: 'المشترون', links: ['التوريد', 'مسارات الشراء', 'تتبع التسليم', 'الدعم'] },
      { heading: 'الشركة', links: ['من نحن', 'اتصل بنا', 'الخصوصية', 'الشروط'] },
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
  const metricIcons = [BadgeCheck, Handshake, Truck, Globe];
  const featureIcons = [Boxes, Users, ChartColumnBig];

  return (
    <main className="surface-noise relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,49,49,0.09),transparent_24%),radial-gradient(circle_at_90%_4%,rgba(1,40,67,0.09),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(1,40,67,0.08),transparent_32%)]" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-20 pt-6 sm:px-10 lg:px-14">
        <header className="sticky top-4 z-20 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 shadow-[0_8px_25px_rgba(1,40,67,0.1)] backdrop-blur-xl sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground shadow-[0_10px_20px_rgba(255,49,49,0.28)]">
              AG
            </div>
            <div>
              <p className="text-base font-black tracking-wide">Agrilink</p>
              <p className="text-xs text-muted-foreground">B2B Agricultural Network</p>
            </div>
          </div>

            <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
              <a href="#marketplace" className="transition-colors hover:text-foreground">{t.nav.marketplace}</a>
              <a href="#features" className="transition-colors hover:text-foreground">{t.nav.features}</a>
              <a href="#resources" className="transition-colors hover:text-foreground">{t.nav.resources}</a>
            </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
            >
              {t.nav.signIn}
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-br from-primary to-[#ff5d5d] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_12px_24px_rgba(255,49,49,0.3)] transition-all duration-300 hover:-translate-y-0.5"
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
              className="rounded-xl border border-input bg-background px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </div>
          </div>
        </header>

        <div id="marketplace" className={`mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr,0.9fr] ${rtl ? 'text-right' : 'text-left'}`}>
          <div className="rounded-[20px] border border-border/80 bg-card/90 p-8 shadow-[0_20px_50px_rgba(1,40,67,0.14)] sm:p-11">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              {t.hero.badge}
            </span>

            <h1 className="mt-5 text-4xl font-black leading-[1.05] text-foreground sm:text-6xl">
              {t.hero.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.hero.subtitle}
            </p>

            <div className={`mt-8 flex flex-wrap gap-4 ${rtl ? 'justify-end' : 'justify-start'}`}>
              <Link
                href="/dashboard"
                className="rounded-xl bg-gradient-to-r from-primary to-[#ff5d5d] px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_16px_28px_rgba(255,49,49,0.3)] transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-border bg-background px-6 py-3 text-sm font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div className={`mt-10 grid gap-3 sm:grid-cols-2 ${rtl ? 'text-right' : 'text-left'}`}>
              {t.trust.map((item, index) => {
                const Icon = metricIcons[index] || BadgeCheck;
                return (
                  <div key={item.label} className="card-premium flex items-center gap-3 rounded-2xl p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xl font-black">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="relative min-h-[420px] rounded-[20px] border border-border bg-gradient-to-br from-[#012843] to-[#0c3b5f] p-6 text-white shadow-[0_20px_44px_rgba(1,40,67,0.34)]">
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.15),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(255,49,49,0.2),transparent_45%)]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Live Marketplace View</p>
              <h3 className="mt-2 text-2xl font-black">Operational Pulse</h3>

              <div className="mt-6 grid gap-3">
                {t.trust.map((item, index) => (
                  <div
                    key={item.label}
                    className="glass-panel animate-float rounded-2xl p-4"
                    style={{ animationDelay: `${index * 0.4}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">{item.label}</span>
                      <span className="h-2 w-2 rounded-full bg-[#ff3131]" />
                    </div>
                    <p className="mt-2 text-2xl font-black">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4">
                <p className="text-xs text-white/70">Verified partner activity</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#ff3131] to-[#ff8a8a]" />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section id="features" className={`mt-16 ${rtl ? 'text-right' : 'text-left'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Capabilities</p>
          <h2 className="mt-2 text-3xl font-black text-foreground sm:text-4xl">{t.featuresTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.featuresSubtitle}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {t.features.map((feature, index) => {
              const Icon = featureIcons[index] || Boxes;
              return (
              <article
                key={feature.title}
                className="card-premium group rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-extrabold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
              );
            })}
          </div>
        </section>

        <footer id="resources" className="mt-16 overflow-hidden rounded-[20px] border border-[#174466] bg-[#012843] p-8 text-white sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
            <div>
              <h3 className="text-2xl font-black sm:text-3xl">{t.footerTitle}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
                {t.footer}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/login" className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
                  {t.nav.signIn}
                </Link>
                <Link href="/register" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                  {t.nav.register}
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {t.footerColumns.map((column) => (
                <div key={column.heading}>
                  <h4 className="text-sm font-bold uppercase tracking-wide text-white/80">{column.heading}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    {column.links.map((item) => (
                      <li key={item} className="transition hover:text-white">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
