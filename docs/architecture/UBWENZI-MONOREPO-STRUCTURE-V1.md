# UBWENZI — Structure officielle du monorepo V1

**Statut :** proposition d'implémentation autorisée sur branche dédiée — à valider par contrôles avant fusion.
**Référence :** décisions ARCH-01 à ARCH-09, CAT-01.
**Convention physique retenue :** `backend/` et `frontend/`; livrables mobiles dans `releases/`.

## 1. Arborescence cible

```text
ubwenzi/
├── backend/
│   ├── api/
│   │   ├── src/{bootstrap,platform,modules,infrastructure,integrations,common}/
│   │   ├── test/{unit,integration,contract,security}/
│   │   └── package.json
│   ├── worker/
│   │   ├── src/{bootstrap,consumers,jobs,schedulers,outbox,retry,infrastructure}/
│   │   ├── test/
│   │   └── package.json
│   ├── shared/
│   └── tests/
├── frontend/
│   ├── web/
│   │   ├── public/
│   │   ├── src/{app,surfaces,modules,shared,assets,i18n,tests}/
│   │   └── package.json
│   ├── mobile/
│   │   ├── src/{app,navigation,screens,modules,components,services,api,storage,permissions,assets,i18n,tests}/
│   │   ├── android/
│   │   ├── ios/
│   │   └── package.json
│   └── shared/
├── releases/
│   ├── android/{apk/{debug,release},aab,metadata}/
│   └── ios/{ipa,archives,metadata}/
├── packages/
│   ├── api-contracts/
│   ├── api-client/
│   ├── validation/
│   ├── design-system/
│   ├── i18n/
│   ├── permissions/
│   ├── config/
│   └── observability/
├── supabase/{migrations,seed,functions,tests}/
├── tests/{integration,e2e,security,performance}/
├── docs/{architecture,decisions,product,design,data,api,security,privacy,operations,checkpoints}/
├── tools/
├── scripts/
├── .github/workflows/
├── nx.json
├── package.json
├── package-lock.json
├── tsconfig.base.json
├── .env.example
├── .gitignore
└── README.md
```

## 2. Responsabilités

- `backend/api` : API REST NestJS + Fastify, monolithe modulaire, autorité métier.
- `backend/worker` : traitements asynchrones, consommateurs Outbox, tâches planifiées; aucune route publique.
- `backend/shared` : primitives strictement backend, sans logique métier appartenant à un domaine.
- `frontend/web` : site public, waitlist, espace membre, administration plateforme, Trust & Safety et portail partenaire comme surfaces logiques d'une seule application Web.
- `frontend/mobile` : une base React Native + Expo pour Android et iOS.
- `frontend/shared` : éléments partageables entre interfaces seulement s'ils ne créent pas de dépendance circulaire.
- `packages` : contrats, validation, design system, i18n, client API, permissions, configuration et observabilité réellement transversaux.
- `releases` : sorties compilées uniquement; APK/AAB/IPA et archives ne sont jamais versionnés dans Git.
- `supabase` : migrations versionnées, seeds non sensibles, fonctions Edge justifiées et tests SQL/RLS.

## 3. Domaines backend

Les 17 domaines validés ARCH-02 restent inchangés : D00 Platform Foundation, D01 Identity & Access, D02 Waitlist & Acquisition, D03 Members & Profiles, D04 Preferences, D05 Discovery Engine, D06 Matching, D07 Messaging, D08 Trust & Verification, D09 Safety & Moderation, D10 Subscriptions & Entitlements, D11 Payments & Billing, D12 Notifications, D13 Platform Administration, D14 Analytics & Experimentation, D15 Events & Partners, D16 Media & Content.

Chaque domaine backend suit, selon ses besoins réels, les frontières domain / application / infrastructure / http / policies / tests. Pas de dossiers vides artificiels. Les domaines ne lisent ni ne modifient directement les tables d'un autre domaine.

## 4. Règles de dépendance

1. Le navigateur et les applications mobiles consomment l'API UBWENZI; ils ne portent pas l'autorité métier.
2. L'API est le point central des opérations métier et des autorisations.
3. Le Worker consomme les événements via Outbox transactionnelle; traitements idempotents, retries et DLQ.
4. Les packages partagés ne contiennent pas de règles métier dupliquées.
5. Un seul PostgreSQL par environnement, avec schémas détenus par domaine.
6. Supabase Auth reste derrière l'abstraction Identity UBWENZI.
7. Migrations centralisées dans `supabase/migrations`, testées avant toute application sur environnement partagé.
8. Aucun secret dans le frontend ni dans Git.
9. Node.js 22.x, TypeScript strict, npm workspaces et Nx.
10. Environnements LOCAL, TEST/CI, STAGING et PRODUCTION isolés.

## 5. Livraison mobile

- Sources natives : `frontend/mobile/android` et `frontend/mobile/ios`.
- Builds Android : `releases/android/apk` et `releases/android/aab`.
- Builds iOS : `releases/ios/ipa` et `releases/ios/archives`.
- Les artefacts sont produits par EAS ou les chaînes natives et stockés hors Git.
- Les APK debug et release sont séparés; les signatures et secrets ne sont jamais commités.

## 6. Migration depuis l'ancien dépôt

Migration en commits contrôlés : (1) établir cette structure et l'outillage; (2) déplacer le Vite existant vers `frontend/web` sans changement visuel; (3) réorganiser l'API existante dans `backend/api`; (4) préparer le Worker et mobile sans inventer de fonctionnalités; (5) contrôler build, typecheck, tests, chemins et CI. Aucun fichier existant ne doit être supprimé avant vérification de sa copie et de ses références.

## 7. Hors périmètre de cette fondation

Aucune table Messaging, aucun module métier fonctionnel, aucune migration Supabase appliquée, aucun changement de visuel, aucune fusion dans `main`. Cette structure ne constitue pas une validation de conformité juridique ou de sécurité opérationnelle.
