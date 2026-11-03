# UBWENZI — Architecture générale et modulaire V1

**Statut :** BASELINE PROPOSÉE — validation formelle requise avant implémentation métier  
**Produit :** UBWENZI  
**Marché initial :** Lagos, Nigeria  
**Audience :** adultes 18+  
**Stratégie de lancement :** waitlist → closed beta → public launch

## 1. Principes non négociables

1. Architecture internationale dès le départ : pays, villes, langues, devises, fuseaux horaires, règles locales et fournisseurs configurables.
2. Monolithe modulaire avec frontières métier strictes ; pas de microservices prématurés.
3. Séparation frontend, backend, données, fichiers privés, tâches asynchrones et intégrations externes.
4. Le backend est l'autorité métier : aucune règle sensible ne dépend uniquement du navigateur.
5. Sécurité, confidentialité, consentement, modération et audit sont transversaux et intégrés dès le socle.
6. Les fonctionnalités de sécurité ne sont jamais réservées aux abonnés payants.
7. Une préinscription n'est pas un compte membre : cycle de vie et données séparés.
8. Toute évolution de schéma passe par une migration versionnée, revue et testée.
9. Chaque module possède ses responsabilités, contrats, permissions, événements et tests.
10. Le visuel approuvé est une référence produit stable ; les changements d'architecture ne doivent pas provoquer une refonte graphique non demandée.

## 2. Architecture technique cible

### Frontend
- React + TypeScript + Vite.
- TanStack Router pour les routes.
- TanStack Query pour les appels API et le cache serveur.
- Formulaires validés avec schémas partagés ou contrats API versionnés.
- Design system UBWENZI centralisé : tokens, composants, layouts, thèmes, responsive.
- i18n anglais/français dès la fondation.
- Surfaces logiquement séparées : public/marketing, waitlist, member app, platform admin, trust & safety admin.
- Les surfaces partagent composants et client API, mais ont routes, layouts et permissions explicites.

### Backend
- Node.js 22+ et TypeScript.
- Monolithe modulaire, API REST versionnée /api/v1.
- Validation des entrées à la frontière HTTP.
- Services métier indépendants des contrôleurs et fournisseurs.
- OpenAPI comme contrat documenté.
- Authentification déléguée à Supabase Auth derrière une abstraction UBWENZI ; autorisations et rôles métier gérés par UBWENZI.
- Tâches asynchrones via outbox et workers.
- Adaptateurs pour email, SMS, paiements, stockage, analytics et vérification.

### Données et infrastructure
- PostgreSQL managé via Supabase, projet et base indépendants.
- Supabase Auth pour l'identité technique, sans confondre identité Auth et profil métier.
- Supabase Storage (ou stockage S3 compatible) avec buckets privés et URLs signées.
- Supabase Realtime initialement pour les cas d'usage compatibles, derrière une abstraction.
- Redis/queue externe uniquement quand la charge et les besoins le justifient.
- Hébergement frontend, API et workers séparés logiquement.
- Cloudflare pour DNS/CDN/protection, GitHub Actions pour CI.
- Aucun environnement local ne doit exiger Docker ; le développement peut utiliser les services Supabase distants et une base de test isolée.

## 3. Domaines métier (bounded contexts)

### D00 — Platform Foundation
Configuration, pays, villes, langues, devises, fuseaux horaires, paramètres, feature flags, environnements, référentiels et règles de localisation.

### D01 — Identity & Authentication
Identités, authentification, sessions, appareils, vérification email/téléphone, récupération, fermeture de compte et sécurité des sessions.

### D02 — User & Profile
Profil membre, photos, biographies, intérêts, langues, préférences de visibilité et cycle de vie du profil.

### D03 — Preferences & Discovery Settings
Intentions relationnelles, critères de recherche, filtres, zones générales et préférences de découverte.

### D04 — Discovery Engine
Éligibilité, recommandations, classement, exclusions, impressions, limites et instrumentation du moteur de découverte.

### D05 — Likes, Passes & Matches
Likes, passes, super likes, matches, événements de match et règles d'interaction.

### D06 — Messaging & Conversations
Conversations, participants, messages, pièces jointes, réactions, accusés de réception, blocage d'envoi et signalements associés.

