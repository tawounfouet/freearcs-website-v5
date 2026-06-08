import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import SEO from '@/components/SEO';
import FloatingCTA from '../components/FloatingCTA';

const ARTICLES = [
  {
    tag: 'Réglementaire',
    title: 'Comment concilier accélération des essais et exigence éthique ?',
    excerpt: "Le rôle stratégique des Comités de Protection des Personnes (CPPs) dans le nouveau cadre EU CTR. Décryptage des enjeux de compétitivité européenne et de souveraineté pharmaceutique.",
    date: 'Article LinkedIn',
    readTime: '4 min',
    image: '/cardio-stethoscope-digital.webp',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7434858946802233344/',
  },
  {
    tag: 'Opérations cliniques',
    title: "Essais cliniques décentralisés : un défi organisationnel",
    excerpt: "Les essais décentralisés rendent la recherche plus accessible aux patients mais déplacent la complexité vers l'opérationnel : e-consent, circuit du médicament, télémédecine, coordination des acteurs.",
    date: 'Article LinkedIn',
    readTime: '4 min',
    image: '/reunion-equipe_gemini.webp',
    url: 'https://www.linkedin.com/posts/nad%C3%A8ge-kambou-%F0%9F%8C%8D-64391089_rechercheclinique-clinicaltrials-dct-activity-7439620809733722112-eFdf',
  },
  {
    tag: 'Innovation',
    title: "Maladies chroniques complexes : la convergence des innovations",
    excerpt: "Thérapie génique en mucoviscidose (études LENTICLAIR et RECODE), télésurveillance en insuffisance rénale chronique, neuromodulation en Alzheimer et SLA : panorama des innovations qui redessinent la recherche clinique.",
    date: 'Article LinkedIn',
    readTime: '4 min',
    image: '/main-ampoule-succes.webp',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7397314048805097472',
  },
];

const TAG_COLORS = {
  'Réglementaire': { bg: '#EAF5E1', color: '#2E9013' },
  'Opérations cliniques': { bg: '#EDE8EB', color: '#573D4E' },
  'Innovation': { bg: '#EAF5E1', color: '#2E9013' },
  'Formation': { bg: '#FEF3DC', color: '#F5A617' },
};

const BlogPage = () => {
  const { t } = useLanguage();
  const topics = t('blog.topics');
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="blog-page">
      <SEO
        title={t('blog.metaTitle')}
        description={t('blog.metaDescription')}
        url="/blog"
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
                  Blog
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                  <Link to="/" className="text-white hover:text-white/80 transition-colors">{t('nav.home')}</Link>
                  <span className="text-white/60">/</span>
                  <span className="text-white">Blog</span>
                </div>
                <p className="text-white/90 italic text-lg mt-4">
                  Veille réglementaire, méthodologie, retours d'expérience terrain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Présentation + Filtres ──────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-20">
          <p className="text-[#4B5563] text-lg leading-relaxed max-w-3xl mx-auto text-center mb-8">
            Retrouvez ici la veille, les analyses, les retours d'expérience terrain et les actualités de la recherche clinique : évolutions réglementaires, méthodologie, conduite opérationnelle des études et bonnes pratiques cliniques.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.isArray(topics) && topics.map((topic) => (
              <span key={topic} className="px-5 py-2 bg-[#F9FAFD] rounded-full border border-gray-200 text-[#573D4E] hover:bg-[#2E9013] hover:text-white cursor-pointer transition-colors text-sm font-medium">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="py-20" data-testid="articles-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => {
              const tagStyle = TAG_COLORS[article.tag] || { bg: '#EDE8EB', color: '#573D4E' };
              return (
                <Card key={article.url} className="group overflow-hidden border-[#E0DDD8] hover:shadow-xl transition-all duration-300">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="aspect-video overflow-hidden bg-[#F8FAF7]">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-3 text-sm mb-4">
                        <span
                          className="inline-flex items-center gap-1 font-semibold px-2.5 py-1 rounded-full text-xs"
                          style={{ backgroundColor: tagStyle.bg, color: tagStyle.color }}
                        >
                          <Tag className="w-3 h-3" />
                          {article.tag}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#4B5563] text-xs">
                          <Calendar className="w-3 h-3" />
                          {article.date} · {article.readTime}
                        </span>
                      </div>
                      <h2 className="font-raleway text-xl font-bold text-[#573D4E] mb-3 group-hover:text-[#2E9013] transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-[#4B5563] text-sm leading-relaxed mb-5">{article.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-[#2E9013] font-semibold text-sm">
                        Lire l'article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  </a>
                </Card>
              );
            })}
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

export default BlogPage;
