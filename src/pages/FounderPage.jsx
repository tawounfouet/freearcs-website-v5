import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import SEO from '@/components/SEO';
import FloatingCTA from '../components/FloatingCTA';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FounderPage = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const CONVICTIONS = t('founder.convictions');

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="founder-page">
      <SEO
        title={t('founder.metaTitle')}
        description={t('founder.metaDescription')}
        url="/founder"
      />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
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
                  {t('nav.founder')}
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                  <Link to="/" className="text-white hover:text-white/80 transition-colors">{t('nav.home')}</Link>
                  <span className="text-white/60">/</span>
                  <span className="text-white">{t('nav.founder')}</span>
                </div>
                <p className="text-white/90 text-lg mt-6 max-w-2xl mx-auto">
                  {t('founder.heroSubtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PRÉSENTATION ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#F9FAFD]">
        <div className="max-w-[1060px] mx-auto px-6 lg:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.08)] bg-white"
          >
            {/* Photo */}
            <div className="relative lg:w-[40%] min-h-[340px] lg:min-h-[400px] flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-top"
                style={{ backgroundImage: 'url(/assets/profile-linkedin-nadege.png)' }}
              />
              {/* subtle vignette on mobile bottom / desktop right */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:to-white/8" />
            </div>

            {/* Content */}
            <div className="lg:w-[60%] px-8 py-10 md:px-12 md:py-12 lg:px-14 lg:py-16 flex flex-col justify-center">

              {/* Identity */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2B2B2B] tracking-tight">
                  Nadège KAMBOU
                </h2>
                <p className="mt-1.5 text-[#573D4E] text-xs font-semibold tracking-[0.18em] uppercase">
                  Fondatrice et Directrice des Opérations
                </p>
              </div>

              {/* Divider accent */}
              <div className="mt-6 w-10 h-[3px] rounded-full bg-[#2E9013]" />

              {/* Bio paragraphs */}
              <div className="mt-6 space-y-4 text-[#4B5563] text-[0.97rem] leading-[1.75] text-justify">
                <p>
                  Forte de plus de 10 ans d'expérience en recherche clinique internationale,
                  Nadège KAMBOU a bâti son expertise au sein de grandes CROs internationales.
                </p>
                <p>
                  Elle a contribué à des études majeures en oncologie, Alzheimer, pédiatrie et
                  maladies rares, en France comme à l'international.
                </p>
                <p>
                  Face à l'émergence des biotechs et startups HealthTech innovantes, elle fonde
                  Freearcs Pharma Services en 2020 pour offrir aux promoteurs un modèle plus humain,
                  fondé sur la proximité, la stratégie, la compréhension fine des enjeux et la
                  transmission des bonnes pratiques.
                </p>
              </div>

              {/* Quote */}
              <blockquote className="mt-9 border-l-[3px] border-[#2E9013] pl-5 bg-[#F5FBF2] py-4 pr-4 rounded-r-lg">
                <p className="text-[#573D4E] italic text-[0.95rem] font-medium leading-[1.7] text-justify">
                  «&nbsp;Aujourd'hui, j'accompagne mes partenaires avec un modèle plus humain, en
                  travaillant main dans la main, alliant expertise technique, proximité et une
                  compréhension réelle de leurs besoins.&nbsp;»
                </p>
              </blockquote>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. MES CONVICTIONS ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA]">
        <div className="max-w-[860px] mx-auto px-6">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">
              {t('founder.convictionsTitle')}
            </h2>
            <p className="mt-3 text-[#4B5563] text-base">
              {t('founder.convictionsIntro')}
            </p>
          </motion.div>

          {/* Cards list */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-sm px-8 py-2 md:px-10">
            {CONVICTIONS.map(({ title, text }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={i}
                className="flex items-start gap-4 py-6"
              >
                <span className="text-[#2E9013] text-xl leading-snug font-bold mt-0.5 flex-shrink-0">•</span>
                <div>
                  <p className="font-bold text-[#2B2B2B] text-[0.97rem] leading-snug mb-1.5">
                    {title}
                  </p>
                  <p className="text-[#4B5563] text-sm leading-[1.75] text-justify">{text}</p>
                </div>
              </motion.div>
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

export default FounderPage;