### D07 — Trust & Verification
Vérification de profil, preuves, contrôles, badges, revue humaine, prestataires de vérification et historique. Les documents sensibles sont privés et séparés des médias publics.

### D08 — Safety & Moderation
Signalements, blocages, dossiers de modération, actions, appels, règles communautaires, anti-abus, prévention des arnaques et procédures d'escalade.

### D09 — Premium & Monetization
Plans, abonnements, droits, limites, boosts, crédits, super likes payants, renouvellements, expirations et entitlements.

### D10 — Payments & Billing
Abstraction fournisseur, intentions de paiement, transactions, webhooks, rapprochement, remboursements, reçus et historique. Aucun fournisseur ni moyen de paiement ne doit être codé en dur dans le domaine métier.

### D11 — Events & Partners
Événements, lieux, partenaires, billets, participants et offres. Module préparé architecturalement, activation après validation produit.

### D12 — Platform Administration & Analytics
Utilisateurs internes, rôles, permissions, gestion des membres, paramètres, supervision, rapports, statistiques agrégées et audit administratif.

### D13 — Waitlist & Acquisition
Préinscriptions, vérifications, consentements, campagnes, attribution, referrals, invitations bêta, désinscription et statistiques d'acquisition. Ce domaine reste séparé de D01/D02 jusqu'à conversion contrôlée en compte membre.

### D14 — Notifications & Communications
Préférences, modèles, email, SMS, push, in-app, files d'envoi, retries, délivrabilité et désabonnements par finalité.

## 4. Socle transverse obligatoire

- RBAC : rôles et permissions granulaires, contrôlés côté serveur.
- Contexte pays/juridiction, sans supposer qu'un utilisateur appartient à un seul pays.
- Audit trail : acteur, action, cible, date, contexte et résultat pour les opérations sensibles.
- Consent management : texte/version, finalité, horodatage, preuve et retrait.
- Privacy : minimisation, export, rectification, suppression, rétention et contrôle d'accès.
- Observability : logs structurés, métriques, traces, correlation/request IDs et alertes.
- Rate limiting, anti-bot, anti-spam, détection de doublons et prévention de fraude.
- Feature flags et configuration par environnement/pays.
- Gestion d'erreurs normalisée et idempotence pour les opérations critiques.
- Outbox pattern pour publier les événements après commit DB.
- Gestion des secrets et rotation des clés.

## 5. Rôles administratifs de départ

- SUPER_ADMIN
- PLATFORM_ADMIN
- TRUST_SAFETY_ADMIN
- MODERATOR
- CUSTOMER_SUPPORT
- FINANCE_ADMIN
- ANALYST
- MEMBER

Les rôles sont des ensembles de permissions ; les contrôles tiennent aussi compte du périmètre, du pays, de la sensibilité des données et du besoin d'accès. Aucun accès admin ne doit être accordé par simple présence d'un rôle frontend.

## 6. Organisation cible du dépôt

~~~text
ubwenzi/
  apps/
    web/                         # React public, member and admin surfaces
    api/                         # Node.js HTTP API
    worker/                      # background jobs
  packages/
    contracts/                   # API DTOs, schemas, OpenAPI types
    config/                      # shared lint, TS and runtime config
    design-system/               # UBWENZI visual tokens and components
    i18n/                        # English/French dictionaries
    observability/               # logging, metrics, tracing
  backend/
    src/
      platform/                  # HTTP, auth context, errors, guards
      modules/
        foundation/
        identity/
        profiles/
        preferences/
        discovery/
        matching/
        messaging/
        trust/
        safety/
        monetization/
        payments/
        events/
        administration/
        waitlist/
        notifications/
      infrastructure/
        database/
        storage/
        email/
        sms/
        payments/
        realtime/
        queue/
  frontend/
    src/
      app/
      surfaces/
        public/
        waitlist/
        member/
        admin/
        trust-safety/
      modules/
      shared/
  supabase/
    migrations/
    seed/
    tests/
  docs/
    architecture/
    adr/
    product/
    security/
    operations/
  tests/
    integration/
    e2e/
~~~

Cette structure est une cible logique, pas une obligation de créer des dossiers vides. Avant de déplacer le frontend actuel, structure, outillage et workspace doivent être décidés puis migrés une seule fois.

## 7. Contrat obligatoire de chaque module backend

