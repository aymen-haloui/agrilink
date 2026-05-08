import Link from 'next/link';
import { BadgeCheck, Globe2, ShieldCheck, Truck } from 'lucide-react';

interface AuthShellProps {
  title: string;
  subtitle: string;
  mode: 'login' | 'register';
  children: React.ReactNode;
}

const metrics = [
  { label: 'Verified suppliers', value: '2,840+', icon: BadgeCheck },
  { label: 'Live monthly orders', value: '18.7K', icon: Globe2 },
  { label: 'Coverage areas', value: '58 wilayas', icon: Truck },
];

export default function AuthShell({ title, subtitle, mode, children }: AuthShellProps) {
  const imageUrl =
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="min-h-screen bg-[#f5f7fa] lg:grid lg:grid-cols-2">
      <section
        className="relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12"
        style={{
          backgroundImage: `linear-gradient(170deg, rgba(1,40,67,0.8), rgba(1,40,67,0.62)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(255,49,49,0.2),transparent_40%)]" />
        <div className="relative">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3131] text-sm font-black text-white">
                AG
              </span>
              <span className="text-lg font-black tracking-wide">Agrilink</span>
            </Link>

            <div className="mt-16 max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
                <ShieldCheck className="h-3.5 w-3.5" />
                Enterprise marketplace
              </p>
              <h1 className="mt-4 text-6xl font-black leading-[1.06]">{title}</h1>
              <p className="mt-6 text-2xl leading-relaxed text-white/75">{subtitle}</p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {metrics.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-white/20 bg-white/10 p-4">
                    <Icon className="h-4 w-4 text-[#ff8f8f]" />
                    <p className="mt-2 text-xl font-black">{item.value}</p>
                    <p className="text-xs text-white/70">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mt-auto rounded-2xl border border-white/20 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">Client note</p>
            <p className="mt-2 text-sm text-white/80">
              "Agrilink helped us reduce procurement cycle time and improve supplier reliability across regions."
            </p>
            <p className="mt-3 text-xs font-semibold text-white/65">Regional Operations Lead</p>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-xl">
          <div className="mb-7 flex items-center justify-between lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#012843] text-sm font-black text-white">AG</span>
              <span className="font-black text-[#012843]">Agrilink</span>
            </Link>
            <Link
              href={mode === 'login' ? '/register' : '/login'}
              className="rounded-xl border border-[#d1dbe6] px-3 py-2 text-xs font-semibold text-[#012843]"
            >
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </Link>
          </div>

          {children}
        </div>
      </section>
    </div>
  );
}
