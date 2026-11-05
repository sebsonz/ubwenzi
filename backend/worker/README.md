# UBWENZI Worker

Application séparée pour les consommateurs Outbox, traitements asynchrones, tâches planifiées, retries et dead-letter queue. Les traitements doivent être idempotents. Aucune route publique.

## D02 — Email de vérification

Le processus lit `acquisition.waitlist_email_outbox` avec verrouillage PostgreSQL (`FOR UPDATE SKIP LOCKED`), déchiffre le jeton AES-256-GCM, envoie le message via l'adaptateur Resend et efface le payload sensible après succès. Les erreurs sont enregistrées sous forme de codes techniques non sensibles avec reprise exponentielle, jusqu'à cinq tentatives.

Variables requises dans `.env` :
- `DATABASE_URL` : rôle PostgreSQL serveur autorisé sur le schéma acquisition.
- `WAITLIST_OUTBOX_ENCRYPTION_KEY` : clé base64 de 32 octets, identique à celle de l'API.
- `RESEND_API_KEY` : clé API Resend, serveur uniquement.
- `EMAIL_FROM` : expéditeur vérifié dans Resend.
- `PUBLIC_WEB_URL` : origine du site public.

Commandes : `npm run dev --workspace @ubwenzi/worker`, `npm run build --workspace @ubwenzi/worker`.

Le worker prépare l'envoi mais le parcours ne doit pas être ouvert au public avant la mise en place de la route de confirmation, du rate limiting/anti-bot, de la gestion de suppression/désinscription et des tests E2E.