Chaque module expose :
- domain/ — entités, value objects, règles métier, événements de domaine.
- application/ — cas d'usage, commandes, requêtes et ports.
- infrastructure/ — repositories et adaptateurs fournisseurs.
- http/ — routes, contrôleurs, validation et mapping des réponses.
- policies/ — permissions et règles d'accès.
- tests/ — tests unitaires et intégration du module.

Règles :
- Un module ne lit pas directement les tables d'un autre module.
- Les interactions intermodules passent par des ports applicatifs, contrats publics ou événements.
- Le code partagé est limité aux primitives réellement génériques.
- Aucune dépendance circulaire entre modules.
- La propriété des données est attribuée par module, même avec une seule base PostgreSQL.
- Les workflows intermodules critiques sont des cas d'usage explicites ou des sagas, pas des effets de bord cachés.

## 8. Architecture des données

- PostgreSQL est la source de vérité transactionnelle.
- UUID comme identifiants principaux ; timestamps stockés en UTC.
- Pays, locale, devise et fuseau horaire sont des référentiels explicites.
- Montants en unités mineures entières ou décimaux exacts avec devise ; jamais en virgule flottante.
- Contraintes SQL en complément de la validation applicative.
- RLS en défense en profondeur, jamais en remplacement de l'autorisation backend.
- Documents privés et médias publics utilisent des politiques de stockage séparées.
- Migrations revues et testées sur bases jetables ; environnements partagés protégés.
- Aucune migration destructive en production sans sauvegarde, approbation et plan de récupération.

Zones de données initiales : configuration plateforme, identité, waitlist et consentements, profils, préférences, découverte, matching, messagerie, vérification, modération, abonnements, paiements, notifications, administration, audit, événements.

## 9. API et événements

- REST avec base /api/v1.
- Pagination, filtres, tri et enveloppe d'erreur cohérents.
- Clés d'idempotence pour paiements, invitations et opérations rejouables.
- Webhooks signés, protection contre rejeu et déduplication.
- OpenAPI revu avec le frontend avant implémentation des endpoints.
- Événements métier distincts des événements d'intégration.
- Outbox transactionnelle pour les livraisons asynchrones critiques.

## 10. Environnements et livraison

Environnements requis :
1. LOCAL
2. TEST / CI
3. STAGING
4. PRODUCTION

Règles :
- Projets Supabase et secrets distincts par environnement.
- Aucun secret de production dans les fichiers locaux ou logs CI.
- CI : install, lint, typecheck, tests unitaires, contrôles migrations, build, tests d'intégration.
- Tests smoke en staging et approbation avant production.
- Feature flags pour les ouvertures progressives waitlist/bêta.
- Sauvegardes, tests de restauration et procédure incident avant lancement public.

## 11. Stratégie de tests

- Unitaires sur règles métier et cas d'usage.
- Intégration de modules sur PostgreSQL jetable.
- API : authentification, autorisation, validation et limites de débit.
- Tests RLS et isolation entre utilisateurs.
- Tests de contrat API et adaptateurs fournisseurs.
- E2E : waitlist, vérification, invitation, onboarding, découverte, matching, messagerie, blocage/signalement et paiement.
- Sécurité : IDOR, élévation de privilèges, rejeu, falsification webhook, spam et fuite de données.
- Performance avant les seuils de montée en charge.

## 12. Séquence d'implémentation

### A0 — Architecture et fondations d'ingénierie
Valider carte des modules, règles de dépendance, structure dépôt, stratégie environnements, conventions, API, ADR et CI.

### A1 — Platform foundation
Configuration, migrations, logs, erreurs, contexte auth, RBAC/policies, audit, consentement, rate limiting, OpenAPI et health checks.

### A2 — Préinscription publique
Landing page respectant le visuel validé, API waitlist, consentements, confirmation email, protections anti-abus, désinscription/suppression, administration et statistiques agrégées.

### A3 — Identité membre et profil
Conversion contrôlée des candidats invités vers identité membre et cycle de vie du profil.

### A4 — Expérience relationnelle centrale
Préférences, découverte, likes, matches, conversations et messagerie.

### A5 — Confiance, sécurité et modération
Vérification, signalements, blocages, gestion des dossiers, appels et tableaux de bord. Les protections sont obligatoires avant la bêta fermée.

