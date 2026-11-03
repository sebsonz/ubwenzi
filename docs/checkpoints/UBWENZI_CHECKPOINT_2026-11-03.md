# UBWENZI — CHECKPOINT MAÎTRE DE CONTINUITÉ
**Date de référence :** 2026-11-03  
**Dépôt :** https://github.com/sebsonz/ubwenzi  
**Branche de documentation :** `docs/ubwenzi-master-checkpoint-2026-11-03`  
**Statut :** checkpoint de reprise — ne vaut ni validation juridique, ni validation de sécurité, ni autorisation de fusion.

## 1. Vision produit
UBWENZI est une plateforme internationale de rencontres et de découverte sociale destinée exclusivement aux adultes (18+), orientée vers les relations sérieuses, l'amitié et les rencontres intentionnelles. Sa différenciation recherchée est la confiance avant le matching (« Trust before matching »), avec confidentialité, sécurité et modération intégrées au produit, jamais réservées aux abonnés payants.

Promesse de marque : **« Des rencontres authentiques, des liens qui comptent. »**  
Signature anglaise : **« Real connections. Meaningful relationships. »**  
Marché initial : Lagos, Nigeria. Anglais prioritaire au lancement, français également pris en charge. Architecture multi-pays dès le départ. Séquence de lancement : WAITLIST → CLOSED BETA → PUBLIC LAUNCH.

## 2. Règles de pilotage
- Les décisions produit majeures restent soumises à l'approbation du propriétaire du projet.
- Distinguer systématiquement : validé, proposé, implémenté, testé, déployé, à décider.
- Rechercher et documenter avant de demander des choix ; ne pas imposer de questionnaire séquentiel inutile.
- Ne pas refaire les visuels approuvés. Les changements techniques ne doivent pas provoquer de refonte.
- Ne pas présenter une maquette comme une fonctionnalité opérationnelle.
- Ne pas inventer de profils, de vérifications, de paiements, d'utilisateurs ou de résultats.
- Aucun merge vers `main`, push destructif, déploiement, migration Supabase ou modification de données partagées sans autorisation explicite.
- Ne pas appliquer la branche D07 incomplète ni son ancienne migration Messaging.
- Le développement local n'exige pas Docker ; les environnements Supabase doivent être isolés.

## 3. Identité, marché et expérience
- Adultes 18+ uniquement.
- Lagos comme marché de lancement et de validation de densité.
- Anglais par défaut, français disponible.
- Préparation multi-pays : pays, villes, langues, devises, fuseaux horaires, juridictions, règles et prestataires configurables.
- Parcours cœur : waitlist → invitation → création/activation du compte membre → profil → préférences → découverte → Like/Pass → Match → conversation → rencontre réelle → rétention.
- Croissance progressive : waitlist, bêta fermée, lancement public à Lagos ; Abuja, Accra, Abidjan et autres marchés seulement après validation des indicateurs.
- Vérification progressive ; pas de collecte de pièce d'identité au stade waitlist.
- Les protections de sécurité, blocage et signalement restent gratuites.

## 4. Marque et design — références protégées
- Mockup maître validé : `UBW-UI-REF-001`.
- Identité blush/rose/peach/plum, actions fuchsia, logo cœur, titres Manrope, interface Inter.
- Système visuel DS-01 : 16 blocs (palette, typographie, boutons, inputs, cartes, tables, badges, sidebar, header, dashboard, modals, notifications, empty/loading states, responsive, stratégie clair/sombre).
- DS-02 : surfaces Public Site + Waitlist, Web Member, Android/iOS, Admin + Trust & Safety, Partner Portal, Release Center.
- Le site public doit préserver le visuel approuvé. Les illustrations CSS temporaires ne sont pas les visuels finaux ; les photos doivent être licenciées et approuvées.
- CTA pré-lancement : « S'inscrire » vers waitlist ; « Se connecter » seulement quand l'accès membre est ouvert.
- Ne pas modifier l'identité ou la composition sans accord.

