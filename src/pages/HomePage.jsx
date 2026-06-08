import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { GreenWave, GreenWaveDivider, HeroWaveTop, HeroWaveBottom } from '../components/GreenWave';
import LogoCarousel from '../components/LogoCarousel';
import FloatingCTA from '../components/FloatingCTA';
import SEO from '../components/SEO';
import { Card, CardContent } from '../components/ui/card';
import {
  ClipboardList,
  FileText,
  DollarSign,
  Search,
  Users,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Beaker,
  Brain,
  Heart,
  Microscope,
  Bug,
  Wind
} from 'lucide-react';

// ─── Animation variants ───────────────────────────────────────────────────────

const ease = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease, delay: 0.15 } },
};

const staggerContainer = (stagger = 0.1, delayStart = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delayStart } },
});

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

// ─── Animated counter ─────────────────────────────────────────────────────────

const Counter = ({ target, suffix = '', duration = 1.8 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
};

// ─── Reusable scroll-reveal wrapper ──────────────────────────────────────────

const Reveal = ({ children, className = '', variants = fadeUp, delay = 0 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={delay ? { ...variants, visible: { ...variants.visible, transition: { ...variants.visible.transition, delay } } } : variants}
  >
    {children}
  </motion.div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const HomePage = () => {
  const { t } = useLanguage();
  const credibilityRef = useRef(null);

  const services = [
    { icon: ClipboardList, title: t('home.projectManagement'), desc: t('home.projectManagementDesc') },
    { icon: FileText, title: t('home.regulatoryAffairs'), desc: t('home.regulatoryAffairsDesc') },
    { icon: DollarSign, title: t('home.contractBudget'), desc: t('home.contractBudgetDesc') },
    { icon: Search, title: t('home.feasibilityMonitoring'), desc: t('home.feasibilityMonitoringDesc') },
    { icon: Users, title: t('home.siteSupport'), desc: t('home.siteSupportDesc') },
    { icon: GraduationCap, title: t('home.investigatorCompliance'), desc: t('home.investigatorComplianceDesc') },
  ];

  const operationalItems = [
    t('home.embeddedExecution'),
    t('home.sponsorOversight'),
    t('home.flexibleMonitoring'),
    t('home.independentStructure'),
  ];

  const therapeuticAreas = [
    { icon: Beaker, title: t('home.oncology'), color: '#2E9013' },
    { icon: Brain, title: t('home.cnsRareDiseases'), color: '#573D4E' },
    { icon: Heart, title: t('home.cardiology'), color: '#D81C20' },
    { icon: Microscope, title: t('home.dermatology'), color: '#F5A617' },
    { icon: Bug, title: t('home.infectiousDiseases'), color: '#2E9013' },
    { icon: Wind, title: t('home.pulmonology'), color: '#573D4E' },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <SEO
        title={t('home.metaTitle')}
        description={t('home.heroSubtitle')}
        url="/"
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[calc(100vh-80px)] p-0 m-0" data-testid="hero-section">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          loop={true}
          speed={800}
          allowTouchMove={false}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          className="w-full h-full"
        >
          {/* Slide 1 — Identité */}
          <SwiperSlide>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/header-6.jpg)' }}
            />
            <div className="relative h-full flex items-center">
              <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20 w-full">
                <div className="w-full sm:w-8/12 lg:w-7/12">
                  <div className="overflow-hidden">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 lg:mb-10">
                      <span className="text-[#573D4E]">{t('home.heroSlide1Title1')}</span>{' '}<span className="text-[#2E9013]">{t('home.heroSlide1Title2')}</span>
                    </h1>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-lg sm:text-xl md:text-2xl text-black font-medium leading-tight mb-10 lg:mb-14">
                      {t('home.heroSlide1Subtitle')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="bg-[#2E9013] hover:bg-[#1f6b0d] text-white font-semibold px-6 py-3 rounded-full inline-flex items-center transition-colors">
                      {t('home.ctaDiscuss')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link to="/services" className="border-2 border-[#2E9013] text-[#2E9013] bg-white/90 hover:bg-[#2E9013] hover:text-white font-semibold px-6 py-3 rounded-full inline-flex items-center transition-colors">
                      {t('home.ctaExplore')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/header-5.jpg)' }}
            />
            <div className="relative h-full flex items-center">
              <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20 w-full">
                <div className="w-full sm:w-8/12 lg:w-7/12">
                  <div className="overflow-hidden">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 lg:mb-10">
                      <span className="text-[#573D4E]">{t('home.heroSlide2Title1')}</span>{' '}<span className="text-[#2E9013]">{t('home.heroSlide2Title2')}</span>
                    </h1>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-lg sm:text-xl md:text-2xl text-black font-medium leading-tight mb-10 lg:mb-14">
                      {t('home.heroSlide2Subtitle')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="bg-[#2E9013] hover:bg-[#1f6b0d] text-white font-semibold px-6 py-3 rounded-full inline-flex items-center transition-colors">
                      {t('home.ctaDiscuss')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link to="/services" className="border-2 border-[#2E9013] text-[#2E9013] bg-white/90 hover:bg-[#2E9013] hover:text-white font-semibold px-6 py-3 rounded-full inline-flex items-center transition-colors">
                      {t('home.ctaExplore')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/header-1.jpg)' }}
            />
            <div className="relative h-full flex items-center">
              <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20 w-full">
                <div className="w-full sm:w-8/12 lg:w-7/12">
                  <div className="overflow-hidden">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 lg:mb-10">
                      <span className="text-[#573D4E]">{t('home.heroSlide3Title1')}</span>{' '}<span className="text-[#2E9013]">{t('home.heroSlide3Title2')}</span>
                    </h1>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-lg sm:text-xl md:text-2xl text-black font-medium leading-tight mb-10 lg:mb-14">
                      {t('home.heroSlide3Subtitle')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="bg-[#2E9013] hover:bg-[#1f6b0d] text-white font-semibold px-6 py-3 rounded-full inline-flex items-center transition-colors">
                      {t('home.ctaDiscuss')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link to="/services" className="border-2 border-[#2E9013] text-[#2E9013] bg-white/90 hover:bg-[#2E9013] hover:text-white font-semibold px-6 py-3 rounded-full inline-flex items-center transition-colors">
                      {t('home.ctaExplore')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Custom Navigation */}
          <div className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </div>
          <div className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full transition-colors">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </Swiper>
      </section>

      <style>{`
        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }
      `}</style>

      {/* ── Who We Are / What We Do ──────────────────────────────────────── */}
      <section className="py-24 bg-white relative" data-testid="who-we-are-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 xl:px-20">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            <Reveal variants={fadeLeft} data-testid="what-we-do-section">
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 h-full" data-testid="what-we-do-section">
                <h2 className="font-raleway text-3xl font-bold text-[#573D4E] mb-2">
                  {t('home.whoWeAre')}
                </h2>
                <p className="text-[#2E9013] font-semibold italic mb-6">
                  {t('home.whoWeAreTagline')}
                </p>
                <p className="text-[#4B5563] mb-4 leading-relaxed max-w-[480px]">
                  {t('home.whoWeAreText')}
                </p>
                <p className="text-[#4B5563] mb-8 leading-relaxed max-w-[480px]">
                  {t('home.whoWeAreText2')}
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border-2 border-[#2E9013] text-[#2E9013] hover:bg-[#2E9013] hover:text-white font-semibold px-6 py-2 rounded-full transition-colors"
                >
                  {t('home.whoWeAreLink')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal variants={fadeRight}>
              <div className="bg-white rounded-2xl p-10 relative overflow-hidden shadow-sm border border-gray-100">
                <h2 className="font-raleway text-3xl font-bold text-[#2E9013] mb-6">
                  {t('home.whatWeDo')}
                </h2>
                <ul className="space-y-4 relative z-10">
                  {Array.isArray(t('home.whatWeDoItems')) && t('home.whatWeDoItems').map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#2E9013] font-bold text-base leading-relaxed flex-shrink-0">▸</span>
                      <span className="text-[#4B5563] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <svg
                  className="absolute bottom-0 left-0 w-full"
                  viewBox="0 0 400 100"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  style={{ height: '80px', opacity: 0.15 }}
                >
                  <path fill="#2E9013" d="M0,80 C100,20 200,120 400,60 L400,100 L0,100 Z" />
                </svg>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <GreenWaveDivider />

      {/* ── Operational Model ────────────────────────────────────────────── */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <Reveal>
            <div className="bg-[#573D4E] rounded-2xl px-10 py-8 text-white">
              <h3 className="font-raleway text-lg font-bold mb-6">
                {t('home.operationalModel')}
              </h3>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={staggerContainer(0.1, 0.2)}
              >
                {operationalItems.map((item) => (
                  <motion.div key={item} className="flex items-start gap-3" variants={staggerItem}>
                    <span className="text-[#F5A617] font-bold text-base leading-relaxed flex-shrink-0">▸</span>
                    <span className="text-white/90 text-base leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* ── Core Services ────────────────────────────────────────────────── */}
      {/* <section className="py-20 bg-white" data-testid="services-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-raleway text-3xl lg:text-4xl font-bold text-[#573D4E] mb-4">
                {t('home.coreServices')}
              </h2>
            </div>
          </Reveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer(0.08)}
          >
            {services.map((service, index) => (
              <motion.div key={service.title} variants={staggerItem} data-testid={`service-card-${index}`}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' }}
                  transition={{ duration: 0.25, ease }}
                >
                  <Card className="group h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-[#EAF5E1] flex items-center justify-center mb-4 group-hover:bg-[#2E9013] transition-colors duration-300">
                        <service.icon className="w-6 h-6 text-[#2E9013] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-raleway text-lg font-bold text-[#573D4E] mb-2">
                        {service.title}
                      </h3>
                      <p className="text-[#4B5563] text-sm leading-relaxed mb-4">
                        {service.desc}
                      </p>
                      <Link
                        to="/services"
                        className="inline-flex items-center text-[#2E9013] hover:text-[#1a5a0b] text-sm font-medium"
                      >
                        {t('home.learnMore')}
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <Reveal delay={0.2}>
            <div className="text-center mt-10">
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#2E9013] text-[#2E9013] hover:bg-[#573D4E] hover:text-white hover:border-[#573D4E] font-semibold px-8 py-3 rounded-full"
                data-testid="view-all-services"
              >
                <Link to="/services">
                  {t('home.viewAllServices')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* ── ANSM Fast-Track ──────────────────────────────────────────────── */}
      {/* <section className="py-16 bg-[#FEF3DC]" data-testid="ansm-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <Reveal variants={fadeLeft}>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="font-raleway text-2xl font-bold text-[#573D4E] mb-2">
                  {t('home.ansm.title')}
                </h3>
                <p className="text-[#F5A617] font-semibold mb-4">{t('home.ansm.subtitle')}</p>
                <p className="text-[#4B5563] leading-relaxed mb-4">
                  {t('home.ansm.text')}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-[#2E9013] hover:text-[#1a5a0b] font-medium"
                >
                  {t('home.learnMore')}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal variants={fadeRight}>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="font-semibold text-[#573D4E] mb-3">Procedures:</h4>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  {t('home.ansm.procedures')}
                </p>
                <div className="mt-6">
                  <Link
                    to="/services"
                    className="inline-flex items-center text-[#2E9013] hover:text-[#1a5a0b] font-medium"
                  >
                    {t('home.learnMore')}
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section> */}

      <GreenWaveDivider flip />

      {/* ── Therapeutic Expertise ────────────────────────────────────────── */}
      {/* <section className="py-20 bg-white" data-testid="therapeutic-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-raleway text-3xl lg:text-4xl font-bold text-[#573D4E] mb-4">
                {t('home.therapeuticExpertise')}
              </h2>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer(0.07)}
          >
            {therapeuticAreas.map((area, index) => (
              <motion.div
                key={area.title}
                variants={staggerItem}
                whileHover={{ y: -5, scale: 1.04 }}
                transition={{ duration: 0.2, ease }}
                className="text-center p-5 rounded-2xl bg-white border border-gray-100 cursor-default"
                data-testid={`therapeutic-area-${index}`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${area.color}20` }}
                >
                  <area.icon className="w-6 h-6" style={{ color: area.color }} />
                </div>
                <h3 className="font-raleway text-sm font-bold text-[#573D4E] leading-tight">
                  {area.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          <Reveal delay={0.2}>
            <div className="text-center mt-10">
              <Button
                asChild
                variant="ghost"
                className="text-[#2E9013] hover:text-[#1a5a0b] font-semibold"
                data-testid="explore-expertise"
              >
                <Link to="/therapeutic-expertise">
                  {t('home.exploreExpertise')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* ── References & Stats ───────────────────────────────────────────── */}
      <section ref={credibilityRef} className="py-16 bg-white" data-testid="references-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">

          <Reveal>
            <h2 className="font-raleway text-2xl lg:text-3xl font-bold text-[#573D4E] text-center mb-10">
              {t('home.trustHeading')}
            </h2>
            <div className="py-8">
              <LogoCarousel />
            </div>
          </Reveal>

          {/* Indicateurs clés */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-200"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer(0.15)}
          >
            {/* Carte 1 — Projets */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(46,144,19,0.10)' }}
              transition={{ duration: 0.2 }}
              className="text-center p-8 bg-white border border-gray-100 rounded-2xl"
            >
              <p className="text-4xl font-bold text-[#2E9013] mb-1 font-raleway">
                <Counter target={30} suffix="+" />
              </p>
              <p className="text-xs uppercase tracking-widest text-[#2E9013]/60 font-semibold mb-2">{t('home.statsSince2020')}</p>
              <p className="text-sm text-[#4B5563]">{t('home.statsProjects')}</p>
            </motion.div>

            {/* Carte 2 — Fidélisation */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(87,61,78,0.10)' }}
              transition={{ duration: 0.2 }}
              className="text-center p-8 bg-white border border-gray-100 rounded-2xl"
            >
              <p className="text-4xl font-bold text-[#573D4E] mb-1 font-raleway">
                <Counter target={65} suffix=" %" />
              </p>
              <p className="text-sm text-[#4B5563]">{t('home.statsRetention')}</p>
            </motion.div>

            {/* Carte 3 — International */}
            <motion.div
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 16px 32px rgba(245,166,23,0.10)' }}
              transition={{ duration: 0.2 }}
              className="text-center p-8 bg-white border border-gray-100 rounded-2xl"
            >
              <p className="text-4xl font-bold text-[#F5A617] mb-1 font-raleway">{t('home.statsInternational')}</p>
              <p className="text-xs uppercase tracking-widest text-[#F5A617]/60 font-semibold mb-2">{t('home.statsZonesCovered')}</p>
              <p className="text-sm text-[#4B5563] leading-relaxed">{t('home.statsZonesText')}</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <FloatingCTA label={t('home.ctaDiscuss')} href="/contact" triggerRef={credibilityRef} />

    </div>
  );
};

export default HomePage;