### A6 — Monétisation et paiements
Plans, droits, adaptateurs fournisseurs, rapprochement, remboursements et fonctions premium.

### A7 — Administration et analytics complets
Administration opérationnelle, permissions, audit, analytics et support.

### A8 — Événements, partenaires et expansion
Activation lorsque la demande et la maturité opérationnelle le justifient.

## 13. Décisions à valider explicitement

- Confirmer le monolithe modulaire comme architecture de lancement.
- Confirmer des projets Supabase indépendants pour LOCAL/TEST/STAGING/PRODUCTION.
- Confirmer Supabase Auth derrière une abstraction identité UBWENZI.
- Confirmer le monorepo cible et le gestionnaire de paquets/workspaces.
- Décider si le frontend Vite actuel migre immédiatement vers apps/web ou après validation de la base visuelle.
- Choisir fournisseur email et stratégie de domaine expéditeur.
- Choisir stockage et modèle de buckets privés.
- Choisir l'approche workers/queue du lancement.
- Confirmer le modèle de référentiels pays/villes et localisation.
- Confirmer les règles de conservation et revue juridique/privacy au Nigeria.

Aucun fournisseur, schéma de production ou choix d'infrastructure irréversible n'est LOCKÉ par cette proposition seule.

## 14. Critères architecture-ready

L'architecture est prête à être implémentée lorsque :
- les frontières et responsables de modules sont approuvés ;
- les règles de dépendance et contrats sont documentés ;
- RBAC et sécurité transverse sont approuvés ;
- stratégie environnements et bases est approuvée ;
- migrations et stratégie de tests sont éprouvées ;
- structure dépôt et contrôles CI sont décidés ;
- modèle waitlist et flux privacy sont revus ;
- le visuel validé est protégé et les responsabilités d'implémentation sont claires.


## 15. Structure professionnelle détaillée du monorepo (référence cible)

Cette section remplace toute ambiguïté entre les anciens noms frontend/backend et le modèle apps. Il n'existe qu'une seule convention : les applications exécutables vivent dans `apps/`, les bibliothèques partagées dans `packages/`. Aucun second dossier `frontend/` ou `backend/` à la racine.

```text
ubwenzi/
├── apps/
│   ├── web/                              # Application React : public, waitlist, membre, administration
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/                      # bootstrap, providers, router, guards, layouts
│   │   │   ├── surfaces/
│   │   │   │   ├── marketing/            # landing, pages publiques, contenu
│   │   │   │   ├── waitlist/             # parcours de préinscription
│   │   │   │   ├── member/               # espace membre
│   │   │   │   ├── platform-admin/       # administration générale
│   │   │   │   └── trust-safety-admin/   # modération et sécurité
│   │   │   ├── modules/                  # composition UI par domaine métier
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── layouts/
│   │   │   │   ├── lib/
│   │   │   │   └── styles/
│   │   │   ├── assets/
│   │   │   └── tests/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   ├── api/                              # API HTTP Node.js / TypeScript
│   │   ├── src/
│   │   │   ├── bootstrap/                # composition root, démarrage, configuration
│   │   │   ├── platform/                 # HTTP, middleware, auth context, errors, guards
│   │   │   ├── modules/
│   │   │   │   ├── foundation/
│   │   │   │   ├── identity/
│   │   │   │   ├── profiles/
│   │   │   │   ├── preferences/
│   │   │   │   ├── discovery/
│   │   │   │   ├── matching/
│   │   │   │   ├── messaging/
│   │   │   │   ├── trust/
│   │   │   │   ├── safety/
│   │   │   │   ├── monetization/
│   │   │   │   ├── payments/
│   │   │   │   ├── events/
│   │   │   │   ├── administration/
│   │   │   │   ├── waitlist/
│   │   │   │   └── notifications/
│   │   │   ├── infrastructure/           # implémentations techniques et adaptateurs
│   │   │   │   ├── database/
│   │   │   │   ├── auth/
│   │   │   │   ├── storage/
│   │   │   │   ├── email/
│   │   │   │   ├── sms/
│   │   │   │   ├── payments/
│   │   │   │   ├── realtime/
│   │   │   │   └── queue/
│   │   │   └── main.ts
│   │   ├── tests/
│   │   │   ├── integration/
│   │   │   ├── contract/
│   │   │   └── security/
│   │   └── package.json
│   │
│   └── worker/                           # Tâches asynchrones, sans routes publiques
│       ├── src/
│       │   ├── bootstrap/
│       │   ├── jobs/
│       │   │   ├── email-delivery/
│       │   │   ├── notification-delivery/
│       │   │   ├── media-processing/
│       │   │   ├── moderation/
│       │   │   ├── payment-reconciliation/
│       │   │   └── subscription-lifecycle/
│       │   ├── consumers/
│       │   └── main.ts
│       └── package.json
│
├── packages/
│   ├── api-contracts/                    # OpenAPI, DTOs, erreurs, pagination
│   ├── validation/                       # Schémas de validation partagés
│   ├── design-system/                    # tokens et composants UBWENZI
│   ├── i18n/                             # anglais/français
│   ├── api-client/                       # client HTTP typé pour le frontend
│   ├── permissions/                      # identifiants de permissions et types partagés
│   ├── config/                           # configurations TypeScript, lint, test
│   └── observability/                    # conventions de logs et traces
│
├── supabase/
│   ├── migrations/                       # migrations SQL versionnées
│   ├── seed/                             # référentiels et données non sensibles
│   ├── functions/                        # uniquement fonctions Edge justifiées
│   └── tests/                            # tests SQL/RLS
│
├── docs/
│   ├── architecture/
│   ├── adr/                              # Architecture Decision Records
│   ├── product/
│   ├── api/
│   ├── security/
│   ├── privacy/
│   └── operations/
│
├── tests/
│   ├── e2e/
│   ├── performance/
│   └── fixtures/
│
├── .github/
│   └── workflows/
├── scripts/
├── .env.example
├── .gitignore
├── package.json                          # workspace racine
├── package-lock.json                     # lockfile unique
├── tsconfig.base.json
└── README.md
```

