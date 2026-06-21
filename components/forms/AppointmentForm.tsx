"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CTAButton } from "@/components/ui/CTAButton";
import type { Localized } from "@/config/client.config";
import { cn } from "@/lib/utils";

export interface AppointmentFormValues {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

interface AppointmentFormProps {
  /** Selectable services (localized labels). */
  services?: { value: string; label: Localized }[];
  /**
   * Submit handler. Defaults to a no-op that resolves after a tick so the form
   * works out of the box; wire this to an API route / CMS / email service.
   */
  onSubmit?: (values: AppointmentFormValues) => Promise<void>;
  className?: string;
}

const empty: AppointmentFormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function AppointmentForm({
  services = [],
  onSubmit,
  className,
}: AppointmentFormProps) {
  const { dict, t, locale } = useLanguage();
  const b = dict.booking;
  const [values, setValues] = useState<AppointmentFormValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormValues, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof AppointmentFormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = b.required;
    if (!values.phone.trim()) next.phone = b.required;
    else if (!/^[+\d][\d\s-]{6,}$/.test(values.phone)) next.phone = b.invalidPhone;
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = b.invalidEmail;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      if (onSubmit) await onSubmit(values);
      else await new Promise((r) => setTimeout(r, 600)); // placeholder
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-brand border border-neutral/25 bg-background px-3.5 py-2.5 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-brand border border-primary/30 bg-primary/5 p-8 text-center",
          className,
        )}
      >
        <p className="font-heading text-lg font-semibold text-primary">
          {b.success}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("grid gap-4", className)}
    >
      {/* Honeypot — bots fill it, humans don't. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={b.name} error={errors.name} required>
          <input
            className={inputCls}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label={b.phone} error={errors.phone} required>
          <input
            className={inputCls}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
          />
        </Field>
      </div>

      <Field label={b.email} error={errors.email}>
        <input
          className={inputCls}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          inputMode="email"
          autoComplete="email"
          dir="ltr"
        />
      </Field>

      {services.length > 0 && (
        <Field label={b.service}>
          <select
            className={inputCls}
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">{b.selectService}</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {t(s.label)}
              </option>
            ))}
          </select>
        </Field>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={b.date}>
          <input
            type="date"
            className={inputCls}
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </Field>
        <Field label={b.time}>
          <input
            type="time"
            className={inputCls}
            value={values.time}
            onChange={(e) => update("time", e.target.value)}
          />
        </Field>
      </div>

      <Field label={b.message}>
        <textarea
          className={cn(inputCls, "min-h-24 resize-y")}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {b.error}
        </p>
      )}

      <CTAButton
        type="submit"
        variant="accent"
        size="lg"
        fullWidth
        disabled={status === "submitting"}
      >
        {status === "submitting" ? b.submitting : b.submit}
      </CTAButton>

      <p className="text-center text-xs text-neutral" dir={locale === "ar" ? "rtl" : "ltr"}>
        {b.subtitle}
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
