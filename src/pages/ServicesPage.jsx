import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ClipboardList,
  FileText,
  DollarSign,
  Search,
  Users,
  GraduationCap,
  CheckCircle,
  X,
  ArrowRight,
} from 'lucide-react';
import SEO from '@/components/SEO';
import FloatingCTA from '../components/FloatingCTA';

/* ── Données des 6 piliers ─────────────────────────────────────────────── */
const PILLARS = [
  {
    id: 1,
    icon: ClipboardList,
    color: '#2E9013',
    title: 'Gestion de Projet',
    subtitle: "Pilotage opérationnel et coordination de vos études cliniques.",
    missions: [
      "Assistance à la conception d'études (design, faisabilité) et structuration des documents d'étude",
      'Coordination de projet et interfaces multipartites',
      'Gestion du budget, du planning et des indicateurs clés de performance',
      'Coordination interfonctionnelle (réglementaire, monitoring, data, sites)',
      'Suivi des jalons, des risques et des délais, gestion des écarts',
    ],
  },
  {
    id: 2,
    icon: FileText,
    color: '#573D4E',
    title: 'Affaires Réglementaires',
    subtitle: 'Soumissions et conformité réglementaire, en France et à l\'international.',
    missions: [
      'Expertise des cadres réglementaires : médicaments, dispositifs médicaux et études hors produits de santé, en France et à l\'international',
      "Soumissions réglementaires auprès des autorités compétentes nationales et internationales",
      "Coordination avec les comités d'éthique selon les juridictions",
      "Déclaration des événements indésirables et suivi de pharmacovigilance",
      "Suivi réglementaire en cours d'étude et gestion des amendements",
    ],
  },
  {
    id: 3,
    icon: DollarSign,
    color: '#F5A617',
    title: 'Contrat et Budget',
    subtitle: "Négociation et gestion contractuelle de vos études cliniques.",
    missions: [
      'Rédaction et négociation des Clinical Trial Agreements (CTA)',
      'Négociation des accords avec les centres investigateurs',
      "Construction et optimisation du budget d'étude",
      'Optimisation du calendrier de démarrage (start-up)',
      'Suivi budgétaire et reporting financier',
    ],
  },
  {
    id: 4,
    icon: Search,
    color: '#2E9013',
    title: 'Faisabilité et Monitoring',
    subtitle: 'Sélection des centres et supervision opérationnelle de vos études.',
    missions: [
      'Études de faisabilité et qualification stratégique des centres investigateurs',
      "Visites de sélection, d'initiation, de monitoring et de clôture",
      "Monitoring sur site, à distance ou hybride — adapté au design et au profil de l'étude",
      'Intégrité des données et conformité au protocole',
      'Gestion du Trial Master File (TMF) et du classeur investigateur',
    ],
  },
  {
    id: 5,
    icon: Users,
    color: '#573D4E',
    title: 'Support Site et Saisie de Données',
    subtitle: 'Soutien opérationnel aux investigateurs et conformité des données.',
    missions: [
      'Support au recrutement des patients (stratégie, screening, suivi)',
      "Saisie de données dans l'eCRF et résolution des queries",
      "Aide à l'inclusion et préparation des visites",
      'Suivi de la conformité des centres — Audit',
    ],
  },
  {
    id: 6,
    icon: GraduationCap,
    color: '#F5A617',
    title: 'Formation',
    subtitle: 'Transfert de compétences et accompagnement personnalisé : de la conception de l\'étude à l\'ancrage opérationnel',
    missions: [
      "Stratégie de montage d'étude clinique et accompagnement à la structuration des études de preuve de concept (POC)",
      "Diagnostic des besoins et conception de modules sur-mesure adaptés à votre étude et votre aire thérapeutique",
      'Formation aux Bonnes Pratiques Cliniques (BPC) et aux exigences réglementaires',
      'Formation à la méthodologie appliquée à la Recherche Clinique',
      'Formation des équipes investigatrices',
      "Accompagnement à la mise en oeuvre des bonnes pratiques au sein de vos équipes",
      "Team building stratégique : journées d'alignement des équipes autour des enjeux d'un projet clinique",
    ],
  },
];

