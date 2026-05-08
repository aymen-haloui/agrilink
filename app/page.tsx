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
  const heroImage =
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=80';

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f5f7fa] text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,49,49,0.08),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(1,40,67,0.1),transparent_30%)]" />

      <section
        className="relative min-h-[92vh] border-b border-[#d9e3ec]"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(1,40,67,0.84) 0%, rgba(1,40,67,0.72) 40%, rgba(1,40,67,0.45) 66%, rgba(1,40,67,0.24) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <header className="sticky top-0 z-20 border-b border-[#d8e1ea] bg-[#fcfdff]/90 px-4 py-3 backdrop-blur-xl sm:px-8 lg:px-14">
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
              <a href="#value" className="transition-colors hover:text-[#012843]">{t.nav.value}</a>
              <a href="#how" className="transition-colors hover:text-[#012843]">{t.nav.howItWorks}</a>
              <a href="#preview" className="transition-colors hover:text-[#012843]">{t.nav.product}</a>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <select
                id="language-selector"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Lang)}
                className="rounded-xl border border-[#d2dce6] bg-white px-2 py-2 text-sm font-medium text-[#012843] outline-none focus:ring-2 focus:ring-[#012843]/20"
                aria-label={t.nav.language}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="ar">AR</option>
              </select>
              <Link
                href="/register"
                className="inline-flex items-center rounded-xl bg-[#ff3131] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(255,49,49,0.32)] transition hover:brightness-95"
              >
                {t.nav.register}
              </Link>
            </div>
          </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-16 sm:px-10 lg:px-14">
          <div id="value" className={`max-w-3xl ${rtl ? 'text-right' : 'text-left'}`}>
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/90">
              {t.hero.badge}
            </span>

            <h1 className="mt-5 text-4xl font-black leading-[1.05] text-white sm:text-6xl">
              {t.hero.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t.hero.subtitle}
            </p>

            <div className={`mt-8 flex flex-wrap gap-4 ${rtl ? 'justify-end' : 'justify-start'}`}>
              <Link
                href="/login"
                className="rounded-xl bg-[#ff3131] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(255,49,49,0.35)] transition hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            <div id="how" className={`mt-10 grid gap-3 sm:grid-cols-3 ${rtl ? 'text-right' : 'text-left'}`}>
              {t.trust.map((item, index) => {
                const Icon = metricIcons[index] || BadgeCheck;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/20 bg-white/12 p-4 backdrop-blur-sm">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">{item.value}</p>
                      <p className="text-xs text-white/75">{item.label}</p>
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
