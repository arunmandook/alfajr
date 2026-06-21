"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import type { Localized } from "@/config/client.config";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: Localized;
  role: Localized;
  /** Photo path under /public or a remote (CMS) URL. */
  photo?: string;
  bio?: Localized;
  /** e.g. ["Sports rehab", "Manual therapy"] — localized strings. */
  specialties?: Localized[];
}

interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
}

/** Staff/clinician profile card. All copy localized via the language context. */
export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  const { t } = useLanguage();

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-brand border border-neutral/15 bg-background text-center",
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full bg-neutral/10">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={t(member.name)}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-neutral/40">
            {t(member.name).charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {t(member.name)}
        </h3>
        <p className="text-sm font-medium text-primary">{t(member.role)}</p>
        {member.bio && (
          <p className="mt-3 text-sm text-neutral">{t(member.bio)}</p>
        )}
        {member.specialties && member.specialties.length > 0 && (
          <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
            {member.specialties.map((s, i) => (
              <li
                key={i}
                className="rounded-brand bg-primary/10 px-2 py-0.5 text-xs text-primary"
              >
                {t(s)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
