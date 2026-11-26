# Solidroit

Site statique collaboratif (Astro) : que faire en cas d'incident avec Ameli/CPAM/Cramif/CAF. Fiches par situation, sources légales, liens officiels, courriers types. **Information, pas conseil juridique.**

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # valide aussi le front-matter
npm run check:links  # vérifie les URLs (réseau requis)
```

- Contenu : `src/content/fiches`, `src/content/courriers` (schéma : `src/content.config.ts`).
- Contribuer : voir `CONTRIBUTING.md`.
- État actuel : 3 fiches pilotes et 2 modèles, tous en `brouillon` (aucune relecture humaine).

## Licences
Code : AGPL-3.0 (`LICENSE`). Contenu : CC BY-SA 4.0 (`CONTENT-LICENSE.md`).

## Déploiement (YunoHost, app My Webapp)
`deploy.yml` (déclenchement manuel) construit le site et le synchronise par rsync/SSH. Secrets GitHub : `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`. Nom du site : variable `PUBLIC_SITE_NAME` ; URL : `SITE_URL`. Accès SFTP/rsync de My Webapp non vérifié.
