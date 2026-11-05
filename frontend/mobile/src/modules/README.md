# Modules fonctionnels Mobile

Les fonctionnalités Android/iOS sont organisées par domaine métier et consomment les contrats API UBWENZI. Les règles métier et autorisations restent côté serveur.

Les modules mobiles isolent écrans, composants, hooks, services, validation, stockage sécurisé et tests. Aucun secret ni jeton de longue durée ne doit être stocké dans un espace non sécurisé.

Ne créer les fichiers d'un module qu'au moment de son implémentation réelle.