## 5. Architecture validée
### 5.1 Principes
- Monolithe modulaire, pas de microservices prématurés.
- Backend = autorité métier et d'autorisation.
- PostgreSQL par environnement, schémas par domaine, migrations versionnées.
- Supabase Auth derrière une abstraction Identity UBWENZI ; autorisations métier propres à UBWENZI.
- RLS en défense en profondeur, jamais en remplacement des contrôles backend.
- API REST versionnée `/api/v1`, contrats OpenAPI, validation, pagination, permissions, idempotence.
- Worker séparé pour tâches asynchrones ; Outbox transactionnelle ; consommateurs idempotents, retry et DLQ.
- Stockage public, médias privés et preuves de vérification séparés.
- LOCAL, TEST/CI, STAGING, PRODUCTION isolés.
- Node.js 22.x, TypeScript strict, npm workspaces et Nx.
- CI/CD GitHub Actions ; approbation avant production ; secrets hors Git.
- Environnements locaux sans Docker obligatoire.

### 5.2 Organisation physique — ADR-0004
La convention physique retenue est backend/frontend, sans revenir à `apps/*` :
- `backend/api` : NestJS + Fastify, API modulaire.
- `backend/worker` : tâches asynchrones et Outbox.
- `frontend/web` : React + TypeScript + Vite ; surfaces Public, Waitlist, Member, Platform Admin, Trust & Safety, Partner.
- `frontend/mobile` : React Native + Expo, une base Android/iOS.
- `frontend/shared` : partage Web/Mobile si sans dépendance circulaire.
- `packages/*` : api-contracts, api-client, validation, design-system, i18n, permissions, config, observability.
- `supabase/{migrations,seed,functions,tests}`, `tests/*`, `docs/*`, `tools`, `scripts`, `releases`.
- Les APK/AAB/IPA compilés ne sont pas commités.
- ADR-0004 adapte uniquement les chemins physiques ; les domaines D00-D16 et les frontières métier restent inchangés.

### 5.3 Domaines métier de référence — ARCH-02
D00 Platform Foundation  
D01 Identity & Access  
D02 Waitlist & Acquisition  
D03 Members & Profiles  
D04 Preferences  
D05 Discovery Engine  
D06 Matching  
D07 Messaging  
D08 Trust & Verification  
D09 Safety & Moderation  
D10 Subscriptions & Entitlements  
D11 Payments & Billing  
D12 Notifications  
D13 Platform Administration  
D14 Analytics & Experimentation  
D15 Events & Partners  
D16 Media & Content

Les domaines possèdent leurs données et contrats. Pas de mutation directe des tables d'un autre domaine. Les interactions passent par interfaces applicatives, contrats ou événements.

### 5.4 Décisions transverses ARCH-01 à ARCH-09
- ARCH-01 : architecture technique et monorepo ; modular monolith.
- ARCH-02 : 17 domaines D00-D16.
- ARCH-03 : données, PostgreSQL, schémas par domaine, RLS, Outbox, stockage privé, migrations et restauration.
- ARCH-04 : MFA obligatoire pour administrateurs, permissions granulaires et scopes, vérification progressive, chiffrement, double approbation des opérations critiques, OWASP ASVS 5.0 niveau 2 comme cible initiale.
- ARCH-05 : API REST/OpenAPI, événements versionnés, Outbox, Worker, retries/DLQ, intégrations abstraites, realtime protégé.
- ARCH-06 : six livrables/surfaces : Web Public, Web Member, Mobile Android/iOS, Web Admin, Partner Portal, Release Center dans Admin.
- ARCH-07 : environnements, déploiements, sauvegardes, monitoring, rollback, objectifs RPO 15 min/RTO 4 h à éprouver.
- ARCH-08 : pyramide de tests, PostgreSQL réel, tests RLS, couverture métier critique cible ≥80 %, WCAG 2.2 AA, performance, qualité gates, bêta et readiness.
- ARCH-09 : freemium, catalogue indépendant des applications, tarifs configurables par marché/devise, D10 distinct de D11, paiements provider-agnostic, sécurité gratuite, politiques Apple/Google Billing à respecter.
- ARCH-10 : Master Consolidation v0.1 est EN REVUE, NON VERROUILLÉ ; ne pas le déclarer approuvé.

