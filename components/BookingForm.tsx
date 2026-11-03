"use client";

import { FormEvent, useState } from "react";
import { salon } from "@/lib/salon";
import { useI18n } from "@/components/Language";

type Status = "idle" | "sending" | "ok" | "error";

export function BookingForm() {
  const { t, lang } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<"" | "invalid" | "send">("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const digits = phone.replace(/\D/g, "");

    if (name.length < 2 || digits.length < 8) {
      setStatus("error");
      setError("invalid");
      return;
    }

    const payload = {
      name,
      phone,
      service: String(data.get("service") || ""),
      when: String(data.get("when") || ""),
      note: String(data.get("note") || ""),
      company: String(data.get("company") || ""),
      lang,
    };

    setStatus("sending");
    setError("");

    const text = [
      "L'Atelier N°04",
      payload.name,
      payload.phone,
      payload.service,
      payload.when,
      payload.note,
    ]
      .filter(Boolean)
      .join("\n");

    if (salon.whatsapp) {
      window.open(`https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setStatus("ok");
      form.reset();
      return;
    }

    if (salon.email) {
      const subject = encodeURIComponent(`Rendez-vous — ${payload.name}`);
      window.location.href = `mailto:${salon.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
      setStatus("ok");
      form.reset();
      return;
    }

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError("send");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-success" role="status">
        <span className="success-mark" aria-hidden="true">✓</span>
        <h3>{t.form.successTitle}</h3>
        <p>{t.form.successText}</p>
        <button className="link-light" type="button" onClick={() => setStatus("idle")}>
          {t.form.again}
        </button>
      </div>
    );
  }

  return (
    <form key={lang} className="booking" method="post" action="/api/reservation" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <label className="field">
          <span>{t.form.name}</span>
          <input name="name" autoComplete="name" placeholder={t.form.namePh} required />
        </label>
        <label className="field">
          <span>{t.form.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder={t.form.phonePh} required />
        </label>
        <label className="field">
          <span>{t.form.service}</span>
          <select name="service" defaultValue={t.services[0].title}>
            {t.services.map((service) => (
              <option key={service.id}>{service.title}</option>
            ))}
            <option>{t.unsure}</option>
          </select>
        </label>
        <label className="field">
          <span>{t.form.when}</span>
          <input name="when" placeholder={t.form.whenPh} />
        </label>
        <label className="field wide">
          <span>{t.form.note}</span>
          <textarea name="note" rows={3} placeholder={t.form.notePh} />
        </label>
      </div>
      <input className="hp" tabIndex={-1} autoComplete="off" name="company" aria-hidden="true" />
      <input type="hidden" name="lang" value={lang} />
      {error ? (
        <p className="form-error" role="alert">
          {error === "invalid" ? t.form.invalid : t.form.error}
        </p>
      ) : null}
      <button className="btn btn-light btn-block" type="submit" disabled={status === "sending"}>
        {status === "sending" ? t.form.sending : t.form.submit}
      </button>
    </form>
  );
}
