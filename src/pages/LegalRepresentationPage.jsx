import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import FloatingCTA from '../components/FloatingCTA';

const LegalRepresentationPage = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="legal-representation-page">
      <SEO
        title={t('legalRepresentation.metaTitle')}
        description={t('legalRepresentation.metaDescription')}
        url="/legal-representation"
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
                  Représentation Légale dans l'Union Européenne
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                  <Link to="/" className="text-white hover:text-white/80 transition-colors">Accueil</Link>
                  <span className="text-white/60">/</span>
                  <span className="text-white">Représentation Légale dans l'UE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Le cadre réglementaire ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('legalRepresentation.regulatoryTitle')}</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 lg:p-16">
            <p className="text-[#4B5563] text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#2E9013] first-letter:mr-3 first-letter:float-left mb-6">
              Selon le Règlement (UE) 536/2014 sur les essais cliniques de médicaments et le Règlement (UE) 2017/745 sur les dispositifs médicaux, tout promoteur établi en dehors de l'Espace Économique Européen (EEE) doit désigner un représentant légal établi dans l'un des États membres de l'UE. Ce représentant légal est responsable de veiller à ce que l'essai clinique soit conforme aux exigences réglementaires de l'UE et sert d'interlocuteur pour les autorités de régulation de l'UE.
            </p>
            <p className="text-[#4B5563] text-lg leading-relaxed">
              Freearcs Pharma Services agit comme représentant légal pour les promoteurs établis hors UE qui conduisent des études cliniques dans un ou plusieurs États membres. Contactez-nous pour en savoir plus sur nos services et comment nous pouvons vous aider à réussir vos projets de Recherche Clinique en Union Européenne.
            </p>
            <div className="mt-8 flex justify-start">
              <img
                src="/UE.jpg"
                alt="Drapeau Union Européenne"
                className="h-32 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA bas de page ────────────────────────────────────────────── */}
      {/* <section className="py-16 bg-[#2E9013]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
            Vous préparez une étude clinique ?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-[#2E9013] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
          >
            Discutons de votre projet <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section> */}

      <FloatingCTA
        label={t('home.ctaDiscuss')}
        href="/contact"
        triggerRef={heroRef}
      />
    </div>
  );
};

export default LegalRepresentationPage;