/* ── Modal ──────────────────────────────────────────────────────────────── */
const ServiceModal = ({ pillar, onClose }) => {
  if (!pillar) return null;
  const Icon = pillar.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#2B2B2B]/70 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-8 rounded-t-2xl bg-[#573D4E]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold leading-tight">{pillar.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors flex-shrink-0 mt-1"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <p className="text-[#573D4E] font-semibold text-lg mb-6 italic text-justify">
            {pillar.subtitle}
          </p>

          <h4 className="text-[#2B2B2B] font-bold text-base uppercase tracking-wider mb-4">
            Missions types
          </h4>
          <ul className="space-y-3">
            {pillar.missions.map((mission, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#2E9013]" />
                <span className="text-[#4B5563] leading-relaxed text-justify">{mission}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-full transition-all hover:bg-[#1a5a0b] bg-[#2E9013]"
            >
              Discutons de votre projet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Page ───────────────────────────────────────────────────────────────── */
const ServicesPage = () => {
  const { t } = useLanguage();
  const [activePillar, setActivePillar] = useState(null);
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="services-page">
      <SEO
        title="Nos Services"
        description="Six piliers de prestations CRO : gestion de projet, affaires réglementaires, contrat et budget, faisabilité et monitoring, support site et saisie de données, formation."
        url="/services"
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
                  Nos Services
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                  <Link to="/" className="text-white hover:text-white/80 transition-colors">Accueil</Link>
                  <span className="text-white/60">/</span>
                  <span className="text-white">Nos Services</span>
                </div>
                <p className="text-white/90 text-lg mt-6 max-w-2xl mx-auto">
                  Six piliers opérationnels pour soutenir la conduite de vos études cliniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modèle Opérationnel ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F9FAFD]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('services.operationalModelTitle')}</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4 mb-6"></div>
            <p className="text-[#4B5563] text-lg max-w-2xl mx-auto">
              {t('services.operationalModelIntro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-[#573D4E] text-xl font-bold">{t('services.integratedModelTitle')}</h3>
                  <p className="text-[#2E9013] text-sm font-semibold">{t('services.integratedModelSubtitle')}</p>
                </div>
                <p className="text-[#4B5563] text-base leading-relaxed flex-1 text-justify">
                  {t('services.integratedModelText')}
                </p>

              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-[#573D4E] text-xl font-bold">{t('services.embeddedModelTitle')}</h3>
                  <p className="text-[#573D4E] text-sm font-semibold">{t('services.embeddedModelSubtitle')}</p>
                </div>
                <p className="text-[#4B5563] text-base leading-relaxed flex-1 text-justify">
                  {t('services.embeddedModelText')}
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Six Piliers ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F9FAFD]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#573D4E]">{t('services.domainsTitle')}</h2>
            <div className="w-16 h-1 bg-[#2E9013] mx-auto mt-4 mb-6"></div>
            <p className="text-[#4B5563] text-lg max-w-xl mx-auto">
              {t('services.domainsIntro')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar)}
                  className="text-left bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col group cursor-pointer w-full"
                  data-testid={`pillar-${pillar.id}`}
                >
                  <h3 className="flex items-center gap-3 font-bold text-[#573D4E] text-xl mb-3 group-hover:text-[#2E9013] transition-colors">
                    <Icon className="w-6 h-6 flex-shrink-0 transition-colors" style={{ color: pillar.color }} />
                    {pillar.title}
                  </h3>
                  <p className="text-[#4B5563] text-base leading-relaxed mb-4 text-justify">
                    {pillar.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2E9013] group-hover:gap-2.5 transition-all">
                    {t('services.seeMissions')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Modal ──────────────────────────────────────────────────────── */}
      {activePillar && (
        <ServiceModal
          pillar={activePillar}
          onClose={() => setActivePillar(null)}
        />
      )}

      <FloatingCTA
        label={t('home.ctaDiscuss')}
        href="/contact"
        triggerRef={heroRef}
      />
    </div>
  );
};

export default ServicesPage;
