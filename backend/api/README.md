# UBWENZI API

Application HTTP NestJS + Fastify. Le backend est l'autorité métier et expose une API REST versionnée sous `/api/v1`. Les modules métier respectent leurs frontières et l'autorisation est toujours vérifiée côté serveur.

## D02 — Waitlist & Acquisition

- `POST /api/v1/waitlist/registrations`
- Payload: `email`, `marketCode` (ISO 3166-1 alpha-2), `isAdultConfirmed`, `consentToWaitlistUpdates`.
- L'API valide les données, enregistre le consentement et crée une entrée `PENDING_VERIFICATION` avec un message de vérification dans l'outbox D02, dans une transaction PostgreSQL.
- Le secret de vérification est chiffré AES-256-GCM avant son stockage dans l'outbox. Configurer `WAITLIST_OUTBOX_ENCRYPTION_KEY` avec 32 octets encodés en base64. Ne jamais exposer cette clé au navigateur.
- Les doublons ne révèlent pas si une adresse existe déjà.

## État et limites

Cette fondation ne constitue pas encore un parcours de waitlist prêt pour le public. Le worker de livraison, le fournisseur e-mail, le endpoint de confirmation, les limites de débit/bot protection, la gestion de désinscription/suppression, les autorisations administratives et les tests d'intégration restent à construire et vérifier. La migration SQL n'a pas été appliquée à un environnement Supabase.
