"use client";

import { useState } from "react";

import type { Locale, SiteContent } from "@/lib/site-content";

type ContactFormProps = {
  locale: Locale;
  content: SiteContent["contact"]["form"];
};

export function ContactForm({ locale, content }: ContactFormProps) {
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
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      console.error("[contact-form] submit error:", err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder={content.name}
          className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
        />
        <input
          name="company"
          placeholder={content.company}
          className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
        />
      </div>
      <input
        type="email"
        name="email"
        required
        placeholder={content.email}
        className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={content.message}
        className="rounded-3xl border border-[color:var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[color:var(--accent)]"
      />
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[color:var(--forest)] px-6 font-semibold text-white transition hover:bg-[color:var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? content.loading : content.submit}
      </button>
      {status === "success" ? (
        <p className="text-sm text-[color:var(--forest)]">{content.success}</p>
      ) : null}
      {status === "error" ? (
        <div>
          <p className="text-sm text-[color:var(--accent-strong)]">{content.error}</p>
          {errorDetail && (
            <p className="mt-1 rounded-lg bg-red-50 px-3 py-2 font-mono text-xs text-red-700">
              {errorDetail}
            </p>
          )}
        </div>
      ) : null}
    </form>
  );
}