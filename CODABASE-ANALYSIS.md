# Analyse approfondie de la codebase — FPS Website v5

> **Projet** : Site vitrine corporatif de **Freearcs Pharma Services** (FPS), CRO française basée à Paris (50 Avenue des Champs-Élysées).
> **Fondatrice** : Nadege KAMBOU (2020)
> **Site** : `https://freearcs-pharma.com`

---

## 1. Stack technique

| Couche | Technologie | Version |
|---|---|---|
| Framework | React | 19.0.0 |
| Bundler | Vite | 5.4.21 |
| Plugin Vite | @vitejs/plugin-react | 4.7.0 |
| CSS | Tailwind CSS | 3.4.17 |
| UI Library | shadcn/ui (New York) | — |
| Animation | Framer Motion | 12.38.0 |
| Routing | react-router-dom | 7.5.1 |
| Icons | lucide-react | 0.507.0 |
| Carousel | Swiper | 12.1.4 |
| Formulaires | react-hook-form + zod | 7.56.2 / 3.24.4 |
| SEO | react-helmet-async | 3.0.0 |
| Radix UI | ~20 primitives (dialog, dropdown, accordion, tabs…) | latest |
| Utilitaire CSS | clsx + tailwind-merge (via `cn()`) | 2.1.1 / 3.2.0 |
| Linting | ESLint 9 avec plugins react/jsx-a11y/import | 9.23.0 |

> **Note** : Le projet a été migré de Create React App + Craco vers Vite. La doc (AGENTS.md) n'a pas été mise à jour et mentionne encore Craco. Les plugins `plugins/health-check/` sont des artefacts webpack inutilisés.

---

## 2. Structure des dossiers

```
fps-website-v5/
├── .claude/skills/ui-ux-pro-max/     # Skills Claude AI (design tokens, scripts)
├── .github/prompts/ui-ux-pro-max/    # Prompts GitHub Copilot
├── build/                             # Sortie de production (gitignoré)
├── plugins/health-check/              # Artefacts webpack (obsolètes)
├── public/
│   ├── assets/img/                    # Images de fond
│   ├── References/                    # Logos clients (15+ partenaires)
│   ├── *.jpg / *.png / *.webp        # Médias statiques
│   └── *.svg                          # Logo blanc SVG
├── src/
│   ├── App.jsx                        # Root : BrowserRouter + Layout + Routes
│   ├── index.jsx                      # Entry : ReactDOM.createRoot + HelmetProvider
│   ├── index.css                      # Tailwind + variables CSS (couleurs brand)
│   ├── components/
│   │   ├── ui/                        # 47 composants shadcn/ui (Radix)
│   │   ├── Header.jsx                 # Navigation sticky + dropdowns + mobile menu
│   │   ├── Footer.jsx                 # Pied de page multi-colonnes
│   │   ├── CookieBanner.jsx           # Bannière consentement RGPD/CNIL
│   │   ├── FloatingCTA.jsx            # CTA flottant animé (Framer Motion)
│   │   ├── GreenWave.jsx              # Vagues SVG décoratives (6 variantes)
│   │   ├── HeroBanner.jsx             # Hero réutilisable avec breadcrumbs
│   │   ├── LogoCarousel.jsx           # Carrousel de logos clients (Swiper)
│   │   ├── SEO.jsx                    # Balises meta + OG + Twitter Cards
│   │   ├── SchemaOrg.jsx              # Données structurées JSON-LD
│   │   └── ErrorBoundary.jsx          # Error boundary (class-based)
│   ├── context/
│   │   └── LanguageContext.jsx        # Contexte React i18n (FR/EN)
│   ├── hooks/
│   │   └── use-toast.jsx              # Hook toast shadcn/ui
│   ├── i18n/
│   │   └── translations.js            # ~1500 lignes de traductions FR/EN
│   ├── lib/
│   │   ├── utils.js                   # cn() : clsx + tailwind-merge
│   │   └── cookieConsent.js           # Gestion localStorage du consentement cookies
│   └── pages/
│       ├── HomePage.jsx               # Page d'accueil (landing)
│       ├── AboutPage.jsx              # Vision, mission, valeurs
│       ├── FounderPage.jsx            # Profil fondatrice
│       ├── ServicesPage.jsx           # 6 piliers de services
│       ├── LegalRepresentationPage.jsx # Représentation légale UE
│       ├── TherapeuticExpertisePage.jsx # Domaines thérapeutiques
│       ├── WhyChooseUsPage.jsx        # Différenciateurs concurrentiels
│       ├── ReferencesPage.jsx         # Preuve sociale (stats, logos)
│       ├── BlogPage.jsx               # Blog (articles LinkedIn)
│       ├── ContactPage.jsx            # Formulaire de contact + carrières
│       ├── LegalPage.jsx              # CGU (FR uniquement)
│       ├── PrivacyPage.jsx            # Politique de confidentialité (bilingue)
│       ├── CookiesPage.jsx            # Politique cookies (bilingue)
│       └── NotFoundPage.jsx           # Page 404
├── index.html                         # Entry HTML Vite
├── vite.config.js                     # Configuration Vite
├── tailwind.config.js                 # Configuration Tailwind
├── components.json                    # Configuration shadcn/ui
├── postcss.config.js                  # tailwindcss + autoprefixer
├── netlify.toml                       # Déploiement Netlify
├── vercel.json                        # Déploiement Vercel
└── package.json
```