## 6. Produit : domaines et exigences essentielles
- D00 : paramètres, marchés, pays/villes, langues, devises, fuseaux, feature flags, statuts, version et maintenance.
- D01 : inscription et connexion email + téléphone prévues au lancement, vérifications, récupération, sessions/appareils, MFA, social auth, linking sécurisé ; aucune fusion automatique sur simple égalité d'email.
- D02 : waitlist, acquisition, campagnes, cohortes, invitations, referrals, consentements, désinscription et analytics.
- D03 : profils, photos modérées avant publication, biographies, intérêts, langues, visibilité et cycle de vie.
- D04 : intentions relationnelles et critères pondérés ; critères sensibles facultatifs, consentement explicite ; inconnu/non vérifié n'est pas automatiquement incompatible.
- D05 : découverte hybride ; compatibilité, qualité de profil, diversité et pertinence ; équité des nouveaux membres ; pas de formule de classement définitive validée.
- D06 : Like/Pass, Match réciproque et demandes selon le mode ; un refus ou absence de réponse ne crée pas de Match ; blocage/signalement gratuits.
- D07 : conversations, messages, realtime, livraison, médias, chiffrement, synchronisation multi-appareils, confidentialité, anti-abus, signalements, opérations et analytics ; spécification en cours, choix E2EE non verrouillé.
- D08 : vérification progressive, preuves privées, revue humaine, prestataires et historique.
- D09 : signalements, blocages, dossiers, modération, appels, anti-arnaque, escalade et règles communautaires.
- D10 : plans, abonnements, entitlements, limites, crédits/boosts éventuels ; aucune sécurité paywall.
- D11 : paiements, webhooks signés, rapprochement, remboursements, reçus ; Paystack/Flutterwave étudiés pour Nigeria mais aucun fournisseur sélectionné.
- D12 : email, SMS, push, in-app, préférences, modèles, délivrabilité, retries, désabonnements.
- D13 : administration, rôles, permissions, paramètres, opérations, supervision et audit.
- D14 : analytics agrégées, expérimentation et métriques.
- D15 : événements, lieux, partenaires et offres ; activation après validation de maturité.
- D16 : médias, contenus, fichiers et politiques de stockage.

## 7. APP-01 Waitlist — règles approuvées
- Cohortes ; pas de position individuelle publique.
- Formulaire progressif.
- Referral tracking au lancement, sans récompense.
- FR/EN.
- Déclaration de majorité 18+ à l'inscription waitlist ; vérification plus forte ensuite ; aucune pièce d'identité au stade waitlist.
- Email vérifié avant confirmation définitive : EMAIL_PENDING puis WAITLIST_CONFIRMED et attribution de cohorte.
- Attribution automatique ; correction manuelle possible avec audit (ancienne/nouvelle cohorte, acteur, horodatage, motif).
- Champs initiaux : email, pays, ville, déclaration 18+, langue ; détails profil plus tard.
- Consentement marketing distinct et facultatif.
- Ne pas révéler à un tiers si un email existe déjà.
- Cohorte pleine : aucune surcapacité ; cohorte ultérieure ou non affectée.
- Referral après vérification ; empêcher doublons, auto-parrainage et abus.
- Tous textes, pages, emails, notifications, admin et légal en FR/EN.
- Traductions : DRAFT, IN_REVIEW, PUBLISHED, MISSING.
- Dimensions de cycle de vie séparées : vérification email, demande, affectation cohorte, invitation, referral, privacy request, consentement marketing.
- Les écrans waitlist actuels sont visuels uniquement : le formulaire ne persiste pas de données.

### Administration Waitlist
Écrans : Dashboard, Candidates, Candidate Profile, Cohorts, Assignments, Invitations, Referrals, Campaigns, Notifications, Exports, Settings.
Rôles : SUPER_ADMIN, PLATFORM_ADMIN, ACQUISITION_MANAGER, CAMPAIGN_MANAGER, CUSTOMER_SUPPORT, PRIVACY_OFFICER, ANALYST, AUDITOR.
Permissions granulaires, scopes, contrôle serveur, attribution/retrait individuels et historique ; pas d'auto-élévation ; MFA admin ; opérations sensibles auditées.
Parcours exceptionnels à gérer : email non confirmé, lien expiré/utilisé, email déjà inscrit, formulaire interrompu, cohorte pleine, changement de ville, invitation expirée/annulée, referral suspect, demande de suppression, email non délivré.

