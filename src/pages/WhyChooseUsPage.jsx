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
        title="Pourquoi nous choisir ?"
        description="Une CRO française indépendante au service des biotechs, startups HealthTech et laboratoires pharmaceutiques. Expertise technique, proximité humaine et maîtrise réglementaire."
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
                  Pourquoi nous choisir ?
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                  <Link to="/" className="text-white hover:text-white/80 transition-colors">Accueil</Link>
                  <span className="text-white/60">/</span>
                  <span className="text-white">Pourquoi nous choisir ?</span>
                </div>
                <p className="text-white/90 text-lg mt-6 max-w-2xl mx-auto">
                  Cinq raisons concrètes de nous confier votre étude.
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
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">Le contexte</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-[#4B5563] text-lg leading-relaxed text-justify first-letter:text-5xl first-letter:font-bold first-letter:text-[#2E9013] first-letter:mr-3 first-letter:float-left">
              Le développement scientifique a fait émerger une nouvelle génération de biotechs et de startups HealthTech, qui innovent aux côtés des laboratoires pharmaceutiques établis. Si leur expertise technologique est de pointe, beaucoup sont moins outillées sur la dimension réglementaire et opérationnelle : stratégie, budgétisation, jalons de pilotage, délais d'autorisations, conventions hospitalières, conformité aux Bonnes Pratiques Cliniques. C'est précisément à cette jonction que Freearcs Pharma Services intervient.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Notre approche ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">Notre approche</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4 mb-4"></div>
            <p className="text-[#2E9013] text-lg italic font-semibold">
              Un accompagnement humain, main dans la main avec vos équipes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-[#2E9013] text-xl font-bold mt-0.5 flex-shrink-0">•</span>
              <div>
                <p className="text-[#4B5563] text-lg leading-relaxed text-justify">
                  Nous prenons le temps de comprendre votre technologie, vos contraintes et vos enjeux avant toute proposition.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-[#2E9013] text-xl font-bold mt-0.5 flex-shrink-0">•</span>
              <div>
                <p className="text-[#4B5563] text-lg leading-relaxed text-justify">
                  Nous travaillons en transparence avec vos équipes, sans les écarter du pilotage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-[#2E9013] text-xl font-bold mt-0.5 flex-shrink-0">•</span>
              <div>
                <p className="text-[#4B5563] text-lg leading-relaxed text-justify">
                  Nous expliquons chaque étape réglementaire et opérationnelle, pour que vous gardiez la maîtrise scientifique et la maîtrise réglementaire de votre projet.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <blockquote className="border-l-4 border-[#2E9013] pl-6">
              <h5 className="font-medium text-xl md:text-2xl text-[#573D4E] italic leading-relaxed">
                «&nbsp;Les équipes des biotechs sont expertes sur leur technologie, mais souvent perdues sur la partie réglementaire — autorisations, délais, conventions hospitalières. Notre travail, c'est de vous aider à comprendre et anticiper ces étapes, pour que le projet avance sereinement et suivant la réglementation.&nbsp;»
              </h5>
              <footer className="mt-4 text-[#2E9013] font-bold text-lg">— Nadège KAMBOU, Fondatrice</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── 4. 5 engagements ────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">5 engagements</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">Agile et flexible</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">Une structure indépendante, sans chaîne hiérarchique étendue. Vous avez un interlocuteur direct qui connaît votre étude, et nous adaptons notre organisation à l'évolution de votre projet.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">Méthodes éprouvées sur protocoles complexes</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">Phase I, études pivots, oncologie, maladies rares ; des protocoles sur lesquels nos équipes développent une expertise durable, transmise et capitalisée projet après projet.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">Accompagnement sur mesure</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">Chaque mission est alignée sur vos contraintes et vos objectifs. Que vos équipes soient déjà structurées ou pas, nous nous adaptons à votre niveau de maturité opérationnelle.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">Maîtrise réglementaire</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">France, UE, exigences internationales. ANSM, CPP, CNIL, CTR 536/2014, MDR 745/2017, exigences FDA selon les juridictions. Nous suivons activement les évolutions réglementaires pour vous en tenir informés.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col">
              <h5 className="font-raleway text-xl font-bold text-[#573D4E] mb-3">Expertise opérationnelle</h5>
              <p className="text-[#4B5563] text-base leading-relaxed text-justify">Chaque mission est portée par une supervision opérationnelle dédiée, qui assure la cohérence du pilotage, la qualité de l'exécution et la continuité de l'interlocution avec votre équipe.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5 & 6. Notre différence ─────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">Notre différence</h2>
            <p className="text-[#4B5563] mt-2 italic">Deux dimensions qui distinguent notre accompagnement.</p>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-[#FAFAFA] rounded-xl p-10">
              <h3 className="text-[#573D4E] font-bold text-xl mb-2">Adaptation au niveau de maturité de votre organisation</h3>
              <p className="text-[#2E9013] italic mb-6">Vos procédures, ou les nôtres.</p>
              <p className="text-[#4B5563] mb-4 text-justify">Toutes les organisations n'ont pas le même niveau de structuration qualité. Notre approche s'adapte :</p>
              <p className="text-[#4B5563] mb-3 text-justify"><strong>Pour les organisations déjà structurées :</strong> Nous nous intégrons à vos SOPs et à votre cadre qualité existant. Notre travail respecte vos procédures internes, vos circuits de validation et votre gouvernance documentaire.</p>
              <p className="text-[#4B5563] text-justify"><strong>Pour les organisations en cours de structuration :</strong> Nous mettons en oeuvre un cadre qualité adapté au périmètre de notre intervention, conforme aux Bonnes Pratiques Cliniques et aux exigences réglementaires applicables.</p>
            </div>

            <div className="bg-[#FAFAFA] rounded-xl p-10">
              <h3 className="text-[#573D4E] font-bold text-xl mb-2">La dimension pédagogique</h3>
              <p className="text-[#2E9013] italic mb-6">Comprendre pour décider en toute autonomie.</p>
              <p className="text-[#4B5563] mb-4 text-justify">L'accompagnement Freearcs Pharma Services inclut une dimension pédagogique. Sur la base des besoins identifiés avec vous, nous proposons des formations sur mesure pour que vos équipes :</p>
              <ul className="list-disc pl-5 text-[#4B5563] space-y-2">
                <li>Comprennent le cadre réglementaire applicable à votre projet</li>
                <li>Anticipent les étapes critiques (soumissions, autorisations, délais d'inclusion, conventions hospitalières)</li>
                <li>Pilotent le développement de votre technologie en toute maîtrise réglementaire et scientifique</li>
              </ul>
            </div>

          </div>
          <p className="text-center text-[#2E9013] italic mt-10 text-lg">
            Notre objectif : que vous compreniez chaque décision réglementaire et opérationnelle prise sur votre étude, et que vous puissiez la défendre devant un investisseur, une autorité ou un partenaire académique.
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
