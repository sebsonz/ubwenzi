# ADR-0005 — Réconciliation des références d'architecture UBWENZI

- **Statut :** adopté pour la documentation de référence de la branche de consolidation ; aucune fusion dans `main` autorisée par cette ADR.
- **Date :** 2026-11-03
- **Contexte :** plusieurs documents historiques contiennent des numérotations de domaines et des structures de dépôt qui se contredisent. La branche monorepo adopte `backend/` + `frontend/`, tandis que le baseline historique contient encore des sections `apps/*` et des règles incompatibles.
- **Décisions associées :** ARCH-01 à ARCH-09, ADR-0002 (catalogue D00-D16), ADR-0003 (schémas PostgreSQL privés), ADR-0004 (layout backend/frontend).

## 1. Hiérarchie documentaire

En cas de contradiction, appliquer cet ordre :
1. Décisions ARCH-01 à ARCH-09 validées par le propriétaire du produit.
2. ADR-0002 — catalogue de domaines D00-D16.
3. ADR-0003 — schémas PostgreSQL privés et accès via API.
4. ADR-0004 — convention physique `backend/` + `frontend/`.
5. Présente ADR-0005 — règle de réconciliation et de lecture des documents.
6. Documents de synthèse récents (checkpoint maître et cahier des charges MVP).
7. Documents historiques non encore révisés, dont `UBWENZI-ARCHITECTURE-BASELINE-V1.md`.

Un document historique ne peut pas annuler une décision plus récente et validée.

## 2. Catalogue fonctionnel faisant autorité

Le catalogue unique comporte 17 domaines :
D00 Platform Foundation; D01 Identity & Access; D02 Waitlist & Acquisition; D03 Members & Profiles; D04 Preferences; D05 Discovery Engine; D06 Matching; D07 Messaging; D08 Trust & Verification; D09 Safety & Moderation; D10 Subscriptions & Entitlements; D11 Payments & Billing; D12 Notifications; D13 Platform Administration; D14 Analytics & Experimentation; D15 Events & Partners; D16 Media & Content.

La numérotation D00-D14 du baseline historique est obsolète. Le catalogue détaillé et les frontières de propriété de données d'ADR-0002 prévalent.

## 3. Structure physique du dépôt faisant autorité

Le monorepo utilise :
- `backend/api` — NestJS + Fastify.
- `backend/worker` — traitements asynchrones.
- `frontend/web` — React + TypeScript + Vite, surfaces Public, Waitlist, Member, Platform Admin, Trust & Safety et Partner.
- `frontend/mobile` — React Native + Expo, source commune Android/iOS.
- `frontend/shared` — éléments UI partageables sans dépendances circulaires.
- `packages/*` — bibliothèques transversales.
- `supabase/*`, `tests/*`, `docs/*`, `tools`, `scripts`, `releases`.

Les anciennes propositions `apps/web`, `apps/api`, `apps/worker` ne sont pas la convention actuelle. Elles ne doivent pas être réintroduites sans décision explicite du propriétaire du projet.

## 4. Règles de données et migrations

- PostgreSQL reste la source transactionnelle.
- Un projet/base isolé par environnement.
- Schémas privés par domaine ; accès métier via l'API UBWENZI.
- RLS et grants sont une défense en profondeur.
- Les migrations sont versionnées, revues, testées sur base jetable et appliquées progressivement TEST → STAGING → PRODUCTION.
- Une migration présente dans une branche de travail n'est pas réputée autorisée à être appliquée.
- La migration `20261103000100_create_messaging_schema.sql` de la branche `feat/d07-messaging-foundation` reste non appliquée jusqu'à validation expresse du plan de consolidation et des tests.

## 5. Réconciliation du baseline historique

Le fichier `docs/architecture/UBWENZI-ARCHITECTURE-BASELINE-V1.md` reste une source historique utile pour ses principes transversaux, mais ses sections suivantes sont obsolètes et doivent être révisées :
- Section 3 : anciens domaines D00-D14 ; remplacer par ADR-0002.
- Section 6 : structures de dépôt contradictoires ; remplacer par ADR-0004 et `UBWENZI-MONOREPO-STRUCTURE-V1.md`.
- Section 15 et sous-sections : convention `apps/*` ; considérer comme supersédée.
- Section 13 : décisions présentées comme ouvertes qui sont désormais validées par ARCH-01 à ARCH-09 ; mettre à jour les statuts.
La révision doit conserver les exigences métier encore valables, sans effacer l'historique de décisions.

## 6. Règles de consolidation Git

- `main` reste intacte jusqu'à approbation explicite.
- `chore/ubwenzi-monorepo-architecture` est la base cible pour la convention de dépôt.
- `feat/d07-messaging-foundation` est une source de composants API à intégrer sélectivement, pas une branche à fusionner directement.
- Le code API doit être déplacé de `apps/api` vers `backend/api` avec conservation des fichiers, scripts, configuration et workflow utile.
- Ne pas importer le manifeste racine Vite historique de la branche D07 dans le monorepo.
- Ne pas importer deux lockfiles ; viser un lockfile racine unique après harmonisation des workspaces.
- Ne pas importer la migration Messaging avant revue ; aucun déploiement ou push DB automatique.
- Le frontend visuel est déplacé sans refonte ni changement de composition.

## 7. Portée

Cette ADR clarifie les références et les règles d'intégration. Elle ne certifie pas que le build, les tests, la CI, la sécurité ou le déploiement sont réussis. Ces validations doivent être démontrées sur l'environnement de travail.