## 8. D07 Messaging — état de spécification
12 sous-domaines proposés : Conversation Core, Message Engine, Realtime Gateway, Delivery Engine, Media Messaging, Encryption & Key Management, Device Synchronization, Privacy Controls, Abuse Prevention, Reporting Interface, Messaging Operations, Messaging Analytics.
Règles techniques recherchées : autorisation à chaque connexion/souscription/message, limites de débit et de taille, validation d'origine, flow control, reconnexion, logs d'événements sans contenu de message, token ou données sensibles. Upload en zone temporaire, validation du vrai type, taille, scan, modération, stockage privé et URLs temporaires autorisées.
Apple/Google UGC policies imposent signalement, blocage et modération adaptés. E2EE reste non décidé : analyser modèle de menace, modération, preuves, multi-device, sauvegardes, recherche, previews push, protocole et bibliothèque maintenue ; jamais de cryptographie maison. Pas d'accès admin général aux conversations privées ; accès exceptionnel limité, justifié, autorisé et audité. Rétention à définir avec revue juridique. La branche D07 ne doit pas être confondue avec une implémentation complète de la messagerie.

## 9. Monétisation et modèle commercial
Freemium. Gratuit : profil, découverte de base, Like/Pass, réception des matchs, chat après match, blocage, signalement, confidentialité et sécurité. Premium envisagé : filtres avancés, liste des Likes, personnalisation de découverte ; boosts/crédits facultatifs. Pas de prix final, devise/provider ou catalogue commercial verrouillé. Prix localisables, NGN au Nigeria si applicable. Paiement web et achats in-app Apple/Google à traiter selon leurs règles. Pas de mécanismes manipulateurs.

## 10. État réel du dépôt GitHub au 2026-11-03
Branches observées :
- `main` : historique principal, ne pas modifier sans accord.
- `feat/waitlist-landing-visual-foundation` : fondation visuelle existante, à préserver.
- `backup/pre-d07-foundation-2026-11-03` : sauvegarde, SHA connu `9d7697e4b561b4acd92ff7058a70cf03e581763f`.
- `feat/d07-messaging-foundation` : branche locale de travail ; HEAD local annoncé `29efd64`; contient une fondation API en `apps/api`, et des commits API récents.
- `chore/ubwenzi-monorepo-architecture` : branche architecture, HEAD vérifié précédemment `a0d66dfd371c0e9cf6867d73e667bf867f726ba0`.
- présente branche de documentation : `docs/ubwenzi-master-checkpoint-2026-11-03`, créée depuis le commit architecture ci-dessus.
Aucune branche n'a été fusionnée dans `main`.

### État architecture monorepo
Sur `chore/ubwenzi-monorepo-architecture`, structure créée : `backend/api`, `backend/worker`, `frontend/web`, `frontend/mobile`, `frontend/shared`, huit packages partagés, `supabase`, `tests`, `docs`, `tools`, `scripts`, `releases`, npm workspaces et Nx. Sources visuelles Vite déplacées sans changement de contenu (App.tsx, main.tsx, styles.css, index.html). Aucune migration Supabase appliquée. Aucun code Messaging ajouté dans cette branche.
Limites connues : aucun build/typecheck local confirmé par l'assistant ; pas de lockfile racine commité à ce stade ; CI non encore vérifiée ; API/Worker/mobile de cette branche sont des placeholders ; scripts lint/test Web sont placeholders. La branche reste non fusionnée.

### État API sur `feat/d07-messaging-foundation`
- NestJS + Fastify dans `apps/api`, Node >=22, TypeScript strict.
- Bootstrap API avec préfixe `/api/v1`, CORS configurable, ValidationPipe whitelist/forbidNonWhitelisted, graceful shutdown.
- Module Health : `/health/live` et `/health/ready`; readiness teste la base.
- Module Database basé sur `pg` Pool, DATABASE_URL et paramètres SSL/pool.
- Les commits récents signalés localement : `29efd64` refactor API dependency boundaries ; `decbc92` database readiness ; `a920c87` CI lockfile cache ; `6c67fc6` API CI typecheck/build ; `d7590a4` graceful shutdown.
- Le contenu de `apps/api/src/app.module.ts` importe seulement HealthModule. Ce n'est pas encore un ensemble de domaines métier.
- La recherche GitHub du connecteur n'a pas retourné les PR du dépôt ; état PR non vérifié.
- La CI n'a pas été vérifiée dans cette inspection ; chemins de workflow recherchés sous deux noms n'ont pas été trouvés.
- Aucune table Messaging ne doit être appliquée.

