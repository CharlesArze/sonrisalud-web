import Image from "next/image";
import type { TeamMember } from "@/content/team";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function DoctorCard({ member, delay = 0 }: { member: TeamMember; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <TiltCard className="relative overflow-hidden border border-line">
        <div className="relative aspect-square w-full overflow-hidden bg-primary-soft">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover object-top"
          />
        </div>
        {/* Título flotante en vidrio esmerilado sobre la foto: mismo
            material que la píldora del header (backdrop-filter
            blur+saturate), más un velo oscuro apenas perceptible para
            que el nombre se lea igual sobre batas blancas u oscuras. */}
        <div
          className="absolute inset-x-0 bottom-0 bg-black/25 px-4 py-3 text-center"
          style={{
            backdropFilter: "saturate(1.8) blur(16px)",
            WebkitBackdropFilter: "saturate(1.8) blur(16px)",
          }}
        >
          <h3 className="font-display text-base font-medium text-white">{member.name}</h3>
          <p className="mt-0.5 text-xs text-white/80">{member.role}</p>
        </div>
      </TiltCard>
    </Reveal>
  );
}
