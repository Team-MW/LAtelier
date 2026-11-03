"use client";

import { useEffect, useState } from "react";
import { langs } from "@/lib/content";
import { useI18n } from "@/components/Language";
import { Mark } from "@/components/Mark";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Fond plein dès qu'on quitte le haut de page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section en cours -> lien actif
  useEffect(() => {
    const ids = t.nav.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [t.nav]);

  // Menu mobile : bloque le scroll, ferme avec Échap ou en passant en desktop
  useEffect(() => {
    document.documentElement.classList.toggle("nav-open", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const media = window.matchMedia("(min-width: 1080px)");
    const onMedia = () => media.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    return () => {
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
      document.documentElement.classList.remove("nav-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? " is-solid" : ""}${open ? " is-open" : ""}`}>
        <a className="brand" href="#top" onClick={close} aria-label="L’Atelier N°04 — accueil">
          <Mark className="brand-mark" />
          <span className="brand-type">
            <small>N°04</small>
            <strong>L’Atelier</strong>
          </span>
        </a>

        <nav className="desk-nav" aria-label="Sections">
          {t.nav.map((item) => (
            <a key={item.href} href={item.href} aria-current={active === item.href ? "true" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-end">
          <div className="langs desk-langs" role="group" aria-label="Language">
            {langs.map((item) => (
              <button key={item.id} type="button" aria-pressed={lang === item.id} onClick={() => setLang(item.id)}>
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
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav className="mobile-links" aria-label="Menu">
          {t.nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={close} style={{ animationDelay: `${0.05 + index * 0.04}s` }}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-foot">
          <a className="btn btn-light btn-block" href="#visite" onClick={close}>
            {t.book}
          </a>
          <div className="langs langs-large" role="group" aria-label="Language">
            {langs.map((item) => (
              <button key={item.id} type="button" aria-pressed={lang === item.id} onClick={() => setLang(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
