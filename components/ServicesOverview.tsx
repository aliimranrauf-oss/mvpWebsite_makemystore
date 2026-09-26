import Link from 'next/link'
import { Globe, Zap, Rocket, Briefcase, ArrowRight, Sparkles, Store } from 'lucide-react'

// ── Server component (no interactivity needed — hover is pure CSS) ────────
// Surfaces all services on the homepage.

const services = [
  {
    icon: Globe,
    title: 'Custom Website Development',
    description: 'Portfolio, business, blog, ecommerce, SaaS, or fully custom — one-time build fee, no subscription.',
    href: '/contact',
    cta: 'Get Started',
    featured: true,
    badge: 'Start Here',
  },
  {
    icon: Store,
    title: 'POS & Shop Management System',
    description: 'Inventory, invoicing, customers, suppliers & an AI assistant — custom-built for any business.',
    href: '/pos-system',
    cta: 'Explore',
  },
  {
    icon: Zap,
    title: 'Website Speed Optimization',
    description: 'Slow site losing customers? Get a free speed audit + fixes.',
    href: '/website-speed-optimization',
    cta: 'Free Speed Audit',
  },
  {
    icon: Rocket,
    title: 'Space & Aerospace Websites',
    description: 'Specialized websites for space-tech, satellite, and aerospace companies.',
    href: '/space',
    cta: 'Explore',
  },
  {
    icon: Briefcase,
    title: 'Career Portfolio Websites',
    description: 'A personal portfolio site, ATS-optimized CV, and LinkedIn rewrite to help job seekers get noticed by recruiters.',
    href: '/careers',
    cta: 'Boost My Career',
  },
]

export default function ServicesOverview() {
  return (
    <section id="services" className="py-24 px-4 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#00d4ff] uppercase tracking-widest mb-3 block">
            Our Services
          </span>
          <h2
            className="text-4xl sm:text-[42px] font-bold leading-[1.2] max-w-2xl mx-auto text-white"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
          >
            What We <span className="text-[#40e0ff]">Build</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Five specialized services, one build-quality standard — pick the one that fits.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, description, href, cta, featured, badge }) => (
            <Link
              key={href}
              href={href}
              className="group glass card-glow relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                border: featured ? '2px solid rgba(0,212,255,0.5)' : '1px solid rgba(0,212,255,0.15)',
              }}
            >
              {featured && badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan text-[#0b0f1a] text-[10px] sm:text-xs font-extrabold tracking-wider whitespace-nowrap z-10 font-display shadow-[0_2px_12px_rgba(0,212,255,0.5)]">
                  <Sparkles size={11} aria-hidden /> {badge}
                </div>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'var(--gradient)' }}
              >
                <Icon size={22} className="text-[#0b0f1a]" strokeWidth={2.5} />
              </div>

              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                {description}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00d4ff] group-hover:gap-2.5 transition-all">
                {cta}
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
