import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Send, CheckCircle, Briefcase, Mail } from 'lucide-react';
import SEO from '@/components/SEO';

const SUBJECT_OPTIONS = [
  { value: '', label: 'Sélectionnez un sujet' },
  { value: 'Etude clinique', label: 'Étude clinique' },
  { value: 'Representation Legale UE', label: 'Représentation Légale UE' },
  { value: 'Formation', label: 'Formation' },
  { value: 'Partenariat', label: 'Partenariat' },
  { value: 'Autre', label: 'Autre' },
];

const ContactPage = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    name: '',
    email: '',
    organisation: '',
    fonction: '',
    phone: '',
    subject: searchParams.get('subject') || '',
    message: '',
    rgpdConsent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F9FAFD] flex items-center justify-center" data-testid="contact-success">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#EAF5E1] flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#2E9013]" />
          </div>
          <h1 className="font-raleway text-3xl font-bold text-[#573D4E] mb-4">
            {t('contact.successTitle')}
          </h1>
          <p className="text-[#4B5563] mb-6">{t('contact.successText')}</p>
          <Button
            onClick={() => setSubmitted(false)}
            className="bg-[#2E9013] hover:bg-[#1a5a0b] text-white font-semibold px-6 py-3 rounded-full"
          >
            {t('contact.form.anotherMessage')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFD]" data-testid="contact-page">
      <SEO
        title={t('contact.metaTitle')}
        description={t('contact.metaDescription')}
        url="/contact"
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
                  Contact
                </h1>
                <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-bold text-lg">
                  <Link to="/" className="text-white hover:text-white/80 transition-colors">{t('nav.home')}</Link>
                  <span className="text-white/60">/</span>
                  <span className="text-white">Contact</span>
                </div>
                <p className="text-white/90 text-lg mt-4">
                  Présentez-nous votre projet. Premier échange sous 48 heures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Formulaire + Carrières ──────────────────────────────────────── */}
      <section className="py-20 bg-[#F9FAFD]" data-testid="contact-form-section">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Formulaire (60%) */}
            <div className="w-full lg:w-3/5">
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-[#573D4E] mb-6">Discutons de votre projet</h2>
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">

                    {/* Prénom + Nom */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t('contact.firstName')} *</Label>
                        <Input
                          id="firstName" name="firstName" type="text" required
                          placeholder={t('contact.firstNamePlaceholder')}
                          value={formData.firstName} onChange={handleChange}
                          className="border-gray-300 focus:border-[#2E9013] focus:ring-[#2E9013]"
                          data-testid="contact-firstname-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contact.form.name')} *</Label>
                        <Input
                          id="name" name="name" type="text" required
                          placeholder={t('contact.form.namePlaceholder')}
                          value={formData.name} onChange={handleChange}
                          className="border-gray-300 focus:border-[#2E9013] focus:ring-[#2E9013]"
                          data-testid="contact-name-input"
                        />
                      </div>
                    </div>

                    {/* Email + Téléphone */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contact.form.email')} *</Label>
                        <Input
                          id="email" name="email" type="email" required
                          placeholder={t('contact.form.emailPlaceholder')}
                          value={formData.email} onChange={handleChange}
                          className="border-gray-300 focus:border-[#2E9013] focus:ring-[#2E9013]"
                          data-testid="contact-email-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('contact.form.phone')} <span className="text-[#6B7280] font-normal text-sm">(optionnel)</span></Label>
                        <Input
                          id="phone" name="phone" type="tel"
                          placeholder={t('contact.form.phonePlaceholder')}
                          value={formData.phone} onChange={handleChange}
                          className="border-gray-300 focus:border-[#2E9013] focus:ring-[#2E9013]"
                          data-testid="contact-phone-input"
                        />
                      </div>
                    </div>

                    {/* Organisation + Fonction */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="organisation">{t('contact.organisation')} *</Label>
                        <Input
                          id="organisation" name="organisation" type="text" required
                          placeholder={t('contact.organisationPlaceholder')}
                          value={formData.organisation} onChange={handleChange}
                          className="border-gray-300 focus:border-[#2E9013] focus:ring-[#2E9013]"
                          data-testid="contact-organisation-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fonction">{t('contact.fonction')}</Label>
                        <Input
                          id="fonction" name="fonction" type="text"
                          placeholder={t('contact.fonctionPlaceholder')}
                          value={formData.fonction} onChange={handleChange}
                          className="border-gray-300 focus:border-[#2E9013] focus:ring-[#2E9013]"
                          data-testid="contact-fonction-input"
                        />
                      </div>
                    </div>

                    {/* Sujet — select */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet de la demande *</Label>
                      <select
                        id="subject" name="subject" required
                        value={formData.subject} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#2E9013] focus:ring-1 focus:ring-[#2E9013] bg-white text-[#2B2B2B]"
                        data-testid="contact-subject-input"
                      >
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Votre message *</Label>
                      <Textarea
                        id="message" name="message" required rows={6}
                        maxLength={1500}
                        placeholder="Décrivez votre projet, vos besoins, votre calendrier..."
                        value={formData.message} onChange={handleChange}
                        className="border-gray-300 focus:border-[#2E9013] focus:ring-[#2E9013] resize-none"
                        data-testid="contact-message-input"
                      />
                      <p className="text-xs text-[#6B7280] text-right">{formData.message.length} / 1500</p>
                    </div>

                    {/* RGPD consent */}
                    <div className="flex items-start gap-3">
                      <input
                        id="rgpdConsent" name="rgpdConsent" type="checkbox" required
                        checked={formData.rgpdConsent} onChange={handleChange}
                        className="mt-1 w-4 h-4 accent-[#2E9013] flex-shrink-0"
                        data-testid="contact-rgpd-input"
                      />
                      <Label htmlFor="rgpdConsent" className="text-sm font-normal cursor-pointer">
                        J'accepte la{' '}
                        <Link to="/privacy" className="text-[#2E9013] hover:underline font-semibold">
                          Politique de Confidentialité
                        </Link>{' '}
                        *
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#2E9013] hover:bg-[#573D4E] text-white font-semibold py-6 rounded-full text-lg"
                      data-testid="contact-submit-btn"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </Button>

                    <p className="text-[#6B7280] text-xs mt-3 italic leading-relaxed">
                      En envoyant ce message, vous acceptez que vos données soient traitées par Freearcs Pharma Services pour répondre à votre demande, conformément à notre{' '}
                      <Link to="/privacy" className="text-[#2E9013] hover:underline">Politique de Confidentialité</Link>.{' '}
                      Vos données ne font l'objet d'aucune cession à des tiers à des fins commerciales.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Colonne droite (40%) */}
            <div className="w-full lg:w-2/5 flex flex-col gap-6">

              {/* Carrières */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-6 h-6 text-[#2E9013]" />
                  <h3 className="text-xl font-bold text-[#573D4E]">Carrières</h3>
                </div>
                <p className="text-[#4B5563] mb-8">
                  Adressez votre candidature à
                </p>
                <a href="mailto:contact@freearcs.com" className="text-[#2E9013] font-semibold hover:underline text-lg">
                  contact@freearcs.com
                </a>
              </div>

            </div>{/* fin colonne droite */}

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
