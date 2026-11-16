import { notFound } from "next/navigation";

import Image from "next/image";

import { ApplyForm } from "@/components/apply-form";
import { ContactForm } from "@/components/contact-form";
import { isLocale, locales, siteContent } from "@/lib/site-content";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const missionImages = ["/img1.png", "/img2.png", "/img3.png"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = siteContent[locale];

  return (
    <>
      {/* â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        id="home"
        className="relative flex min-h-120 items-end overflow-hidden bg-(--forest) lg:min-h-144"
      >
        <div className="absolute inset-0">
          <Image
            src="/img-main.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-(--forest) via-(--forest)/60 to-transparent" />

        {/* Text content */}
        <div className="relative z-10 w-full px-4 pb-14 pt-20 text-center text-white sm:px-6 lg:px-8 lg:pb-20">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {content.hero.title}
          </h1>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-(--accent-strong)"
            >
              {content.hero.contactCta}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ BUSINESS INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-(--forest)">{content.intro.title}</h2>
          <p className="mt-5 text-lg font-medium leading-8 text-(--accent-strong)">
            {content.intro.tagline}
          </p>
          <p className="mt-4 text-base leading-8 text-(--muted)">{content.intro.body}</p>
        </div>
      </section>

      {/* â”€â”€â”€ MISSION / ç†å¿µ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="mission" className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-(--forest)">{content.mission.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-(--muted)">
              {content.mission.body}
            </p>
          </div>

          {/* 3 photo placeholders */}
          <div className="grid gap-5 sm:grid-cols-3">
            {content.mission.photos.map((photo, i) => (
              <figure key={i} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative h-52 lg:h-64">
                  <Image
                    src={missionImages[i]}
                    alt={photo.caption}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-4 text-sm leading-6 text-(--muted)">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ STRENGTHS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="strengths" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-(--forest)">
            {content.strengths.title}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {content.strengths.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-(--border) bg-background p-6"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--forest) text-white text-lg font-bold">
                  {content.strengths.items.indexOf(item) + 1}
                </div>
                <h3 className="text-base font-bold text-(--forest)">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-(--muted)">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ PROGRAM / æ•™è‚²å†…å®¹ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="program" className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-(--forest)">{content.program.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-(--muted)">
              {content.program.lead}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {content.program.items.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <span className="text-3xl font-black leading-none text-(--accent) opacity-30">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-base font-bold text-(--forest)">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-(--muted)">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ COMPANY PROFILE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-(--forest)">
            {content.profile.title}
          </h2>
          <dl className="divide-y divide-(--border) overflow-hidden rounded-2xl border border-(--border)">
            {content.profile.items.map((item) => (
              <div key={item.label} className="grid grid-cols-[160px_1fr] gap-4 bg-white px-6 py-4 sm:grid-cols-[200px_1fr]">
                <dt className="text-sm font-semibold text-(--forest)">{item.label}</dt>
                <dd className="text-sm leading-7 text-(--muted)">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* LUCKY GROUP */}
      <section id="group" className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-center text-3xl font-bold text-(--forest)">
            {content.group.title}
          </h2>
          <p className="mb-8 text-center text-base leading-8 text-(--muted)">
            {content.group.lead}
          </p>
          <dl className="divide-y divide-(--border) overflow-hidden rounded-2xl border border-(--border)">
            {content.group.items.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[160px_1fr] gap-4 bg-white px-6 py-4 sm:grid-cols-[200px_1fr]"
              >
                <dt className="text-sm font-semibold text-(--forest)">{item.label}</dt>
                <dd className="text-sm leading-7 text-(--muted)">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CAMBODIA */}
      <section id="cambodia" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-3xl font-bold text-(--forest)">
            {content.cambodia.title}
          </h2>
          <p className="mb-10 text-center text-base leading-8 text-(--muted)">
            {content.cambodia.lead}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.cambodia.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-(--border) bg-background px-5 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--accent-strong)">
                  {fact.label}
                </p>
                <p className="mt-1.5 text-sm font-medium leading-6 text-(--forest)">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-(--muted)">
            {content.cambodia.note}
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            {/* Left: info */}
            <div>
              <h2 className="text-3xl font-bold text-(--forest)">{content.contact.title}</h2>
              <p className="mt-4 leading-8 text-(--muted)">{content.contact.lead}</p>
              <p className="mt-4 text-sm leading-7 text-(--muted)">{content.contact.note}</p>
              <ul className="mt-6 space-y-2 text-sm text-(--muted)">
                {content.contact.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl border border-(--border) bg-white p-6 shadow-sm sm:p-8">
              <ContactForm locale={locale} content={content.contact.form} />
            </div>
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            {/* Left: info */}
            <div>
              <h2 className="text-3xl font-bold text-(--forest)">{content.apply.title}</h2>
              <p className="mt-4 leading-8 text-(--muted)">{content.apply.lead}</p>
              <div className="mt-8 grid gap-3">
                {[
                  content.apply.form.fullName,
                  content.apply.form.phone,
                  content.apply.form.sex,
                  content.apply.form.province,
                ].map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-(--accent)" />
                    <span className="text-sm text-(--muted)">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: form */}
            <div className="rounded-2xl border border-(--border) bg-background p-6 shadow-sm sm:p-8">
              <ApplyForm locale={locale} content={content.apply.form} />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
