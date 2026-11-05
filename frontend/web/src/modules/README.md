# Modules fonctionnels Web

Les fonctionnalités Web sont organisées par domaine métier. Chaque module possède ses pages, composants, hooks, schémas de validation, clients d'accès API et tests lorsqu'ils lui appartiennent. Les éléments réellement transversaux seulement vont dans `shared/`.

Les surfaces public, waitlist, membre, administration, Trust & Safety et partenaire restent des espaces de navigation/présentation ; elles ne deviennent pas des domaines métier concurrents.

Aucun écran ne simule une opération serveur. Une fonctionnalité n'est déclarée active qu'après intégration API et tests.
