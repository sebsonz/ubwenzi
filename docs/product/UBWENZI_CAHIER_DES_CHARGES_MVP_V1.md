# UBWENZI — CAHIER DES CHARGES ET MVP PRODUIT V1
**Date :** 2026-11-03  
**Statut :** consolidation structurée pour revue propriétaire — les éléments marqués PROPOSÉ ou À DÉCIDER ne sont pas verrouillés.  
**Marché initial :** Lagos, Nigeria · **Public :** adultes 18+ · **Langues :** anglais prioritaire, français pris en charge.

## 0. Convention de statut
- **VALIDÉ** : décision approuvée dans les échanges projet.
- **PROPOSÉ** : recommandation structurée à approuver.
- **À DÉCIDER** : information ou arbitrage manquant.
- **EXCLU MVP** : hors première version, mais peut rester dans l'architecture cible.
- **À VÉRIFIER** : dépend d'une recherche, d'un test ou d'un avis professionnel.

Ce document est une base de cadrage complète et traçable, pas une certification de conformité légale ou de sécurité.

# 1. Vision, proposition de valeur et objectifs

## 1.1 Vision
Créer une plateforme de rencontres et de découverte sociale qui aide des adultes à construire des relations authentiques et significatives, avec une confiance, une sécurité et une confidentialité intégrées dès le premier contact.

## 1.2 Proposition de valeur
- Rencontres intentionnelles : relations sérieuses et amitié, avec intentions visibles et compréhensibles.
- Trust before matching : réduire les risques et améliorer la qualité des interactions avant et après le Match.
- Découverte pertinente : recommandations fondées sur préférences, compatibilité et qualité, sans classement opaque non contrôlé.
- Expérience locale et internationale : commencer à Lagos tout en préparant l'expansion multi-pays.
- Sécurité accessible : blocage, signalement, paramètres de confidentialité et mécanismes de sécurité gratuits.

## 1.3 Objectifs du lancement
1. Mesurer la demande qualifiée à Lagos avec une waitlist vérifiée.
2. Constituer une cohorte initiale suffisamment dense et diverse pour une bêta fermée.
3. Vérifier que les utilisateurs complètent un profil de qualité et comprennent les intentions relationnelles.
4. Mesurer la qualité de découverte, les Likes réciproques, Matches et conversations respectueuses.
5. Valider les mécanismes de confiance, signalement, blocage et modération avant ouverture publique.
6. Mesurer rétention, coûts, support, sécurité et viabilité commerciale avant expansion.

## 1.4 Indicateurs directeurs
- Acquisition : visites, conversion waitlist, vérification email, source/campagne, coût par candidat qualifié.
- Activation : invitation acceptée, compte activé, profil complété, préférences renseignées.
- Découverte : profils vus, Likes/Pass, qualité et diversité des impressions.
- Matching : taux Like réciproque, Match, délai au premier Match.
- Conversation : taux de conversation après Match, échanges réciproques, blocages et signalements.
- Confiance : temps de traitement des signalements, récurrence d'abus, faux positifs, appels et résolution.
- Rétention : J1/J7/J30, activité et désactivation.
- Commercial : conversion premium, revenu net, remboursements, coûts de paiement et de support.
Les définitions, fenêtres, seuils et objectifs chiffrés doivent être définis dans QA-01/Analytics avant d'être utilisés comme critères de lancement.

# 2. Périmètre MVP et phases de lancement

## 2.1 MVP public initial — acquisition / waitlist
**VALIDÉ comme première expérience publique.**
- Site public responsive, bilingue EN/FR, visuel approuvé.
- Présentation de la proposition, sécurité, fonctionnement, FAQ, règles communautaires, confidentialité, conditions, cookies et contact.
- Waitlist avec formulaire progressif.
- Vérification email avant confirmation.
- Cohortes et invitations bêta.
- Gestion des consentements, demandes privacy, retrait et suppression.
- Anti-abus et limitation de débit.
- Administration waitlist avec permissions et audit.
- Analytics acquisition agrégées et exports restreints.
- Notifications bilingues et suivi de délivrabilité.

