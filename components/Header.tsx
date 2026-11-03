"use client";

import { useEffect, useState } from "react";
import { langs } from "@/lib/content";
import { useI18n } from "@/components/Language";
import { Mark } from "@/components/Mark";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled || open ? " is-solid" : ""}`}>
      <a className="brand" href="#top" onClick={close}>
        <Mark className="brand-mark" />
        <span className="brand-type">
          <small>N°04</small>
          <strong>L’Atelier</strong>
        </span>
      </a>

      <nav className="desk-nav" aria-label="Sections">
        {t.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-end">
        <div className="langs" role="group" aria-label="Language">
          {langs.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={lang === item.id}
              onClick={() => setLang(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <a className="btn btn-small btn-outline desk-book" href="#visite">
          {t.book}
        </a>
        <button
          className={`burger${open ? " is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close" : "Menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      {open ? (
        <div className="mobile-nav">
          <div className="langs langs-large" role="group" aria-label="Language">
            {langs.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={lang === item.id}
                onClick={() => setLang(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          {t.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
          <a className="btn btn-light" href="#visite" onClick={close}>
            {t.book}
          </a>
        </div>
      ) : null}
    </header>
  );
}
