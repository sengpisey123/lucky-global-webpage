import type { SiteContent } from "@/lib/site-content";

type FooterProps = {
  content: SiteContent;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-[color:var(--forest)] text-white">
      {/* Contact CTA band */}
      <div className="border-b border-white/10 px-4 py-12 text-center sm:px-6 lg:px-8">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[color:var(--accent-strong)]"
        >
          {content.footerCta}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-white/50 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <span className="font-semibold text-white/80">Lucky Global</span>
        <span>{content.footerCopyright}</span>
      </div>
    </footer>
  );
}
