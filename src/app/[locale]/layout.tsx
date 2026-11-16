import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { isLocale, siteContent } from "@/lib/site-content";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = siteContent[locale];

  return (
    <>
      <Header locale={locale} content={content} />
      <main className="flex-1">{children}</main>
      <Footer content={content} />
    </>
  );
}