### Incident de merge local du 2026-11-03
Un merge architecture → `feat/d07-messaging-foundation` a été démarré dans Git, conflits résolus, mais pas commité. Il a été annulé avec `git merge --abort`. État local ensuite :
- branche `feat/d07-messaging-foundation`, HEAD `29efd64`, à jour avec origin selon `git status`.
- `apps/api/package.json` restauré.
- deux fichiers non suivis créés par `npm install` : `package-lock.json` et `apps/api/package-lock.json`.
- sauvegarde hors dépôt : `D:\\Projets\\ubwenzi-merge-backup` avec `apps-api-package.json`, `apps-api-package-lock.json`, `package-lock.json`.
- `npm install` a indiqué 2 vulnérabilités high. Ne pas exécuter `npm audit fix --force`.
- Le lockfile racine correspond au monorepo, mais le `package.json` racine de la branche D07 est encore l'ancien manifeste `ubwenzi-web`. Le lockfile racine ne doit donc pas être utilisé avant réconciliation.
- L'utilisateur a demandé de ne pas faire de suppression avant analyse. À la dernière observation, les deux lockfiles non suivis sont encore présents.

## 11. Cahier des charges / MVP — statut
Le présent checkpoint consolide les décisions produit et architecture connues, mais **n'est pas encore le cahier des charges fonctionnel complet approuvé**. Le document MVP séparé doit détailler périmètre, exigences, rôles, parcours, règles métier, données, API, événements, sécurité, critères d'acceptation, métriques et exclusions.
Le document architecture baseline historique comporte des divergences : il liste D00-D14 et propose plusieurs structures contradictoires (`apps/*` puis `frontend/backend`). Les décisions plus récentes ARCH-01 à ARCH-09 et ADR-0004 priment ; le baseline doit être réconcilié, pas utilisé tel quel.

## 12. Prochaines étapes — ordre obligatoire
1. Terminer l'inventaire GitHub : fichiers API, workflows CI, PR, commits, docs product/design, migrations et tests ; relever ce qui manque.
2. Rédiger/valider le cahier des charges MVP fonctionnel à partir des décisions consolidées ; marquer chaque exigence VALIDÉE / PROPOSÉE / À DÉCIDER.
3. Réconcilier le document architecture baseline avec ARCH-01..09 et ADR-0004.
4. Comparer précisément les arbres et historiques des branches D07 et monorepo ; établir une branche d'intégration dédiée sans merge aveugle.
5. Migrer l'API `apps/api` vers `backend/api` en préservant ses tests, scripts et workflows ; vérifier l'absence de perte.
6. Stabiliser les workspaces et un seul lockfile racine ; installer et tester localement.
7. Valider typecheck, build, tests, CI, migrations sur base jetable et sécurité.
8. Scaffolder Worker et Expo mobile seulement après validation de la base monorepo.
9. Implémenter APP-01 Waitlist réellement (API, persistance, email, consentement, anti-abus, admin, privacy) avant d'ouvrir l'inscription.
10. Finaliser les spécifications D07 avant toute table ou migration Messaging.
11. Ne jamais fusionner `main` ni pousser en production sans accord explicite.

## 13. Commandes de reprise locale
Dans PowerShell, commencer par :
```powershell
cd D:\\Projets\\ubwenzi
git status
git branch --show-current
git log -8 --oneline --decorate
git branch -vv
```
Ne pas lancer `npm install`, `npm ci`, `git merge`, `git reset --hard`, `git clean` ou une migration avant d'avoir vérifié les fichiers et la branche active.

---
**Règle de continuité :** ce checkpoint sert de mémoire de travail. Toujours revalider l'état Git et les résultats CI en direct avant d'affirmer qu'une tâche est terminée.


