"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

type NavChild = { href: string; label: string };
type NavItem = { href?: string; label: string; children?: NavChild[] };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDesktopDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = NAV_LINKS as NavItem[];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
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
          <span className="font-display text-lg font-semibold text-ink">
            makemystore<span className="text-muted">.online</span>
          </span>
        </a>

        <nav ref={navRef} className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setDesktopDropdown((v) => (v === link.label ? null : link.label))
                  }
                  aria-expanded={desktopDropdown === link.label}
                  className="flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      desktopDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {desktopDropdown === link.label && (
                  <div className="absolute left-0 top-full mt-2 w-52 rounded-lg border border-border bg-surface py-2 shadow-lg">
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={() => setDesktopDropdown(null)}
                        className="block px-4 py-2 text-sm text-muted transition-colors hover:bg-surface2 hover:text-ink"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <a
          href="/contact"
          className="hidden rounded-lg bg-mint px-4 py-2 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] md:inline-block"
        >
          Start a project
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-lg border border-border p-2 text-ink md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-bg px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) =>
              link.children ? (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileDropdown((v) => (v === link.label ? null : link.label))
                    }
                    aria-expanded={mobileDropdown === link.label}
                    className="flex w-full items-center justify-between rounded-md px-2 py-3 text-base text-muted hover:bg-surface hover:text-ink"
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        mobileDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileDropdown === link.label && (
                    <ul className="ml-2 flex flex-col gap-1 border-l border-border pl-3">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            onClick={() => {
                              setOpen(false);
                              setMobileDropdown(null);
                            }}
                            className="block rounded-md px-2 py-2.5 text-sm text-muted hover:bg-surface hover:text-ink"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 text-base text-muted hover:bg-surface hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
            <li className="pt-2">
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-mint px-4 py-3 text-center text-sm font-semibold text-bg"
              >
                Start a project
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