## 2.2 Closed beta — produit membre
**PROPOSÉ comme périmètre nécessaire à la bêta fermée ; détails à approuver domaine par domaine.**
- Conversion d'une invitation valide vers un compte membre.
- Inscription/connexion email et téléphone, vérifications et récupération.
- Profil membre, photos, bio, intérêts, langues et intentions.
- Préférences et visibilité.
- Découverte contrôlée.
- Like/Pass et Match.
- Messagerie après Match, avec blocage, signalement et modération opérationnels.
- Vérification progressive et indicateurs de confiance non trompeurs.
- Paramètres privacy, sécurité, sessions/appareils et fermeture de compte.
- Administration plateforme, support et Trust & Safety.
- Analytics produit et sécurité.
- Pas d'ouverture bêta si les protections critiques et le support ne sont pas opérationnels.

## 2.3 Public launch
- Ouverture progressive à Lagos après validation de la bêta.
- Plans et paiements seulement après tests de facturation, remboursements, rapprochement et conformité aux règles Apple/Google/web.
- Déploiement contrôlé avec feature flags, monitoring, rollback, support et modération.
- Expansion géographique non automatique : décision fondée sur densité, rétention, qualité, coûts et capacité opérationnelle.

## 2.4 Exclusions MVP initiales
- Déploiement multi-pays commercial complet dès le premier jour (l'architecture est multi-pays, l'acquisition initiale est Lagos).
- Événements et marketplace de partenaires (D15), sauf test explicitement approuvé.
- Système de récompenses de parrainage.
- E2EE avant décision issue d'un modèle de menace et d'une étude de faisabilité.
- Vérification documentaire obligatoire à l'inscription waitlist.
- Microservices, infrastructure distribuée et Redis/queue externe sans justification.
- Fonctionnalités premium qui dégradent ou verrouillent la sécurité.
- Fonctionnalités de découverte manipulatrices ou qui exposent des critères privés.

# 3. Parcours utilisateur de bout en bout

## 3.1 Parcours pré-lancement
1. Visiteur arrive sur le site public.
2. Comprend la proposition, les règles, la sécurité et le traitement des données.
3. Choisit EN/FR.
4. Ouvre la waitlist.
5. Saisit email, pays, ville, déclaration 18+, langue.
6. Le système valide et protège contre spam/automatisation.
7. Le candidat reçoit un email de vérification.
8. Tant que l'email n'est pas vérifié, statut EMAIL_PENDING.
9. Après vérification, statut WAITLIST_CONFIRMED.
10. Le système attribue une cohorte selon capacité et règles ; une correction admin est auditée.
11. Le candidat peut être invité à la bêta selon cohorte et capacité.
12. Le candidat reçoit une invitation ; elle est vérifiable, expirante et non réutilisable.
13. Referral tracking est lié à un candidat confirmé ; aucun reward au lancement.

## 3.2 Parcours membre
1. Invitation valide ou autorisation exceptionnelle documentée.
2. Création d'une identité et preuve de contrôle email/téléphone.
3. Acceptation des conditions et consentements nécessaires.
4. Profil de base, intentions et préférences.
5. Photo envoyée en zone privée/temporaire, validation et modération avant publication.
6. Accès à la découverte selon éligibilité, complétude et règles de confiance.
7. Like ou Pass ; limites configurables.
8. Match créé seulement selon règle réciproque ou acceptation de demande.
9. Conversation disponible après Match et contrôles de sécurité.
10. Blocage et signalement disponibles à tout moment.
11. Paramètres de confidentialité, export, rectification, fermeture et suppression.
12. Réactivation ou suspension selon règles et historique.

## 3.3 Parcours admin / Trust & Safety
1. Connexion admin avec MFA.
2. Autorisation côté serveur selon permission et scope.
3. Consultation des dossiers nécessaires au rôle.
4. Action sensible avec motif, confirmation, et double approbation si critique.
5. Journalisation de l'acteur, de la cible, du motif, de la date, du résultat et du contexte.
6. Revue des cas, délais, appels et résultats.
7. Accès aux données privées uniquement au besoin, selon politique et audit.

