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
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80';

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f7fa] lg:grid lg:grid-cols-2">
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
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3131] text-sm font-black text-white">
                AG
              </span>
              <span className="text-lg font-extrabold tracking-wide text-white">Agrilink</span>
            </Link>

            <div className="mt-16 max-w-xl animate-fade-slide">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
                <ShieldCheck className="h-3.5 w-3.5" />
                Enterprise marketplace
              </p>
              <h1 className="mt-5 text-5xl font-extrabold leading-[1.04] text-white xl:text-6xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/78 xl:text-xl">{subtitle}</p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {metrics.map((item) => {
                const Icon = item.icon;
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
              <p className="text-xs uppercase tracking-[0.14em] text-white/65">Procurement pulse</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-white/10 p-2">
                  <p className="text-white/65">Open RFQs</p>
                  <p className="mt-1 text-base font-bold text-white">184</p>
                </div>
                <div className="rounded-lg bg-white/10 p-2">
                  <p className="text-white/65">Transit loads</p>
                  <p className="mt-1 text-base font-bold text-white">62</p>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-[#ff3131] to-[#ff8c8c]" />
              </div>
            </div>
          </div>

          <div className="relative mt-auto rounded-2xl border border-white/24 bg-white/[0.12] p-4 shadow-[0_16px_34px_rgba(1,40,67,0.34)] backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">Client note</p>
            <p className="mt-2 text-sm text-white/80">
              "Agrilink helped us reduce procurement cycle time and improve supplier reliability across regions."
            </p>
            <p className="mt-3 text-xs font-semibold text-white/65">Regional Operations Lead</p>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="separator-glow hidden lg:block" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(255,49,49,0.08),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(1,40,67,0.09),transparent_34%)]" />
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
