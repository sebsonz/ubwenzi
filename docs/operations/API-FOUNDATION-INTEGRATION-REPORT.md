# Rapport d'intégration — fondation API dans le monorepo

**Date :** 2026-11-03  
**Branche :** `integrate/api-foundation-monorepo-2026-11-03`  
**Base :** `chore/ubwenzi-monorepo-architecture`  
**Statut :** intégration partielle des sources ; validation locale requise ; non fusionné dans main.

## Source comparée
La branche `feat/d07-messaging-foundation` a été comparée à la branche architecture. GitHub a confirmé 25 commits spécifiques à D07, 34 commits spécifiques à l'architecture et un merge-base commun `9d7697e4b561b4acd92ff7058a70cf03e581763f`. Les branches sont divergentes.

## Éléments repris sélectivement
- API NestJS + Fastify dans `backend/api`.
- Bootstrap avec préfixe `/api/v1`, CORS configurable, ValidationPipe strict et arrêt propre.
- Module Health avec liveness et readiness.
- Service de readiness DB.
- Configuration TypeScript stricte.
- Exemple d'environnement sans valeurs secrètes.
- Catalogue de domaines ADR-0002 (D00-D16).
- Règles d'accès aux schémas privés ADR-0003.
- Cible Nx API et inclusion de l'API dans les scripts racine build/typecheck.

## Éléments volontairement exclus
- Le `package.json` racine mono-app Vite de la branche D07.
- Les lockfiles locaux/non suivis de la branche D07.
- La migration `20261103000100_create_messaging_schema.sql` : elle n'est pas copiée et ne doit pas être appliquée.
- Le `supabase/config.toml` de la branche D07, en attente de revue et de cohérence avec les environnements.
- Aucun code métier Messaging.
- Aucun changement visuel frontend.

## Point technique à terminer
Le module `backend/api/src/platform/database/database.module.ts` est actuellement un fournisseur placeholder avec pool nul. Il permet d'assembler le graphe Nest, mais la connexion PostgreSQL réelle n'est pas encore rétablie dans cette branche. Il faut reprendre la factory Pool de la branche D07 et la vérifier localement, en gardant TLS activé par défaut pour les environnements partagés.

## Vérifications non encore démontrées
- Pas de `package-lock.json` racine validé.
- Pas de `npm ci` local.
- Pas de typecheck/build local démontré.
- Pas de workflow CI monorepo actif validé.
- Pas de tests automatisés API ajoutés.
- Pas de connexion à une base Supabase réelle testée.
- Pas de migration appliquée.
- Pas de revue sécurité complète.

## Étapes immédiates
1. Tester DatabaseModule avec un PostgreSQL de TEST et vérifier la configuration TLS.
2. Mettre à jour README et scripts.
3. Générer le lockfile racine depuis la racine du monorepo avec Node 22/npm 10.
4. Ajouter une CI utilisant `npm ci`, typecheck et build pour Web + API.
5. Exécuter localement `npm ci`, `npm run typecheck`, `npm run build` et tests.
6. Corriger les erreurs avant tout merge.
7. Examiner les deux lockfiles locaux non suivis sans les supprimer avant sauvegarde/confirmation.
8. Garder la migration Messaging non appliquée et hors de la branche d'intégration tant que le schéma D07 n'est pas approuvé.

## Règle
Cette branche est un espace de consolidation. Ne pas fusionner vers `main` ou vers la branche architecture de référence avant validation des tests et approbation explicite.