## 14. Résultat de la comparaison GitHub — audit approfondi du 2026-11-03

Comparaisons de références confirmées par GitHub :
- `main` → `chore/ubwenzi-monorepo-architecture` : 52 commits en avance, 0 en retard ; statut ahead.
- `main` → `feat/d07-messaging-foundation` : 43 commits en avance, 0 en retard ; statut ahead.
- `chore/ubwenzi-monorepo-architecture` → `feat/d07-messaging-foundation` : branches divergentes ; D07 a 25 commits propres et 34 commits de retard par rapport à la branche architecture. Leur merge-base est `9d7697e4b561b4acd92ff7058a70cf03e581763f`.
- Ce résultat confirme qu'un merge direct ne serait pas une simple intégration linéaire. Faire une sélection de commits/fichiers et une intégration contrôlée.

Fichiers D07 observés :
- `.github/workflows/api-foundation.yml` : workflow API qui installe avec `npm install --prefix apps/api`, puis typecheck/build ; déclenché sur push de la branche D07 et pull_request. Il ne constitue pas encore la CI du monorepo npm workspaces.
- `apps/api/package.json`, `apps/api/tsconfig.json`, `apps/api/src/main.ts`, `app.module.ts`, HealthModule/Controller, DatabaseModule/Service, `.env.example`.
- `docs/adr/ADR-0002-approved-domain-catalog.md` : catalogue D00-D16 accepté, qui remplace l'ancien D00-D14.
- `docs/architecture/ADR-0003-private-domain-schemas.md` : schémas privés, API backend et règles de migrations.
- `docs/product/P00-waitlist-scope.md` : périmètre waitlist ; pas de formulaire live avant persistance, vérification email, protections et admin.
- `supabase/config.toml` et `supabase/migrations/20261103000100_create_messaging_schema.sql`. Cette migration ne crée que le schéma privé `messaging`, sans table métier ; elle révoque les accès PUBLIC/anon/authenticated. Elle reste NON APPLIQUÉE et non autorisée à être appliquée à ce stade.

Anomalies/conflits structurels :
- Le `package.json` racine de la branche D07 reste `ubwenzi-web`, application Vite mono-package ; il ne correspond pas au monorepo Nx/workspaces.
- D07 place l'API sous `apps/api`, alors que la convention retenue ADR-0004 est `backend/api`.
- La branche architecture a la structure `backend/frontend`, mais ses manifests API/Worker sont placeholders ; il faut intégrer sélectivement la fondation API existante.
- Ne pas reprendre le lockfile racine D07 ou le lockfile API isolé ; viser un seul lockfile racine après fusion contrôlée des manifests.
- La recherche PR via l'intégration GitHub n'a retourné aucun élément ; le statut PR doit être vérifié dans GitHub UI ou avec un endpoint de liste PR adapté.
- La présence d'un workflow dans le dépôt ne prouve pas qu'il a réussi. Aucun résultat CI vert n'a été établi pendant cet audit.

## 15. Réconciliation documentaire enregistrée

Nouvelle décision créée dans cette branche :
- `docs/decisions/ADR-0005-architecture-reference-reconciliation.md`
- Elle définit l'ordre d'autorité : ARCH-01..09, ADR-0002, ADR-0003, ADR-0004, ADR-0005, puis documents de synthèse et enfin documents historiques.
- Elle confirme D00-D16 et la structure `backend/` + `frontend/`.
- Elle marque les sections anciennes du baseline comme obsolètes à réviser, sans effacer leur historique.
- Elle interdit l'import du manifeste Vite mono-package D07 et l'application automatique de la migration Messaging.

Le cahier des charges MVP est conservé dans `docs/product/UBWENZI_CAHIER_DES_CHARGES_MVP_V1.md`. Son statut reste « consolidation pour revue », pas approbation finale de tous les éléments proposés.

## 16. Prochaine action technique
Créer une branche d'intégration dédiée à partir de `chore/ubwenzi-monorepo-architecture`, puis importer sélectivement la fondation API D07 vers `backend/api`, le workflow adapté aux workspaces et les ADR-0002/0003. Exclure le package racine D07, tout lockfile divergent et la migration Messaging jusqu'à validation distincte. Aucune fusion dans `main`.
