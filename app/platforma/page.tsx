import { PlatformShell } from "@/components/PlatformShell";
import { PlatformHeader } from "@/components/PlatformHeader";
import { OfferCard } from "@/components/OfferCard";

export default function PlatformaPage() {
  return (
    <PlatformShell title="Care profile">
      <div className="flex flex-col gap-6">
        <PlatformHeader />
        <OfferCard />
      </div>
    </PlatformShell>
  );
}