# 4. Exigences fonctionnelles par domaine

## D00 — Platform Foundation
- Référentiels pays, régions, villes, langues, devises et fuseaux.
- Paramètres et règles par pays, feature flags et maintenance.
- Version de plateforme, clients minimum et compatibilité.
- Environnements et intégrations configurables.
- Statuts et référentiels versionnés.
- Paramètres sensibles accessibles uniquement à des rôles autorisés ; secrets jamais affichés en clair.

## D01 — Identity & Access
- Email et téléphone comme moyens d'inscription/connexion prévus au lancement.
- Vérification email/téléphone, récupération, changement de coordonnées et historique.
- Gestion sessions, appareils, révocation et sécurité.
- MFA obligatoire pour tous les administrateurs ; MFA membre basé sur risque et préférences.
- Social auth à travers adaptateurs ; à activer après sélection fournisseur.
- Liaison d'identités seulement après preuve de contrôle des deux identifiants.
- Ne pas fusionner automatiquement deux comptes sur simple égalité d'email.
- Séparation stricte entre identité technique, profil, waitlist et autorisations.
- Contrôles d'âge 18+ progressifs ; méthodes et prestataires à décider.

## D02 — Waitlist & Acquisition
- Formulaire progressif, EN/FR, validations serveur.
- Email non divulgué à un tiers en cas de doublon.
- Email verification, statuts indépendants et cohortes.
- Capacité des cohortes, règles automatiques, corrections manuelles auditables.
- Invitations avec expiration, annulation, usage unique et vérification.
- Referral tracking sans récompense ; anti-auto-referral, doublon et abus.
- UTM et attribution de campagne.
- Consentement marketing distinct, facultatif, prouvable et retirable.
- Demandes d'accès, rectification et suppression.
- Templates email versionnés et bilingues, retries et journaux de livraison.
- Exports limités par rôle, scope, motif et audit.

### Rôles waitlist
SUPER_ADMIN, PLATFORM_ADMIN, ACQUISITION_MANAGER, CAMPAIGN_MANAGER, CUSTOMER_SUPPORT, PRIVACY_OFFICER, ANALYST, AUDITOR.
Les permissions sont granulaires, attribuées individuellement, révocables et auditées. Pas d'auto-attribution de privilèges.

## D03 — Members & Profiles
- Profil privé distinct de l'identité.
- Nom d'affichage, date de naissance privée et âge calculé, bio, photos, langues, intérêts et informations de profil.
- Modèle de genre inclusif et paramètres de visibilité à concevoir avec revue privacy/juridique.
- Photos modérées avant publication.
- Contrôle visibilité du profil, pause, désactivation et suppression.
- Historique des modifications sensibles.
- Ne pas afficher des données privées ou exactes sans raison.

## D04 — Preferences
- Intentions : relation sérieuse, amitié et autres intentions validées.
- Critères pondérés : essentiel, très important, important, préféré, flexible.
- Informations sensibles facultatives, consentement explicite et contrôle de visibilité.
- Valeur inconnue/non vérifiée ne signifie pas automatiquement incompatibilité.
- L'utilisateur peut modifier ses préférences et comprendre leur impact.

## D05 — Discovery Engine
- Éligibilité avant classement.
- Moteur hybride : compatibilité, qualité du profil, diversité, pertinence et fraîcheur.
- Équité des nouveaux profils et limitation des boucles de popularité.
- Plusieurs modes de découverte à préciser.
- Explications limitées aux principaux facteurs, sans révéler les préférences privées de l'autre.
- Pas de géolocalisation précise par défaut ; distance approximative et zones générales.
- Instrumentation des impressions, exclusions et feedback.
- Formule, poids, garde-fous anti-discrimination et seuils à valider.

