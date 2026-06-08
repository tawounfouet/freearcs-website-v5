import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="not-found-page">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/img/background-2.jpg)' }}
        />
        <div className="absolute inset-0 bg-[#2B2B2B]/60" />

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="pt-24 pb-20 lg:pt-32 lg:pb-24">
            <div className="w-full lg:w-8/12">
              <div className="overflow-hidden">
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-0 leading-none">
                  404
                </h1>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2">
                  <div className="flex items-center gap-2 text-white/80 font-bold text-lg">
                    <Link to="/" className="text-white hover:text-white/80 transition-colors">{t('nav.home')}</Link>
                    <span className="text-white/60">/</span>
                    <span className="text-white">404</span>
                  </div>
                  <span className="hidden sm:inline-block text-white/40">|</span>
                  <span className="text-[#2E9013] text-lg font-medium italic">
                    {t('404.title')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-24 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="font-raleway text-8xl font-bold text-[#573D4E]">404</h1>
          <h2 className="font-raleway text-2xl font-semibold text-[#2B2B2B]">{t('404.title')}</h2>
          <p className="text-[#4B5563] max-w-md">{t('404.description')}</p>
          <Button asChild className="bg-[#2E9013] hover:bg-[#1a5a0b] text-white">
            <Link to="/">{t('404.backHome')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
