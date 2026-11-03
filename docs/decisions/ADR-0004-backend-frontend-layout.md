# ADR-0004 — Organisation physique backend / frontend / mobile

- **Statut :** Adoptée pour la restructuration du dépôt sur branche dédiée; fusion dans main après contrôles.
- **Date :** 2026-11-03
- **Contexte :** la convention apps/api, apps/web, apps/mobile ne correspond pas à la préférence explicite de rangement du projet. Une séparation physique backend/frontend est demandée.
- **Décision :** conserver un monorepo npm workspaces + Nx avec `backend/api`, `backend/worker`, `frontend/web`, `frontend/mobile`, `frontend/shared`, `packages/*`, `supabase/*`, `tests/*`, `docs/*` et `releases/*`.
- **Surfaces Web :** site public, waitlist, espace membre, administration plateforme, Trust & Safety et portail partenaire restent des surfaces d'une seule application `frontend/web`.
- **Mobile :** une base React Native + Expo dans `frontend/mobile`, avec sources natives Android/iOS sous ce dossier. Les APK/AAB/IPA compilés sont stockés dans `releases/` et ignorés par Git.
- **Architecture métier :** aucun changement aux 17 domaines D00-D16, aux frontières métier ou aux décisions ARCH-01 à ARCH-09. Seule la convention de rangement physique est adaptée.
- **Conséquences :** les chemins et références documentaires historiques vers `apps/*` doivent être considérés comme remplacés par cette ADR et le document `UBWENZI-MONOREPO-STRUCTURE-V1.md`. Les fichiers source sont déplacés sans refonte visuelle.
- **Sécurité de migration :** travail dans une branche dédiée, commits atomiques, sauvegarde conservée, aucune migration Supabase appliquée, aucune fusion automatique dans `main`.