## D06 — Matching
- Like, Pass et éventuelles variantes selon décisions commerciales.
- Match réciproque automatique ou demande/acceptation selon mode.
- Une absence de réponse ne crée pas de Match.
- Recevoir les Matches et gérer la liste.
- Unmatch avec confirmation ; effet immédiat selon règles.
- Block et Report accessibles gratuitement et depuis les surfaces pertinentes.
- Pas de notification trompeuse ni de Match artificiel.

## D07 — Messaging
- Conversation et participants autorisés par Match et état de sécurité.
- Messages texte ; médias et audio selon priorisation.
- Livraison, ordre, statut, retry et idempotence.
- Synchronisation multi-appareils prévue dès la conception.
- Reçus de lecture et présence contrôlables par le membre.
- Modification dans une fenêtre limitée avec indication ; suppression logique et politique de rétention.
- Signalement d'un message ou d'une conversation.
- Blocage immédiat de l'envoi et de l'interaction selon règles.
- Anti-spam, rate limits, limites de taille, détection d'abus.
- Upload sécurisé, scan, modération et stockage privé.
- Accès admin aux conversations privées exceptionnel, justifié, limité et audité.
- E2EE : À DÉCIDER après threat model, analyse légale, expérience multi-device, modération et bibliothèque cryptographique reconnue.

## D08 — Trust & Verification
- Vérification progressive et explicite.
- Preuves stockées dans un espace privé séparé.
- Revue automatique et/ou humaine avec motif et historique.
- Badges précis et non trompeurs ; expliquer ce qui est vérifié.
- Prestataire interchangeable.
- Accès aux preuves strictement limité et audité.
- Appel/contestation et expiration/revérification selon risque.

## D09 — Safety & Moderation
- Blocage et signalement gratuits.
- Signalement d'utilisateur, profil, média, conversation ou message.
- Motifs structurés et commentaires/contextes optionnels.
- Dossier de modération, priorité, assignation, SLA, décision, preuve et historique.
- Actions graduées : avertissement, restriction, suspension, désactivation, bannissement selon procédure.
- Appel et réexamen.
- Anti-harcèlement, arnaque, spam, usurpation et contenu interdit.
- Protection des preuves et minimisation des données.
- Modération humaine avec escalade et procédure incident.
- Politiques Apple/Google UGC à respecter avant distribution.

## D10 — Subscriptions & Entitlements
- Catalogue de plans indépendant des applications.
- Plans, périodes, limites, essais, renouvellements, expirations et droits.
- Prix par marché, devise, canal et période.
- Entitlements unifiés ; l'API décide des droits.
- Sécurité, blocage, signalement et confidentialité gratuits.
- Premium envisagé : filtres avancés, Likes reçus, personnalisation de découverte.
- Boosts/crédits facultatifs et non manipulateurs.
- Aucun prix final décidé.

## D11 — Payments & Billing
- Abstraction provider-agnostic.
- Création et suivi transaction, webhooks signés, protection contre rejeu, déduplication.
- Rapprochement, remboursement, reçu, échec et litige.
- Aucune donnée carte brute stockée par UBWENZI.
- Paystack et Flutterwave candidats Nigeria, non sélectionnés.
- Apple/Google Billing pour achats natifs selon règles de stores.
- Devise, taxes, frais, facturation et conformité à valider par marché.

## D12 — Notifications
- Email, SMS, push et in-app.
- Modèles versionnés EN/FR.
- Préférences et finalités distinctes ; marketing opt-in et retrait.
- Retry, délivrabilité, suppression et journaux.
- Ne pas exposer message privé dans les previews par défaut ; politique à décider.
- Provider-agnostic.

## D13 — Platform Administration
- Admin global et consoles par domaine.
- Recherche, consultation et actions autorisées.
- Gestion membres, rôles, permissions, paramètres, cohortes, invitations, modération, abonnements, paiements, support, audit et releases.
- Scope par pays/campagne/queue/ressource.
- MFA, moindre privilège, double validation critique et audit.
- Aucune interface simplement consultative pour les tâches opérationnelles ; opérations réelles doivent avoir API, permission, confirmation, audit et résultat.

