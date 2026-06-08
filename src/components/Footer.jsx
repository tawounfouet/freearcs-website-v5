import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Mail, Phone, Linkedin } from 'lucide-react';

const LOGO_URL = "/logo-white-freearcs.svg";



const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/legal-representation', label: t('nav.legalRepresentation') },
    { path: '/therapeutic-expertise', label: t('nav.therapeuticExpertise') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-[#573D4E] text-white" data-testid="main-footer">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link to="/" data-testid="footer-logo">
              <img 
                src={LOGO_URL} 
                alt="Freearcs Pharma Services"
                className="h-12 w-auto mb-4"
              />
            </Link>
            <div className="flex items-center space-x-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>50 Avenue des Champs-Élysées,<br />75008 Paris – France</span>
            </div>
            {/* AFCROs Member Badge */}
            <div className="mt-5 bg-white/10 rounded-lg py-3 px-4 inline-flex items-center gap-3">
              <span className="text-sm text-white/80 font-medium">{t('footer.afcrosMember')}</span>
              <img src="/logo_AFCROs.png" alt="AFCROs" className="h-16 w-auto" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white/70 hover:text-[#F5A617] transition-colors text-sm"
                  data-testid={`footer-link-${link.path.replace('/', '')}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.servicesTitle')}</h3>
            <nav className="flex flex-col space-y-2 text-sm text-white/70">
              <Link to="/services" className="hover:text-[#F5A617] transition-colors">
                {t('footer.serviceProjectManagement')}
              </Link>
              <Link to="/services" className="hover:text-[#F5A617] transition-colors">
                {t('footer.serviceRegulatoryAffairs')}
              </Link>
              <Link to="/services" className="hover:text-[#F5A617] transition-colors">
                {t('footer.serviceContractBudget')}
              </Link>
              <Link to="/services" className="hover:text-[#F5A617] transition-colors">
                {t('footer.serviceFeasibilityMonitoring')}
              </Link>
              <Link to="/services" className="hover:text-[#F5A617] transition-colors">
                {t('footer.serviceSiteSupport')}
              </Link>
              <Link to="/services" className="hover:text-[#F5A617] transition-colors">
                {t('footer.serviceTraining')}
              </Link>
            </nav>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-white/70">
              <a href="mailto:contact@freearcs.com" className="flex items-center space-x-2 hover:text-[#F5A617] transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@freearcs.com</span>
              </a>
              <a href="tel:+33179932112" className="flex items-center space-x-2 hover:text-[#F5A617] transition-colors">
                <Phone className="w-4 h-4" />
                <span>+33 1 79 93 21 12</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              <a 
                href="https://www.linkedin.com/company/freearcs-pharma-services" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#F5A617] transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Language Switch */}
            <div className="mt-6 flex items-center space-x-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  language === 'en' ? 'bg-[#2E9013] text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                data-testid="footer-lang-en"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  language === 'fr' ? 'bg-[#2E9013] text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                data-testid="footer-lang-fr"
              >
                FR
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/60 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center space-x-6 text-sm text-white/60">
            <Link to="/legal" className="hover:text-[#F5A617] transition-colors" data-testid="footer-legal">
              {t('footer.legal')}
            </Link>
            <Link to="/privacy" className="hover:text-[#F5A617] transition-colors" data-testid="footer-privacy">
              {t('footer.privacy')}
            </Link>
            <Link to="/cookies" className="hover:text-[#F5A617] transition-colors" data-testid="footer-cookies">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
