"use client";

import Image from "next/image";
import { salon } from "@/lib/salon";
import { langs } from "@/lib/content";
import { useI18n } from "@/components/Language";
import { Header } from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { Mark } from "@/components/Mark";

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-num">{index}</span>
      <span className="eyebrow-rule" aria-hidden="true" />
      {label}
    </p>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function Site() {
  const { t, lang, setLang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <>
      <a className="skip" href="#contenu">
        {t.skip}
      </a>
      <Header />
      <main id="contenu">
        {/* HERO */}
        <section className="hero" id="top">
          <div className="hero-media">
            <Image
              src="/photos/facade.jpg"
              alt={t.heroAlt}
              fill
              priority
              sizes="(min-width: 980px) 46vw, 100vw"
              style={{ objectFit: "cover", objectPosition: "center 32%" }}
            />
          </div>
          <div className="hero-copy">
            <p className="hero-kicker">
              <span aria-hidden="true" />
              {t.heroKicker} · Marbella
            </p>
            <h1 className="hero-title">
              <span className="hero-num">N°04</span>
              L’Atelier
            </h1>
            <p className="hero-lead">{t.heroLead}</p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#visite">
                {t.heroPrimary}
                <Arrow />
              </a>
              <a className="link-light" href="#coupes">
                {t.heroSecondary}
              </a>
            </div>
            <dl className="hero-facts">
              {t.facts.map((fact) => (
                <div key={fact.k}>
                  <dt>{fact.k}</dt>
                  <dd>{fact.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <a className="hero-scroll" href="#esprit">
            <span>{t.scroll}</span>
            <i aria-hidden="true" />
          </a>
        </section>

        {/* ESPRdddIT */}
        <section className="section section-paper" id="esprit">
          <Reveal className="wrap intro">
            <Eyebrow index={t.spiritIndex} label={t.spiritLabel} />
            <h2 className="statement">
              {t.spiritTitle} <em>{t.spiritEm}</em>
            </h2>
            <div className="intro-body">
              <p className="prose">{t.spiritBody}</p>
              <Mark className="intro-mark" />
            </div>
          </Reveal>
        </section>

        {/* PRESTATIONS */}
        <section className="section section-stone" id="prestations">
          <Reveal className="wrap">
            <div className="section-head">
              <Eyebrow index={t.servicesIndex} label={t.servicesLabel} />
              <h2>{t.servicesTitle}</h2>
              <p className="note">{t.servicesNote}</p>
            </div>
            <ol className="menu">
              {t.services.map((service, index) => (
                <li className="menu-item" key={service.id}>
                  <span className="menu-num">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a className="menu-cta" href="#visite" aria-label={`${t.book} — ${service.title}`}>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* LE GESTE */}
        <section className="section section-dark" aria-label={t.stepsLabel}>
          <Reveal className="wrap">
            <div className="section-head">
              <Eyebrow index="—" label={t.stepsLabel} />
              <h2>{t.stepsLead}</h2>
            </div>
            <div className="steps">
              {t.steps.map((step) => (
                <article className="step" key={step.n}>
                  <p className="step-num">{step.n}</p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* COUPES */}
        <section className="section section-paper" id="coupes">
          <Reveal className="wrap">
            <div className="section-head">
              <Eyebrow index={t.cutsIndex} label={t.cutsLabel} />
              <h2>{t.cutsTitle}</h2>
            </div>
            <div className="gallery">
              {t.cuts.map((cut, index) => (
                <figure className="shot" key={cut.src}>
                  <div className="frame">
                    <Image
                      src={cut.src}
                      alt={cut.alt}
                      fill
                      sizes="(min-width: 980px) 33vw, (min-width: 640px) 50vw, 100vw"
                      style={{ objectFit: "cover", objectPosition: "center 30%" }}
                    />
                    <span className="shot-num">0{index + 1}</span>
                  </div>
                  <figcaption>
                    <strong>{cut.title}</strong>
                    <span>{cut.text}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        {/* LE LIEU */}
        <section className="section section-stone" id="atelier">
          <Reveal className="wrap room">
            <div className="room-media">
              <div className="frame frame-room">
                <Image
                  src="/photos/comptoir.jpg"
                  alt={t.roomAlt}
                  fill
                  sizes="(min-width: 980px) 40vw, 100vw"
                  style={{ objectFit: "cover", objectPosition: "center 40%" }}
                />
              </div>
              <div className="frame frame-sign">
                <Image
                  src="/photos/enseigne.jpg"
                  alt={t.signAlt}
                  fill
                  sizes="(min-width: 980px) 24vw, 60vw"
                  style={{ objectFit: "cover", objectPosition: "center 30%" }}
                />
              </div>
            </div>
            <div className="room-copy">
              <Eyebrow index={t.roomIndex} label={t.roomLabel} />
              <h2>{t.roomTitle}</h2>
              <p className="prose">{t.roomBody}</p>
              <a className="btn btn-dark" href="#visite">
                {t.roomCta}
                <Arrow />
              </a>
            </div>
          </Reveal>
        </section>

        {/* VISITE */}
        <section className="section section-dark" id="visite">
          <Reveal className="wrap visit">
            <div className="visit-copy">
              <Eyebrow index={t.visitIndex} label={t.visitLabel} />
              <h2>{t.visitTitle}</h2>
              <p className="prose">{t.visitBody}</p>
              <dl className="visit-info">
                <div>
                  <dt>{t.facts[0].k}</dt>
                  <dd>{t.place}</dd>
                </div>
                <div>
                  <dt>{t.facts[2].k}</dt>
                  <dd>{t.byAppointment}</dd>
                </div>
                {salon.phoneDisplay ? (
                  <div>
                    <dt>{t.form.phone}</dt>
                    <dd>
                      <a href={`tel:${salon.phoneTel}`}>{salon.phoneDisplay}</a>
                    </dd>
                  </div>
                ) : null}
              </dl>
              {salon.phoneTel || salon.instagram || salon.mapsUrl ? (
                <div className="visit-links">
                  {salon.phoneTel ? <a href={`tel:${salon.phoneTel}`}>{t.call}</a> : null}
                  {salon.instagram ? (
                    <a href={salon.instagram} target="_blank" rel="noreferrer">
                      {t.instagram}
                    </a>
                  ) : null}
                  {salon.mapsUrl ? (
                    <a href={salon.mapsUrl} target="_blank" rel="noreferrer">
                      {t.map}
                    </a>
                  ) : null}
                </div>
              ) : null}
              <p className="fine">{t.visitFine}</p>
            </div>
            <BookingForm />
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Mark className="footer-mark" />
            <div>
              <p className="footer-name">L’Atelier</p>
              <p>N°04 · {t.footerLine}</p>
            </div>
          </div>
          <div>
            <p className="footer-label">{t.footerNav}</p>
            <ul>
              {t.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-label">{t.footerVisit}</p>
            <ul>
              <li>{t.place}</li>
              <li>{t.byAppointment}</li>
              {salon.instagram ? (
                <li>
                  <a href={salon.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
              ) : null}
              <li>
                <a href="#visite">{t.book} →</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-label">{t.footerLang}</p>
            <div className="langs langs-footer" role="group" aria-label={t.footerLang}>
              {langs.map((item) => (
                <button key={item.id} type="button" aria-pressed={lang === item.id} onClick={() => setLang(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="footer-word" aria-hidden="true">
          L’Atelier
        </p>
        <div className="wrap footer-bottom">
          <p>
            © {year} L’Atelier N°04 · Marbella. {t.rights}
          </p>
          <a href="#top">{t.toTop} ↑</a>
        </div>
      </footer>
    </>
  );
}
