"use client";

import { getWeekHours, getOpenStatus, formatTime } from "@/lib/hours";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ClockIcon } from "./icons";
import { cn } from "@/lib/utils";

interface OpeningHoursProps {
  className?: string;
  /** Show the live "Open now / Closed" status pill. */
  showStatus?: boolean;
  title?: string;
}

/**
 * Weekly opening hours table from client.config.ts contact.openingHours.
 * Day labels are localized; today's row is highlighted and a live open/closed
 * status is computed from the visitor's clock.
 */
export function OpeningHours({
  className,
  showStatus = true,
  title,
}: OpeningHoursProps) {
  const { dict, t } = useLanguage();
  const week = getWeekHours();
  const { isOpen, today } = getOpenStatus();

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
          <ClockIcon width={18} height={18} className="text-primary" />
          {title ?? dict.hours.title}
        </h3>
        {showStatus && (
          <span
            className={cn(
              "rounded-brand px-2.5 py-1 text-xs font-semibold",
              isOpen ? "bg-primary/10 text-primary" : "bg-neutral/10 text-neutral",
            )}
          >
            {isOpen ? dict.common.openNow : dict.common.closedNow}
          </span>
        )}
      </div>

      <ul className="divide-y divide-neutral/10">
        {week.map((row) => {
          const isToday = today?.day === row.day;
          const closed = !row.open || !row.close;
          return (
            <li
              key={row.day}
              className={cn(
                "flex items-center justify-between py-2.5 text-sm",
                isToday && "font-semibold text-primary",
              )}
            >
              <span>
                {t(row.label)}
                {isToday && (
                  <span className="ms-2 text-xs text-accent">
                    ({dict.common.today})
                  </span>
                )}
              </span>
              <span className={cn(closed && "text-neutral")}>
                {closed
                  ? dict.common.closed
                  : `${formatTime(row.open)} – ${formatTime(row.close)}`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
