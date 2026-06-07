import { PRZYKLAD } from "@/lib/dane-przykladowe";

function maskKontakt(k: string) {
  if (k.includes("@")) {
    const [local, domain] = k.split("@");
    return `${local.slice(0, 2)}•••@${domain}`;
  }
  const digits = k.replace(/\s+/g, "");
  return `${digits.slice(0, 3)}•••${digits.slice(-2)}`;
}

export function PlatformHeader() {
  const p = PRZYKLAD;
  return (
    <div>
      <p className="text-sm text-ink-faint">Panel rodziny</p>
      <h1 className="mt-0.5 text-2xl font-semibold tracking-tight text-ink">
        Witaj, {p.imie}
      </h1>
      <p className="mt-1 text-sm text-ink-faint">
        {p.kanal === "email" ? "E-mail" : "Telefon"}: {maskKontakt(p.kontakt)}
      </p>
    </div>
  );
}
