import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '@/components/SEO';
import FloatingCTA from '../components/FloatingCTA';

const WhyChooseUsPage = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="why-choose-us-page">
      <SEO
        title={t('whyChooseUs.metaTitle')}
        description={t('whyChooseUs.metaDescription')}
        url="/why-choose-us"
      />

      {/* ── 1. Hero ────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/img/background-2.jpg)' }}
        />
        <div className="absolute inset-0 bg-[#2B2B2B]/60" />

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="pt-24 pb-20 lg:pt-32 lg:pb-24">
            <div className="w-full text-center">
              <div className="overflow-hidden">
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-0 leading-none">
                  {t('whyChooseUs.heroTitle')}
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                  <Link to="/" className="text-white hover:text-white/80 transition-colors">{t('nav.home')}</Link>
                  <span className="text-white/60">/</span>
                  <span className="text-white">{t('nav.whyChooseUs')}</span>
                </div>
                <p className="text-white/90 text-lg mt-6 max-w-2xl mx-auto">
                  {t('whyChooseUs.heroSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Le contexte ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('whyChooseUs.contextTitle')}</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-[#4B5563] text-lg leading-relaxed text-justify first-letter:text-5xl first-letter:font-bold first-letter:text-[#2E9013] first-letter:mr-3 first-letter:float-left">
              {t('whyChooseUs.contextText')}
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Notre approche ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('whyChooseUs.approachTitle')}</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4 mb-4"></div>
            <p className="text-[#2E9013] text-lg italic font-semibold">
              {t('whyChooseUs.approachSubtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-[#2E9013] text-xl font-bold mt-0.5 flex-shrink-0">•</span>
              <div>
                <p className="text-[#4B5563] text-lg leading-relaxed text-justify">
                  {t('whyChooseUs.approachItem1')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-[#2E9013] text-xl font-bold mt-0.5 flex-shrink-0">•</span>
              <div>
                <p className="text-[#4B5563] text-lg leading-relaxed text-justify">
                  {t('whyChooseUs.approachItem2')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-[#2E9013] text-xl font-bold mt-0.5 flex-shrink-0">•</span>
              <div>
                <p className="text-[#4B5563] text-lg leading-relaxed text-justify">
                  {t('whyChooseUs.approachItem3')}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <blockquote className="border-l-4 border-[#2E9013] pl-6">
              <h5 className="font-medium text-xl md:text-2xl text-[#573D4E] italic leading-relaxed">
                {t('whyChooseUs.approachQuote')}
              </h5>
              <footer className="mt-4 text-[#2E9013] font-bold text-lg">{t('whyChooseUs.approachQuoteAuthor')}</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── 4. 5 engagements ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('whyChooseUs.commitmentsTitle')}</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">{t('whyChooseUs.commitment1Title')}</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">{t('whyChooseUs.commitment1Text')}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">{t('whyChooseUs.commitment2Title')}</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">{t('whyChooseUs.commitment2Text')}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">{t('whyChooseUs.commitment3Title')}</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">{t('whyChooseUs.commitment3Text')}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">{t('whyChooseUs.commitment4Title')}</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">{t('whyChooseUs.commitment4Text')}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">{t('whyChooseUs.commitment5Title')}</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">{t('whyChooseUs.commitment5Text')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5 & 6. Notre différence ─────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('whyChooseUs.differenceTitle')}</h2>
            <p className="text-[#4B5563] mt-2 italic">{t('whyChooseUs.differenceSubtitle')}</p>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-[#FAFAFA] rounded-xl p-10">
              <h3 className="text-[#573D4E] font-bold text-xl mb-2">{t('whyChooseUs.diffCol1Title')}</h3>
              <p className="text-[#2E9013] italic mb-6">{t('whyChooseUs.diffCol1Subtitle')}</p>
              <p className="text-[#4B5563] mb-4 text-justify">{t('whyChooseUs.diffCol1Text1')}</p>
              <p className="text-[#4B5563] mb-3 text-justify"><strong>{t('whyChooseUs.diffCol1Strong1')}</strong> {t('whyChooseUs.diffCol1Text2')}</p>
              <p className="text-[#4B5563] text-justify"><strong>{t('whyChooseUs.diffCol1Strong2')}</strong> {t('whyChooseUs.diffCol1Text3')}</p>
            </div>

            <div className="bg-[#FAFAFA] rounded-xl p-10">
              <h3 className="text-[#573D4E] font-bold text-xl mb-2">{t('whyChooseUs.diffCol2Title')}</h3>
              <p className="text-[#2E9013] italic mb-6">{t('whyChooseUs.diffCol2Subtitle')}</p>
              <p className="text-[#4B5563] mb-4 text-justify">{t('whyChooseUs.diffCol2Text')}</p>
              <ul className="list-disc pl-5 text-[#4B5563] space-y-2">
                <li>{t('whyChooseUs.diffCol2Item1')}</li>
                <li>{t('whyChooseUs.diffCol2Item2')}</li>
                <li>{t('whyChooseUs.diffCol2Item3')}</li>
              </ul>
            </div>

          </div>
          <p className="text-center text-[#2E9013] italic mt-10 text-lg">
            {t('whyChooseUs.diffBottomText')}
          </p>
        </div>
      </section>

      <FloatingCTA
        label={t('home.ctaDiscuss')}
        href="/contact"
        triggerRef={heroRef}
      />
    </div>
  );
};

export default WhyChooseUsPage;