---

## 3. Architecture applicative

### 3.1 Arbre de rendu

```
BrowserRouter
  └── ErrorBoundary
       └── LanguageProvider (React Context)
            └── <div className="font-nunito">
                 ├── SchemaOrg (JSON-LD)
                 ├── Suspense + LoadingFallback
                 │    └── Routes
                 │         └── Route → Layout
                 │              ├── Header (sticky, z-50)
                 │              ├── <main>
                 │              │    └── PageContent
                 │              ├── Footer (bg-mauve)
                 │              └── CookieBanner (overlay fixe)
```

### 3.2 Routing

Toutes les routes sont en **lazy loading** via `React.lazy()` + `Suspense`.

| Route | Page | Rôle |
|---|---|---|
| `/` | HomePage | Landing / conversion |
| `/about` | AboutPage | Vision, mission, valeurs |
| `/about/founder` | FounderPage | Profil fondatrice |
| `/services` | ServicesPage | 6 piliers de services |
| `/legal-representation` | LegalRepresentationPage | Représentation légale UE |
| `/therapeutic-expertise` | TherapeuticExpertisePage | Domaines thérapeutiques |
| `/why-choose-us` | WhyChooseUsPage | Pourquoi nous choisir |
| `/references` | ReferencesPage | Références et statistiques |
| `/blog` | BlogPage | Articles de blog |
| `/blog/:slug` | BlogPage | Article individuel (même composant) |
| `/contact` | ContactPage | Contact et carrières |
| `/legal` | LegalPage | CGU (FR uniquement) |
| `/privacy` | PrivacyPage | Politique de confidentialité |
| `/cookies` | CookiesPage | Politique cookies |
| `*` | NotFoundPage | 404 |

### 3.3 Gestion d'état

- **Aucune bibliothèque de state management** (pas de Redux, Zustand, etc.)
- **LanguageContext** : Contexte React maison avec `{ language, setLanguage, toggleLanguage, t() }`
- **Toast** : Pattern external store (état module + listeners)
- **Consentement cookies** : localStorage via `lib/cookieConsent.js` + événements custom
- **État local** : `useState` / `useRef` dans chaque composant

---

## 4. Pages en détail

### 4.1 HomePage (`/`)
- Hero Swiper (3 slides) avec CTA
- Section "Who We Are" avec image + texte
- Compteurs animés (statistiques clés) via Framer Motion `animate()`
- Carrousel logos clients (Swiper)
- FloatingCTA

### 4.2 AboutPage (`/about`)
- Layout checkerboard : Vision (image + texte), Mission (texte + image)
- 4 cartes de valeurs (Expertise, Qualité, Innovation, Partenariat)
- Lien vers page fondatrice

