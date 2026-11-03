# UBWENZI Worker

Application séparée pour les consommateurs Outbox, traitements asynchrones, tâches planifiées, retries et dead-letter queue. Les traitements doivent être idempotents. Aucune route publique.

Cette étape réserve l'emplacement; aucun job métier n'est activé.
