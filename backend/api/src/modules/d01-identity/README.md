# D01 — Identity & Access

**Statut :** squelette documentaire créé — aucune fonctionnalité métier déclarée implémentée.

## Responsabilité

Identités, inscription membre, authentification, vérification, mots de passe, sessions, appareils, récupération, MFA, sécurité, identité de service et confidentialité.

## Frontières

- Ce domaine est propriétaire de ses règles métier et de ses données.
- Aucun accès direct aux tables privées d'un autre domaine.
- Les échanges inter-domaines passent par des contrats applicatifs explicites ou des événements versionnés.
- Les contrôleurs HTTP, services applicatifs, règles de domaine, repositories et adaptateurs restent séparés selon la complexité réelle.
- Les dépendances circulaires et la duplication de règles métier sont interdites.

## À construire

- [ ] Spécification fonctionnelle et invariants métier
- [ ] Modèle de données et migrations versionnées
- [ ] Contrats API et autorisations
- [ ] Services applicatifs et infrastructure
- [ ] Interface utilisateur concernée
- [ ] Tests unitaires, DB, intégration, sécurité et E2E pertinents
- [ ] Documentation d'exploitation et critères d'acceptation

> Ne pas créer de fichiers de code vides. Ajouter les composants au fur et à mesure de leur implémentation et de leurs tests.