## D14 — Analytics & Experimentation
- Événements produit et funnel.
- Cohortes et rétention.
- Qualité de découverte et matching.
- Indicateurs sécurité et support.
- Analytics agrégées et pseudonymisées autant que possible.
- Contrôle d'accès, minimisation et durées de rétention.
- Expérimentations avec garde-fous de sécurité et équité.

## D15 — Events & Partners
- Architecture prévue pour événements, lieux, partenaires, participants et offres.
- **EXCLU MVP initial** sauf expérimentation approuvée.

## D16 — Media & Content
- Stockage public, privé membre et preuves privées séparés.
- Validation réelle du format, taille, dimensions et contenu.
- Noms générés, antivirus/scanning si approprié, modération et URLs signées.
- CDN uniquement pour médias publics autorisés.
- Suppression et rétention coordonnées avec les règles privacy.

# 5. Administration, permissions et audit

## 5.1 Rôles plateforme de référence
SUPER_ADMIN, PLATFORM_ADMIN, TRUST_SAFETY_MANAGER, MODERATOR, CUSTOMER_SUPPORT, PRIVACY_OFFICER, FINANCE_MANAGER, ACQUISITION_MANAGER, ANALYST, AUDITOR, RELEASE_MANAGER.
Membres : MEMBER, MEMBER_RESTRICTED, MEMBER_SUSPENDED.
Les rôles représentent des ensembles de permissions, pas des autorisations implicites sans scope.

## 5.2 Permissions
- Identifiants granulaires par ressource et action.
- Scopes globaux, pays, région, campagne, file de modération et ressource.
- Contrôles backend à chaque opération.
- Historique attribution/révocation.
- Pas d'auto-élévation ni d'auto-attribution.
- MFA admin.
- Double approbation pour opérations critiques.
- Audit de l'acteur, action, cible, motif, horodatage, contexte et résultat.
- Les secrets d'infrastructure ne sont jamais exposés dans les écrans admin.

## 5.3 Exemples de permissions Waitlist
`waitlist.read`, `waitlist.create`, `waitlist.update`, `waitlist.withdraw`, `waitlist.cohorts.read`, `waitlist.cohorts.manage`, `waitlist.assign`, `waitlist.invitations.manage`, `waitlist.referrals.review`, `waitlist.campaigns.manage`, `waitlist.notifications.manage`, `waitlist.export`, `waitlist.settings.manage`, `privacy.requests.read`, `privacy.requests.process`, `permissions.roles.manage`, `permissions.assign`, `audit.read`.

# 6. Exigences non fonctionnelles

## 6.1 Sécurité
- OWASP ASVS 5.0 niveau 2 comme cible initiale à vérifier.
- Authentification et autorisation serveur.
- Protection contre IDOR, élévation de privilèges, CSRF/XSS/SQLi, brute force, spam, rejeu et abus API.
- Rate limits par compte, IP, device et action selon risque.
- Secrets hors code, rotation et accès minimal.
- TLS en transit et chiffrement au repos selon fournisseurs.
- Journaux sans contenu de messages, tokens, secrets ni données sensibles inutiles.
- MFA obligatoire admin ; double approbation opérations critiques.
- Tests RLS et isolation multi-utilisateur.
- Tests de restauration DB et fichiers.

## 6.2 Confidentialité
- Privacy by design/default et minimisation.
- Consentements avec texte/version, finalité, horodatage, preuve et retrait.
- Accès, rectification, export, suppression et rétention.
- Données sensibles facultatives et contrôles explicites.
- Localisation approximative par défaut ; pas de GPS exact exposé.
- Documents de vérification privés.
- Règles de conservation et suppression à définir avec conseil compétent au Nigeria et marchés futurs.
- Le projet ne doit pas revendiquer la conformité NDPA sans évaluation juridique et opérationnelle.

## 6.3 Performance et accessibilité — objectifs initiaux à mesurer
- API lecture p95 ≤500 ms ; écriture p95 ≤800 ms.
- Web LCP ≤2,5 s ; INP ≤200 ms ; CLS ≤0,1.
- WCAG 2.2 AA.
- Charge, résilience, reprise et coût à mesurer en staging.
Ces valeurs sont des objectifs, pas des performances déjà atteintes.

