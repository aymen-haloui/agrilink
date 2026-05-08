'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Globe,
  Handshake,
  Truck,
} from 'lucide-react';

type Lang = 'en' | 'fr' | 'ar';

const copy: Record<
  Lang,
  {
    nav: {
      value: string;
      howItWorks: string;
      product: string;
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
    demo: string;
    footerTitle: string;
    footerColumns: Array<{ heading: string; links: string[] }>;
    footer: string;
  }
> = {
  en: {
    nav: {
      value: 'Marketplace Value',
      howItWorks: 'How It Works',
      product: 'Product Preview',
      signIn: 'Sign In',
      register: 'Access Platform',
      language: 'Language',
    },
    hero: {
      badge: 'Built for Algerian Agri Trade',
      title: 'Anticipate supply risk and secure every procurement decision.',
      subtitle:
        'Agrilink combines verified supplier intelligence, operational visibility, and B2B workflows to speed sourcing and protect margins.',
      ctaPrimary: 'Access platform',
      ctaSecondary: 'View product walkthrough',
    },
    trust: [
      { label: 'to prioritize a critical risk', value: '< 20 s' },
      { label: 'interaction and partner context', value: '360 deg' },
      { label: 'decision support available', value: '24/7' },
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
    demo: 'Book a platform demo',
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
      value: 'Valeur platforme',
      howItWorks: 'Fonctionnement',
      product: 'Apercu produit',
      signIn: 'Se connecter',
      register: 'Acceder a la plateforme',
      language: 'Langue',
    },
    hero: {
      badge: 'Concu pour le commerce agricole algerien',
      title: 'Anticipez le risque operationnel et securisez chaque decision d achat.',
      subtitle:
        'Agrilink combine donnees fournisseurs verifiees, visibilite operationnelle et flux B2B pour accelerer l approvisionnement.',
      ctaPrimary: 'Acceder a la plateforme',
      ctaSecondary: 'Voir une demonstration',
    },
    trust: [
      { label: 'pour prioriser un risque critique', value: '< 20 s' },
      { label: 'vision interactions et contexte', value: '360 deg' },
      { label: 'support decisionnel disponible', value: '24/7' },
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
    demo: 'Demander une demonstration',
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
      value: 'قيمة المنصة',
      howItWorks: 'طريقة العمل',
      product: 'معاينة المنتج',
      signIn: 'تسجيل الدخول',
      register: 'الدخول الى المنصة',
      language: 'اللغة',
    },
    hero: {
      badge: 'مبني للتجارة الزراعية في الجزائر',
      title: 'توقع مخاطر التوريد وامن كل قرار شراء.',
      subtitle:
        'Agrilink يجمع بيانات الموردين الموثوقين مع رؤية تشغيلية واضحة ومسارات B2B لتسريع قرارات الشراء.',
      ctaPrimary: 'الدخول الى المنصة',
      ctaSecondary: 'عرض توضيحي',
    },
    trust: [
      { label: 'لتحديد الخطر الحرج', value: '< 20 ث' },
      { label: 'رؤية التفاعلات والسياق', value: '360 درجة' },
      { label: 'دعم القرار متاح', value: '24/7' },
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
    demo: 'احجز عرضا توضيحيا',
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
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = useMemo(() => copy[language], [language]);
  const rtl = language === 'ar';
  const metricIcons = [BadgeCheck, Handshake, Truck, Globe];
  const heroImage =
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=80';

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f5f7fa] text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,49,49,0.08),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(1,40,67,0.1),transparent_30%)]" />

      <section
        className="relative min-h-[92vh] border-b border-[#d9e3ec]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.6)), linear-gradient(100deg, rgba(1,40,67,0.84) 0%, rgba(1,40,67,0.76) 38%, rgba(1,40,67,0.56) 68%, rgba(1,40,67,0.34) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.45)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.1),transparent_28%),radial-gradient(circle_at_78%_78%,rgba(255,49,49,0.14),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.6px]" />

        <header
          className={`sticky top-0 z-20 border-b px-4 py-3 backdrop-blur-xl transition-all duration-300 sm:px-8 lg:px-14 ${
            scrolled
              ? 'border-[#cfd9e3] bg-[#fcfdff]/84 shadow-[0_8px_24px_rgba(1,40,67,0.14)]'
              : 'border-[#d8e1ea]/70 bg-[#fcfdff]/76'
          }`}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#012843] text-sm font-black text-white">
                AG
              </div>
              <div>
                <p className="text-sm font-black tracking-[0.22em] text-[#012843]">AGRILINK</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-7 text-sm font-medium text-[#567087] lg:flex">
              <a href="#value" className="relative transition-colors hover:text-[#012843] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#ff3131] after:transition-all hover:after:w-full">{t.nav.value}</a>
              <a href="#how" className="relative transition-colors hover:text-[#012843] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#ff3131] after:transition-all hover:after:w-full">{t.nav.howItWorks}</a>
              <a href="#preview" className="relative transition-colors hover:text-[#012843] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#ff3131] after:transition-all hover:after:w-full">{t.nav.product}</a>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div
                role="tablist"
                aria-label={t.nav.language}
                className="inline-flex rounded-xl border border-[#d0dbe6] bg-white/88 p-1 shadow-[0_6px_16px_rgba(1,40,67,0.08)]"
              >
                {(['en', 'fr', 'ar'] as Lang[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                      language === lang
                        ? 'bg-[#012843] text-white shadow-[0_6px_12px_rgba(1,40,67,0.24)]'
                        : 'text-[#4f697f] hover:bg-[#eef3f8] hover:text-[#012843]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <Link
                href="/register"
                className="inline-flex items-center rounded-xl bg-[#ff3131] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,49,49,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95"
              >
                {t.nav.register}
              </Link>
            </div>
          </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-18 sm:px-10 lg:px-14">
          <div id="value" className={`max-w-3xl ${rtl ? 'text-right' : 'text-left'}`}>
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/90">
              {t.hero.badge}
            </span>

            <h1 className={`mt-6 text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] ${rtl ? 'text-4xl font-extrabold leading-[1.15] sm:text-6xl' : 'text-4xl font-black leading-[1.04] sm:text-6xl'}`}>
              {t.hero.title}
            </h1>

            <p className={`mt-5 max-w-2xl text-white/78 ${rtl ? 'text-base leading-8 sm:text-lg' : 'text-base leading-relaxed sm:text-lg'}`}>
              {t.hero.subtitle}
            </p>

            <div className={`mt-9 flex flex-wrap gap-4 ${rtl ? 'justify-end' : 'justify-start'}`}>
              <Link
                href="/login"
                className="rounded-xl bg-[#ff3131] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_30px_rgba(255,49,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_34px_rgba(255,49,49,0.42)]"
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-white/30 bg-white/[0.13] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.18]"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div id="how" className={`mt-12 grid gap-4 sm:grid-cols-3 ${rtl ? 'text-right' : 'text-left'}`}>
              {t.trust.map((item, index) => {
                const Icon = metricIcons[index] || BadgeCheck;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/18 bg-white/[0.1] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.14]">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/18 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{item.value}</p>
                      <p className="mt-1 text-xs text-white/78">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="preview" className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-14">
        <div className={`mb-8 ${rtl ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl font-black text-[#012843] sm:text-4xl">{t.featuresTitle}</h2>
          <p className="mt-2 max-w-2xl text-[#5f758a]">{t.featuresSubtitle}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {t.features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-[20px] border border-[#d4e0ea] bg-white p-6 shadow-[0_14px_32px_rgba(1,40,67,0.08)] transition duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg font-extrabold text-[#012843]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#637a8f]">{feature.description}</p>
              <button className="mt-5 text-sm font-semibold text-[#ff3131] transition group-hover:translate-x-1">
                {t.demo}
                {' ->'}
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer id="resources" className="bg-[#012843] px-6 py-14 text-white sm:px-10 lg:px-14">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.2fr,1fr]">
          <div>
            <h3 className="text-2xl font-black sm:text-3xl">{t.footerTitle}</h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
              {t.footer}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
                {t.nav.signIn}
              </Link>
              <Link href="/register" className="rounded-xl bg-[#ff3131] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95">
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
    </main>
  );
}
