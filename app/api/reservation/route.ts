import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Reservation = {
  name: string;
  phone: string;
  service: string;
  when: string;
  note: string;
  lang: string;
  createdAt: string;
};

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

async function readPayload(req: Request) {
  const type = req.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    return (await req.json()) as Record<string, unknown>;
  }
  const form = await req.formData();
  return Object.fromEntries(form.entries()) as Record<string, unknown>;
}

export async function POST(req: Request) {
  const body = await readPayload(req);
  if (clean(body.company, 80)) {
    return NextResponse.json({ ok: true });
  }

  const reservation: Reservation = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 40),
    service: clean(body.service, 80),
    when: clean(body.when, 80),
    note: clean(body.note, 500),
    lang: clean(body.lang, 5),
    createdAt: new Date().toISOString(),
  };

  const digits = reservation.phone.replace(/\D/g, "");
  if (reservation.name.length < 2 || digits.length < 8) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "reservations.json");
  await mkdir(dir, { recursive: true });

  let current: Reservation[] = [];
  try {
    current = JSON.parse(await readFile(file, "utf8")) as Reservation[];
    if (!Array.isArray(current)) current = [];
  } catch {
    current = [];
  }

  current.push(reservation);
  await writeFile(file, JSON.stringify(current, null, 2));

  const accept = req.headers.get("accept") || "";
  if (accept.includes("text/html")) {
    const html = `<!doctype html><meta charset="utf-8"><title>L’Atelier</title><body style="font-family:Georgia,serif;background:#f3f0ea;color:#161513;display:grid;min-height:100vh;place-items:center"><main><p>N°04</p><h1>C’est noté.</h1><p><a href="/">Retour</a></p></main></body>`;
    return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  }

  return NextResponse.json({ ok: true });
}