### 4.3 FounderPage (`/about/founder`)
- Hero avec photo + bio de Nadege KAMBOU
- Badges stats (années d'expérience)
- 3 cartes "convictions"
- Liste des domaines thérapeutiques

### 4.4 ServicesPage (`/services`)
- 6 piliers : Gestion de projet, Réglementaire, Contractuel/Budget, Faisabilité/Monitoring, Support site, Formation
- Contenu en accordéon
- Section "ANSM fast-track"

### 4.5 LegalRepresentationPage (`/legal-representation`)
- Cadre réglementaire (Règlement UE 536/2014)
- Promoteurs ciblés, bénéfices, régions cibles

### 4.6 TherapeuticExpertisePage (`/therapeutic-expertise`)
- Types d'études : interventionnelles, observationnelles, RWE
- Périmètres : médicaments, dispositifs, non-santé
- 8 cartes domaines avec indications détaillées

### 4.7 WhyChooseUsPage (`/why-choose-us`)
- Contexte marché, 7 cartes avantages
- Section Qualité & Conformité
- Tableau comparatif : CRO indépendante vs grande CRO

### 4.8 ReferencesPage (`/references`)
- Statistiques : 30+ projets, 65% rétention
- Carrousel logos clients (15+ logos)
- Grille types d'études
- Badge membre AFCROs

### 4.9 BlogPage (`/blog`)
- Cartes d'articles avec tags, extraits, liens LinkedIn
- Filtre par thématique
- CTA "Suivez-nous sur LinkedIn"

### 4.10 ContactPage (`/contact`)
- Formulaire multi-champs (nom, email, organisme, fonction, téléphone, sujet, message, consentement RGPD)
- État de succès après envoi
- Coordonnées + section carrières
- Pré-remplissage sujet via `useSearchParams`

### 4.11 Pages légales
- **LegalPage** : CGU en français hardcodé (9 sections)
- **PrivacyPage** : Politique confidentialité bilingue hardcodée
- **CookiesPage** : Politique cookies bilingue hardcodée

### 4.12 NotFoundPage (`*`)
- Hero basique + message 404 + lien accueil

---

## 5. Composants réutilisables

### 5.1 Layout
| Composant | Rôle |
|---|---|
| `Header.jsx` | Nav sticky, dropdowns desktop, accordéon mobile, toggle langue, CTA Contact |
| `Footer.jsx` | 4 colonnes : logo+adresse, liens rapides, services, contact+LinkedIn+langue |
| `CookieBanner.jsx` | Overlay fullscreen + blur, 3 types cookies, 3 boutons, localStorage 180j |
| `ErrorBoundary.jsx` | Capture d'erreurs React, affichage friendly + lien accueil |

### 5.2 Fonctionnels
| Composant | Rôle |
|---|---|
| `SEO.jsx` | Helmet : title, description, OG, Twitter Cards, canonical, hreflang |
| `SchemaOrg.jsx` | JSON-LD Organization + contactPoint + address |
| `HeroBanner.jsx` | Hero mauve + polygones SVG + titre + breadcrumbs |
| `GreenWave.jsx` | 6 variantes de vagues SVG décoratives (vert brand `#2E9013`) |
| `LogoCarousel.jsx` | Carrousel infini Swiper (15 logos partenaires) |
| `FloatingCTA.jsx` | Bouton flottant animé (apparition au scroll, disparition au footer) |
| `LoadingFallback.jsx` | Spinner centré (`<Loader2>`) |

### 5.3 shadcn/ui (47 composants dans `src/components/ui/`)
Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toaster, Toggle, ToggleGroup, Tooltip.

---

## 6. Internationalisation (i18n)

- **Approche** : Contexte React maison (`LanguageContext`), **aucune librairie externe**
- **Fichier** : `src/i18n/translations.js` (~1500 lignes, bilingue FR/EN)
- **Stockage** : `localStorage` clé `fps-language`
- **Défaut** : Français (`fr`)
- **API** : `const { t, language, toggleLanguage } = useLanguage()` → `t('home.heroTitle')`
- **Couverture** : Navigation, accueil, about, founder, services, legalRep, therapeuticExpertise, whyChooseUs, references, blog, contact, footer, 404
- **Problème** : NotFoundPage a des traductions **hardcodées** en français (n'utilise pas le contexte)

---

## 7. Système de design et styling

### 7.1 Variables CSS (HSL dans `:root`)

| Variable | Valeur HSL | Couleur | Usage |
|---|---|---|---|
| `--primary` | `106 81% 32%` | Vert `#2E9013` | Brand, boutons, accents |
| `--secondary` | `330 20% 29%` | Mauve `#573D4E` | Heroes, sections, footer |
| `--accent` | `40 92% 52%` | Ambre `#F5A617` | Highlights, CTA |
| `--destructive` | `359 79% 48%` | Rouge `#D81C20` | Erreurs |
| `--background` | `60 6% 97%` | Blanc cassé `#F8F8F6` | Fonds |
| `--radius` | `0.75rem` | — | Bordures arrondies |

### 7.2 Polices

- `font-raleway` et `font-nunito` déclarées dans Tailwind
- Mappées vers `Avenir Next` → `Segoe UI` → system-ui
- **Raleway et Nunito ne sont pas importées** → résolution vers polices système

### 7.3 Incohérences styling

- Utilisation de **couleurs hexadécimales hardcodées** dans le JSX (`text-[#573D4E]`, `bg-[#2E9013]`) au lieu des variables CSS sémantiques
- `text-[#4B5563]` (gray-600) utilisé pour le body text au lieu de `text-muted-foreground`
- Fond des pages internes : `bg-[#F9FAFD]` (bleu-gris très clair) au lieu d'une variable CSS

---

## 8. Configuration et build

### 8.1 Points clés

- **Entry point** : `index.html` à la racine (Vite standard)
- **Build** : `vite build` → sortie dans `build/`
- **Dev** : port 3000, auto-open
- **Alias** : `@/` → `src/` (configuré dans `vite.config.js` + `jsconfig.json`)
- **Package manager** : `package.json` déclare `yarn@1.22.22` mais le projet utilise npm (pas de `yarn.lock`, `package-lock.json` présent)
- **Déploiement** : Netlify (`netlify.toml`) + Vercel (`vercel.json`) avec fallback SPA
- **Lang HTML** : `lang="fr"` hardcodé dans `index.html` (pas dynamique)

### 8.2 Scripts npm

| Script | Commande |
|---|---|
| `npm run dev` | `vite --port 3000 --open` |
| `npm run build` | `vite build` |
| `npm run preview` | `vite preview` |
| `npm run lint` | `eslint .` |

---

## 9. Patrons et conventions

### 9.1 Ce qui est bien fait
- **Lazy loading** systématique des pages (code splitting)
- **Framer Motion** pour animations scroll (`whileInView`, `viewport: { once: true }`)
- **Pattern stagger** : `staggerContainer` / `staggerItem` réutilisable
- **Composants shadcn/ui** standards : `forwardRef`, `displayName`, `cn()`, `cva()`
- **Attributs `data-testid`** présents pour les tests
- **Système d'événements custom** pour le consentement cookies (`fps-cookie-consent-updated`, `fps-open-cookie-preferences`)

### 9.2 Points d'attention
- **README.md** : encore le README par défaut de CRA (obsolète)
- **AGENTS.md** : mentionne Craco/webpack mais le projet utilise Vite
- **Formulaire contact** : la soumission ne fait qu'un `console.log` (pas de backend)
- **Blog** : articles hardcodés liant vers LinkedIn (pas de CMS)
- **Pas de tests** : aucun fichier de test trouvé
- **Contenu légal hardcodé** : Privacy, Cookies, Legal n'utilisent pas le système i18n

---

## 10. Recommandations

### Priorité haute
1. Mettre à jour `AGENTS.md` pour refléter Vite (supprimer références Craco/webpack)
2. Backend fonctionnel pour le formulaire de contact
3. Importer les polices Raleway/Nunito ou supprimer les classes inutilisées

### Priorité moyenne
4. Centraliser les couleurs via les variables CSS Tailwind plutôt que hexadécimales hardcodées
5. Rendre la 404 page compatible i18n
6. Rendre `lang` dans `index.html` dynamique
7. Nettoyer les artefacts webpack (`plugins/health-check/`)

### Priorité basse
8. Migrer le contenu légal vers le système i18n
9. Ajouter des tests (au moins smoke/e2e)
10. Uniformiser `packageManager` (npm uniquement)
11. Ajouter un vrai README

---

*Document généré le 8 juin 2026 — Analyse statique de la codebase.*
