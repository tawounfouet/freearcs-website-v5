import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '@/components/SEO';
import FloatingCTA from '../components/FloatingCTA';

const TYPES_ETUDES = [
  {
    title: "Études interventionnelles",
    detail: "Études de dérisquage, POC, First-in-Human, essais cliniques contrôlés (Phase I à IV), investigations cliniques, PMCF",
  },
  {
    title: "Études observationnelles",
    detail: "Cohortes, registres, études post-AMM, suivi long terme",
  },
  {
    title: "Études épidémiologiques",
    detail: "Études de prévalence, d'incidence, identification des facteurs de risque",
  },
  {
    title: "Données de vie réelle (RWE)",
    detail: "Projets Real-World Evidence à partir de bases de données de soins courants",
  },
];

const PERIMETRES = [
  {
    title: "Médicaments",
    detail: "Produits soumis à Autorisation de Mise sur le Marché (AMM)",
  },
  {
    title: "Dispositifs médicaux",
    detail: "Études pré-marquage CE et suivi post-marquage (PMCF)",
  },
  {
    title: "Hors produits de santé",
    detail: "Études cliniques sur produits cosmétiques, compléments alimentaires, nutraceutiques",
  },
];

const AIRES = [
  {
    title: "Oncologie & Hématologie",
    detail: "Phases précoces (I & II), First-in-Human, immunothérapies, vaccins thérapeutiques. Indications : tumeurs solides, lymphomes, myélome multiple, leucémies (LLC, LAM), cancer de la vessie, GIST, études sur implants mammaires, radiothérapie.",
  },
  {
    title: "Neurosciences (SNC)",
    detail: "Pathologies neurodégénératives. Indications : Alzheimer, Parkinson, SLA, troubles neurodéveloppementaux, spasticité, atrophie multisystématisée.",
  },
  {
    title: "Maladies rares & orphelines",
    detail: "Expertise des designs adaptés aux faibles effectifs. Indications : dystrophie musculaire de Duchenne, maladie de Wilson, FAOD.",
  },
  {
    title: "Dermatologie & maladies inflammatoires",
    detail: "Indications : psoriasis, lupus, dermatite atopique.",
  },
  {
    title: "Infectiologie & Vaccinologie",
    detail: "Études sur maladies infectieuses et essais vaccinaux.",
  },
  {
    title: "Pneumologie, Rhumatologie & Cardiologie",
    detail: "BPCO, rhumatologie, FAP, LVAD.",
  },
];

const TherapeuticExpertisePage = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="therapeutic-expertise-page">
      <SEO
        title="Expertise Thérapeutique"
        description="Une CRO intervenant sur toutes les aires thérapeutiques. Études interventionnelles, observationnelles, épidémiologiques et données de vie réelles sur les médicaments, dispositifs médicaux et hors produits de santé."
        url="/therapeutic-expertise"
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
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
                  Expertise Thérapeutique
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                  <Link to="/" className="text-white hover:text-white/80 transition-colors">{t('nav.home')}</Link>
                  <span className="text-white/60">/</span>
                  <span className="text-white">Expertise Thérapeutique</span>
                </div>
                <p className="text-white/90 text-lg italic mt-4">
                  {t('therapeuticExpertise.heroSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Introduction ──────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-[#FAFAFA]">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[#4B5563] text-lg leading-relaxed text-justify">
            {t('therapeuticExpertise.intro')}
          </p>
        </div>
      </section>

      {/* ── Types d'études ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('therapeuticExpertise.studyTypesTitle')}</h2>
            <p className="text-[#4B5563] mt-3 italic">{t('therapeuticExpertise.studyTypesIntro')}</p>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {TYPES_ETUDES.map((item) => (
              <div key={item.title} className="bg-[#F9FAFD] rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-[#573D4E] text-xl mb-3">{item.title}</h3>
                <p className="text-[#4B5563] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Périmètres d'études ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F9FAFD]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('therapeuticExpertise.perimetersTitle')}</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {PERIMETRES.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-[#573D4E] text-xl mb-3">{item.title}</h3>
                <p className="text-[#4B5563] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Aires thérapeutiques ──────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('therapeuticExpertise.areasTitle')}</h2>
            <p className="text-[#4B5563] mt-3 max-w-2xl mx-auto">{t('therapeuticExpertise.areasIntro')}</p>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {AIRES.map((aire) => (
              <div key={aire.title} className="bg-[#F9FAFD] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-[#573D4E] text-xl mb-3">{aire.title}</h3>
                <p className="text-[#4B5563] leading-relaxed text-sm">{aire.detail}</p>
              </div>
            ))}
          </div>
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

export default TherapeuticExpertisePage;
