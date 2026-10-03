import { CONTACT_EMAIL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:justify-between sm:px-8">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <rect width="30" height="30" rx="8" fill="#2E9E48" />
            <path
              d="M8 21V9l7 6 7-6v12"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-ink">makemystore.online</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="/#services" className="hover:text-ink">Services</a>
          <a href="/pos-system" className="hover:text-ink">POS Systems</a>
          <a href="/#pricing" className="hover:text-ink">Pricing</a>
          <a href="/#faq" className="hover:text-ink">FAQ</a>
          <a href="/about" className="hover:text-ink">About</a>
          <a href="/contact" className="hover:text-ink">Contact</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
            {CONTACT_EMAIL}
          </a>
        </nav>
        <p>© {new Date().getFullYear()} makemystore.online</p>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-content flex-col items-center gap-2 px-5 py-4 text-xs text-muted sm:flex-row sm:justify-center sm:gap-6 sm:px-8">
          <a href="/privacy" className="hover:text-ink">Privacy Policy</a>
          <a href="/terms" className="hover:text-ink">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