### 15.1 Structure interne obligatoire d'un module backend

Chaque bounded context dans `apps/api/src/modules/<module>/` suit cette structure, adaptée au besoin réel du domaine :

```text
waitlist/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── events/
│   ├── policies/
│   └── errors/
├── application/
│   ├── commands/
│   ├── queries/
│   ├── use-cases/
│   ├── ports/
│   └── dto/
├── infrastructure/
│   ├── persistence/
│   └── adapters/
├── http/
│   ├── routes/
│   ├── controllers/
│   ├── validators/
│   └── presenters/
├── tests/
│   ├── unit/
│   └── integration/
└── index.ts
```

Les dossiers ne doivent pas être créés artificiellement lorsqu'ils sont vides. En revanche, les frontières domain/application/infrastructure/http doivent être respectées dès qu'un module devient métier.

### 15.2 Structure interne d'un module frontend

```text
waitlist/
├── api/                 # appels API spécifiques au domaine
├── components/          # composants propres au domaine
├── hooks/               # hooks d'orchestration UI
├── pages/               # pages et écrans
├── schemas/             # validation côté interface
├── types/               # types UI locaux
├── utils/               # fonctions de présentation locales
└── index.ts             # surface publique du module
```

Le frontend ne contient aucune règle d'autorisation faisant autorité. Les guards améliorent l'expérience, mais chaque endpoint vérifie réellement l'identité, les permissions et le périmètre d'accès côté backend.

### 15.3 Workspaces et outillage

- npm workspaces au niveau racine, avec un seul lockfile.
- TypeScript strict et configurations partagées.
- Scripts racine uniformes : `dev`, `build`, `typecheck`, `lint`, `test`, `test:integration`.
- Chaque application garde son propre `package.json` et ses commandes ciblées.
- Dépendances partagées uniquement si elles ont une vraie raison d'être partagées.
- Les packages frontend ne doivent pas importer le code serveur ; les packages backend ne doivent pas dépendre des composants React.
- Les secrets restent dans les environnements d'exécution ; seuls les exemples de variables sont versionnés.

### 15.4 Règles de migration du dépôt actuel

Le frontend Vite créé à la racine pendant l'initialisation est une fondation provisoire. Il sera déplacé une seule fois vers `apps/web` après approbation de cette structure. Le déplacement sera réalisé dans un commit dédié, avec mise à jour des scripts, chemins TypeScript, Vite et CI. Aucun backend métier ne sera ajouté à la racine sous un second modèle.