## 6.4 Disponibilité et exploitation
- LOCAL, TEST/CI, STAGING, PRODUCTION séparés.
- Sauvegardes et restaurations testées.
- Objectifs initiaux RPO 15 min / RTO 4 h, à éprouver et financer.
- Monitoring, alertes, traces, correlation IDs et runbooks.
- Déploiement progressif, smoke tests, rollback et migrations compatibles.
- Release Center : versions, build numbers, canaux, notes EN/FR, compatibilité, approbations, rollout, artefacts, checksum, incidents et rollback.

## 6.5 Internationalisation
- EN prioritaire Lagos, FR disponible.
- Pas de chaînes UI hardcodées.
- Pays, ville, langue, devise, fuseau et règles locales explicites.
- Montants en unités mineures ou types décimaux exacts, jamais float.
- Horodatage UTC et affichage local.

# 7. Architecture technique et données

## 7.1 Stack
- Monorepo Nx + npm workspaces.
- Web : React, TypeScript, Vite.
- Mobile : React Native + Expo, Android/iOS depuis une seule base.
- API : NestJS + Fastify, Node 22, TypeScript.
- Worker : processus séparé.
- Données : PostgreSQL via Supabase.
- Auth technique : Supabase Auth derrière Identity UBWENZI.
- Storage : buckets privés/public séparés.
- API : REST /api/v1, OpenAPI.
- Outbox transactionnelle.
- GitHub Actions CI/CD.
- Pas de microservices au lancement.

## 7.2 Organisation des données
Un PostgreSQL par environnement, avec schémas par domaine : `platform`, `identity`, `acquisition`, `members`, `preferences`, `discovery`, `matching`, `messaging`, `trust`, `safety`, `subscriptions`, `payments`, `notifications`, `administration`, `analytics`, `partners`, `content`, `audit`, `integration`.
Supabase-managed `auth` et `storage` ne doivent pas être modifiés directement.
Buckets prévus : `public-media`, `member-private`, `verification-private`.
Migrations versionnées, testées sur PostgreSQL jetable ; aucun changement manuel non documenté en production.

## 7.3 Événements et Worker
- Outbox : changement métier et événement enregistrés dans la même transaction.
- Worker : livraison email/push, tâches planifiées, exports, médias, modération assistée, rapprochement et rétention.
- Au moins une fois ; consommateurs idempotents.
- Retry exponentiel et DLQ.
- Ne pas créer un bus distribué complexe sans besoin.

# 8. Modèle de données — entités à spécifier
La liste est conceptuelle ; le dictionnaire DATA-01 devra préciser attributs, types, contraintes, relations, index, RLS et rétention.
- Platform : country, region, city, language, currency, timezone, feature_flag, platform_setting, release.
- Identity : identity, auth_link, email_verification, phone_verification, session, device, recovery_request, admin_mfa.
- Acquisition : waitlist_candidate, waitlist_consent, cohort, cohort_assignment, invitation, referral, campaign, attribution, privacy_request.
- Members : member, profile, profile_photo, profile_interest, profile_language, profile_visibility, profile_history.
- Preferences : relationship_intent, preference_set, preference_item, privacy_preference.
- Discovery : candidate_eligibility, impression, recommendation_context, discovery_feedback.
- Matching : like, pass, match, match_event, unmatch.
- Messaging : conversation, participant, message, attachment, delivery, receipt, device_key (selon choix E2EE), report_reference.
- Trust : verification_case, verification_evidence, verification_result, trust_badge.
- Safety : report, moderation_case, moderation_action, block, appeal, safety_event.
- Subscriptions : plan, price, subscription, entitlement, credit, boost.
- Payments : payment_intent, transaction, webhook_event, refund, reconciliation, receipt.
- Notifications : notification_template, notification_preference, delivery, suppression, provider_event.
- Administration/Audit : platform_user, role, permission, role_permission, user_role, scope, audit_event, approval.
- Analytics : event_definition, product_event, aggregate_metric, experiment, variant_assignment.
- Partners/Content : event, venue, partner, media_asset, content_item.
Chaque domaine conserve la propriété de ses données ; accès inter-domaines via contrats explicites.

