"use client";

import { useState } from "react";

import type { Locale, SiteContent } from "@/lib/site-content";

type ApplyFormProps = {
  locale: Locale;
  content: SiteContent["apply"]["form"];
};

export function ApplyForm({ locale, content }: ApplyFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setStatus("idle");

    const formData = new FormData(form);
    const payload = {
      locale,
      full_name: String(formData.get("full_name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      sex: String(formData.get("sex") ?? ""),
      province: String(formData.get("province") ?? ""),
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorDetail(`HTTP ${response.status}: ${json.error ?? "unknown error"}`);
        throw new Error("Request failed");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      console.error("[apply-form] submit error:", err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {/* Full name */}
      <input
        name="full_name"
        required
        placeholder={content.fullName}
        className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
      />

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        required
        placeholder={content.phone}
        className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
      />

      {/* Sex */}
      <select
        name="sex"
        required
        defaultValue=""
        className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-[color:var(--muted)] outline-none transition focus:border-[color:var(--accent)]"
      >
        <option value="" disabled>
          {content.sex}
        </option>
        <option value="male">{content.sexMale}</option>
        <option value="female">{content.sexFemale}</option>
      </select>

      {/* Province */}
      <input
        name="province"
        required
        placeholder={content.province}
        className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
      />

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[color:var(--accent)] px-6 font-semibold text-white transition hover:bg-[color:var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? content.loading : content.submit}
      </button>

      {status === "success" && (
        <p className="text-sm text-[color:var(--forest)]">{content.success}</p>
      )}
      {status === "error" && (
        <div>
          <p className="text-sm text-[color:var(--accent-strong)]">{content.error}</p>
          {errorDetail && (
            <p className="mt-1 rounded-lg bg-red-50 px-3 py-2 font-mono text-xs text-red-700">
              {errorDetail}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
