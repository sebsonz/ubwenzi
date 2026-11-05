# UBWENZI — Project Master Tracker

**Date :** 2026-11-05  
**Branche :** `chore/ubwenzi-project-skeleton-2026-11-05`  
**Référence :** architecture monorepo V1 et catalogue approuvé des domaines D00–D16.

## Règles de suivi

- `SQUELETTE` : emplacement et responsabilité documentés.
- `SPECIFICATION` : exigences et invariants documentés et revus.
- `DATA` : modèle et migrations écrits ; exécution suivie séparément par environnement.
- `IMPLEMENTATION` : code métier complet selon le périmètre approuvé.
- `TESTS` : tests requis exécutés et preuves conservées.
- `VALIDÉ` : critères d'acceptation satisfaits ; ne signifie pas déployé en production.

Une migration créée n'est pas une migration exécutée. Une compilation réussie ne prouve pas le fonctionnement métier. Un dossier documentaire ne signifie pas que la fonctionnalité existe.

## État initial

- Base PostgreSQL/Supabase : déclarée vierge par le propriétaire ; aucune table métier et aucune migration exécutée.
- Les 17 domaines ont un espace backend documentaire sur cette branche.
- Frontend Web : fondation visuelle existante ; ne pas redessiner la landing page approuvée.
- Mobile : espace de préparation, sans fonctionnalité métier déclarée.
- Aucun domaine D00–D16 n'est déclaré implémenté ou validé par ce tracker.

## Progression

| Domaine | Nom | Squelette | Spécification | Données | Implémentation | Tests | Validation |
|---|---|---|---|---|---|---|---|
| D00 | Platform Foundation | CRÉÉ | CONCEPTUELLE | CONCEPTUEL | À FAIRE | À FAIRE | NON |
| D01 | Identity & Access | CRÉÉ | CONCEPTUELLE | CONCEPTUEL | À FAIRE | À FAIRE | NON |
| D02 | Waitlist & Acquisition | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D03 | Members & Profiles | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D04 | Preferences | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D05 | Discovery Engine | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D06 | Matching | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D07 | Messaging | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D08 | Trust & Verification | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D09 | Safety & Moderation | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D10 | Subscriptions & Entitlements | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D11 | Payments & Billing | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D12 | Notifications | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D13 | Platform Administration | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D14 | Analytics & Experimentation | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D15 | Events & Partners | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |
| D16 | Media & Content | CRÉÉ | À FAIRE | À FAIRE | À FAIRE | À FAIRE | NON |

## Ordre de construction

1. Fondation technique et architecture modulaire.
2. D00 Platform Foundation.
3. D01 Identity & Access.
4. D02 Waitlist & Acquisition.
5. D03 à D16 selon les dépendances approuvées.

## Prochaine action

Compléter et contrôler l'arborescence physique sans déplacer ni supprimer les fichiers existants, puis vérifier chemins, dépendances, scripts, typecheck, build et tests disponibles. Les fonctionnalités seront remplies progressivement, dans leur domaine propriétaire.