# 9. Contrats API et événements à produire
- OpenAPI versionné `/api/v1`.
- Auth context et policy guard communs.
- DTO validés ; refus des champs inconnus.
- Pagination et limites de taille.
- Erreurs normalisées.
- Idempotency keys pour invitation, paiement, opérations rejouables.
- Webhooks signés, horodatage, signature, déduplication et protection replay.
- Contrats d'événements versionnés.
- Nommage et ownership EVT-01.
- API-01 doit définir routes, permissions, request/response, erreurs, pagination, idempotence, audit et tests.

# 10. Exigences de qualité et critères d'acceptation MVP

## 10.1 Waitlist
- Un candidat peut soumettre les champs requis avec validation côté serveur.
- Le consentement marketing n'est jamais précoché ni fusionné avec le consentement nécessaire.
- L'adresse email n'est pas confirmée avant preuve de contrôle.
- Un lien invalide, expiré ou déjà utilisé ne crée pas une seconde inscription.
- Les doublons ne divulguent pas l'existence d'un compte.
- Cohorte pleine n'entraîne jamais dépassement de capacité.
- Toute correction manuelle de cohorte est auditée.
- Une invitation expirée/annulée ne donne pas accès à la bêta.
- Referral ne récompense personne au lancement et ne permet pas auto-parrainage/doublons.
- L'utilisateur peut retirer son consentement marketing.
- Privacy request suit un workflow avec preuve et statut.
- Email non délivré est journalisé et peut être relancé sous permission.
- Les écrans admin appliquent les permissions backend et journalisent les actions sensibles.
- Tests unitaires, intégration PostgreSQL, API, anti-abus et E2E réussissent.

## 10.2 Compte et membre
- Invitation requise ou autorisation exceptionnelle documentée.
- Vérification email/téléphone selon politique.
- Session révocable et récupération sécurisée.
- Profil distinct de l'identité.
- Photo non publiée avant validation.
- Date de naissance non exposée ; âge calculé.
- Profil et préférences contrôlables par l'utilisateur.
- Suppression et rétention testées.

## 10.3 Matching et messagerie
- Pas de Match unilatéral si la règle réciproque est retenue.
- Pas de conversation sans condition de Match/autorisation.
- Block stoppe immédiatement l'interaction selon contrat.
- Report accessible dans le contexte concerné.
- Rate limit et protections anti-abus testées.
- Les données privées ne sont pas présentes dans les logs.
- Le comportement E2EE est bloqué tant que la décision n'est pas prise.

## 10.4 Trust & Safety
- Toute plainte crée un dossier traçable.
- Les accès à la preuve sont contrôlés et audités.
- Décision, motif, opérateur, temps, appel et résolution sont historisés.
- Les équipes ont des files, scopes et SLA définis.
- Les fonctionnalités critiques de sécurité sont gratuites.

## 10.5 Gate de lancement
Aucun lancement public si :
- incident P0/P1 non résolu ;
- report/block/modération ne fonctionne pas ;
- accès admin non protégé par MFA et permissions ;
- isolation multi-tenant/utilisateur non testée ;
- sauvegarde/restauration non éprouvée ;
- flux waitlist/privacy non opérationnel ;
- support et escalade indisponibles ;
- vulnérabilités critiques non traitées ;
- politiques stores et revue juridique nécessaires non effectuées.

