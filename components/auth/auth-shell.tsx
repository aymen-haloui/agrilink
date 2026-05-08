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
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f7fa] px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(255,49,49,0.11),transparent_28%),radial-gradient(circle_at_90%_15%,rgba(1,40,67,0.12),transparent_30%),radial-gradient(circle_at_78%_82%,rgba(1,40,67,0.09),transparent_34%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.05fr,0.95fr]">
        <section className="hidden rounded-[20px] border border-[#0d3553]/20 bg-gradient-to-br from-[#012843] to-[#0d3553] p-8 text-white shadow-[0_24px_50px_rgba(1,40,67,0.28)] lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3131] text-sm font-black text-[#fcfdff]">
                AG
              </span>
              <span className="text-lg font-black tracking-wide">Agrilink</span>
            </Link>

            <div className="mt-12 max-w-lg">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
                <ShieldCheck className="h-3.5 w-3.5" />
                Enterprise marketplace
              </p>
              <h1 className="mt-4 text-4xl font-black leading-[1.08]">{title}</h1>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{subtitle}</p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
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

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">Client note</p>
            <p className="mt-2 text-sm text-white/80">
              "Agrilink helped us reduce procurement cycle time and improve supplier reliability across regions."
            </p>
            <p className="mt-3 text-xs font-semibold text-white/65">Regional Operations Lead</p>
          </div>
        </section>

        <section className="flex items-center justify-center rounded-[20px] border border-border/80 bg-card/90 p-4 shadow-[0_18px_44px_rgba(1,40,67,0.13)] sm:p-6 lg:p-8">
          <div className="w-full max-w-lg">
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground">AG</span>
                <span className="font-black">Agrilink</span>
              </Link>
              <Link
                href={mode === 'login' ? '/register' : '/login'}
                className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground"
              >
                {mode === 'login' ? 'Create account' : 'Sign in'}
              </Link>
            </div>

            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
