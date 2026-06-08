import type { ComponentType, SVGProps } from "react";
import { Heart, Shield } from "./icons";

type Item = { icon: ComponentType<SVGProps<SVGSVGElement>>; text: string };

const DEFAULT: Item[] = [
  { icon: Heart, text: "19 years of experience" },
  { icon: Shield, text: "vetted caregivers" },
];

export function TrustBand({ items = DEFAULT }: { items?: Item[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <li key={i} className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4 text-accent-600" />
            {it.text}
          </li>
        );
      })}
    </ul>
  );
}
