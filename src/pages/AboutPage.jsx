import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { User, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import FloatingCTA from '../components/FloatingCTA';

const VISION_IMAGE = "/main-ampoule-succes.webp";
const MISSION_IMAGE = "/famille-tablette-capsules.webp";

const AboutPage = () => {
  const { t } = useLanguage();
  const values = t('about.values');
  const visionMissionRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="about-page">
      <SEO
        title={t('about.metaTitle')}
        description={t('about.metaDescription')}
        url="/about"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
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
                  {t('about.metaTitle')}
                </h1>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-2">
                  <div className="flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                    <Link to="/" className="text-white hover:text-white/80 transition-colors">{t('nav.home')}</Link>
                    <span className="text-white/60">/</span>
                    <span className="text-white">{t('about.metaTitle')}</span>
                  </div>
                </div>
                <p className="text-white/90 text-lg italic mt-4">
                  {t('about.heroTagline')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission — checkerboard ────────────────────────────── */}
      <section ref={visionMissionRef} className="py-16 bg-[#F9FAFD]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
          <div className="rounded-xl overflow-hidden shadow-sm">

            {/* Row 1 — Image gauche · Texte droite */}
            <div className="flex flex-col lg:flex-row min-h-[520px]">
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${VISION_IMAGE})` }}
                />
              </div>
              <div className="w-full lg:w-1/2 flex items-center bg-white px-10 lg:px-16 xl:px-20 py-16 lg:py-20">
                <div className="max-w-lg">
                  <h2 className="font-raleway text-2xl md:text-3xl font-bold text-[#573D4E] mb-5">
                    {t('about.visionTitle')}
                  </h2>
                  <p className="text-[#4B5563] text-lg leading-relaxed mb-8 text-justify">
                    {t('about.visionText')}
                  </p>
                  <Link
                    to="/about/founder"
                    className="inline-flex items-center gap-2 text-[#573D4E] font-bold hover:text-[#2E9013] transition-colors"
                  >
                    Rencontrer notre Fondatrice <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Row 2 — Texte gauche · Image droite */}
            <div className="flex flex-col lg:flex-row-reverse border-t border-gray-100 min-h-[520px]">
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${MISSION_IMAGE})` }}
                />
              </div>
              <div className="w-full lg:w-1/2 flex items-center bg-white px-10 lg:px-16 xl:px-20 py-16 lg:py-20">
                <div className="max-w-lg">
                  <h2 className="font-raleway text-2xl md:text-3xl font-bold text-[#573D4E] mb-5">
                    {t('about.missionTitle')}
                  </h2>
                  <p className="text-[#4B5563] text-lg leading-relaxed mb-5 text-justify">
                    {t('about.missionText')}
                  </p>
                  <p className="text-[#2E9013] text-lg italic font-semibold mb-8">
                    "{t('about.signature')}"
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[#573D4E] font-bold hover:text-[#2E9013] transition-colors"
                  >
                    {t('about.ctaButton')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Valeurs ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F9FAFD]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('about.valuesTitle')}</h3>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4 mb-6"></div>
            <p className="text-[#4B5563] text-lg max-w-2xl mx-auto">
              Chez Freearcs Pharma Services, nous croyons que l'excellence en recherche clinique repose sur des équipes engagées, autonomes et profondément humaines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
                <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">
                  {value.title}
                </h5>
                <p className="text-[#4B5563] text-base leading-relaxed text-justify">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingCTA
        label={t('about.meetFounder')}
        href="/about/founder"
        triggerRef={visionMissionRef}
        MobileIcon={User}
      />
    </div>
  );
};

export default AboutPage;