# 11. Risques et dépendances
1. Densité locale insuffisante : cohorte, zones et rythme d'invitation à piloter.
2. Faux profils et fraude : vérification progressive, modération et limites.
3. Harcèlement et contenus abusifs : report/block, Trust & Safety et temps de réponse.
4. Exposition de données sensibles : minimisation, RLS, permissions, logs et stockage privé.
5. E2EE incompatible avec certaines capacités de modération : décision architecturale préalable.
6. Paiements Nigeria et stores : prestataires, KYC marchand, taxes, politiques et remboursements à rechercher.
7. NDPA et règles NDPC : revue juridique qualifiée avant lancement.
8. Marque « Ubwenzi » : recherche trademark, nom et domaines ; homonymes existants à clarifier.
9. Coûts d'acquisition, stockage, vérification et modération : budget et unit economics.
10. Architecture monorepo en migration : préserver API et CI lors du déplacement `apps/api` vers `backend/api`.

# 12. Décisions encore ouvertes
- Choix du fournisseur email/SMS/push et domaines d'envoi.
- Méthode et fournisseur de vérification âge/identité et niveau requis selon risque.
- E2EE ou chiffrement applicatif au repos et en transit uniquement au lancement.
- Règles de rétention, suppression, sauvegardes et preuve de modération.
- Algorithme de découverte, poids, fairness et modes.
- Règles exactes Like/Pass, demande/acceptation, unmatch et limites.
- Types de médias et audio au lancement.
- Fournisseurs paiement et parcours web/mobile.
- Prix, plans et entitlements finaux.
- Objectifs chiffrés de lancement, seuils de densité et KPI.
- Juridictions et conseil juridique Nigeria/expansion.
- Marque, trademark, domaines et assets photo définitifs.
- SLA support et Trust & Safety, horaires et couverture linguistique.

# 13. Livrables de spécification à produire
- MASTER-01 : vision, objectifs, portée et arbitrages.
- CAT-01 : catalogue D00-D16, cas d'usage et règles métier.
- CAT-02 : inventaire écrans, parcours, états, responsive et erreurs.
- DATA-01 : dictionnaire de données et propriété par domaine.
- IAM-01 : rôles, permissions, scopes, approbations et matrice d'accès.
- API-01 : contrats REST/OpenAPI.
- EVT-01 : événements métier et intégration.
- INT-01 : Supabase Auth, email/SMS, storage, paiement, analytics, vérification, stores.
- QA-01 : stratégie de tests, seuils, gates et scénarios.
- PRIV-01 : consentement, droits, rétention et suppression.
- SEC-01 : threat model, contrôle et preuve de sécurité.
- OPS-01 : environnements, CI/CD, sauvegarde, monitoring, incident, rollback.
- ROADMAP-01 : lots, dépendances, critères de sortie et calendrier.
- D07-SPEC : messagerie détaillée et décision E2EE.

# 14. Découpage MVP recommandé
**Lot 0 — Gouvernance & engineering** : architecture, repo, CI, conventions, contrats, environnements, secrets, DB tests.  
**Lot 1 — Platform & identity foundation** : configuration, Auth abstraction, permissions, audit, consentement, rate limiting, health/readiness.  
**Lot 2 — Waitlist complète** : landing, formulaire réel, API, email, cohorts, invitations, referral tracking, privacy, admin et analytics.  
**Lot 3 — Member onboarding** : invitation, identité, vérifications, profil, photos, préférences, privacy.  
**Lot 4 — Discovery & matching** : éligibilité, découverte, Like/Pass, Match, block/report.  
**Lot 5 — Messaging & safety** : conversation, messages, realtime, media, anti-abus, modération, sync ; E2EE seulement après décision.  
**Lot 6 — Beta operations** : admin complet, support, Trust & Safety, monitoring, analytics, runbooks, beta cohort.  
**Lot 7 — Public launch readiness** : charge, sécurité, juridique, restore, coûts, stores, rollback et rollout.  
**Lot 8 — Monetization** : plans, entitlements, paiement, remboursements, rapprochement, politiques stores.  
**Lot 9 — Expansion** : marchés, événements/partenaires et nouvelles langues/pays.

Les lots sont un ordre de travail recommandé, pas une autorisation automatique d'implémenter chaque fonctionnalité.

---
**Règle de gestion :** aucune fonctionnalité ne passe à « terminée » sans code, tests pertinents, permissions, observabilité, documentation, revue de sécurité/privacy si nécessaire et critères d'acceptation démontrés.
