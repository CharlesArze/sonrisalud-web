import type { TeamMember } from "@/content/team";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function DoctorCard({ member, delay = 0 }: { member: TeamMember; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <TiltCard className="overflow-hidden border border-line bg-surface">
        <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-primary-soft via-surface to-primary-soft">
          <span className="font-display text-5xl font-medium text-primary/50">
            {member.initials}
          </span>
        </div>
        <div className="p-5 text-center">
          <h3 className="font-display text-lg font-medium text-foreground">{member.name}</h3>
          <p className="mt-1 text-sm text-foreground-muted">{member.role}</p>
        </div>
      </TiltCard>
    </Reveal>
  );
}
