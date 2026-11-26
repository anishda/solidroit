# Contribuer

Ce projet est une aide à l'information, **pas du conseil juridique**. La fiabilité prime sur l'exhaustivité.

## Règles de contenu
1. **Rien d'inventé** : toute affirmation juridique cite un article précis (Code de la sécurité sociale, CRPA, etc.) dans `sources_legales`.
2. `statut: verifie` uniquement si l'article a été relu sur [Légifrance](https://www.legifrance.gouv.fr) ; sinon `a_verifier`.
3. `derniere_verification` = date de la dernière relecture des sources. `relecteur` = identifiant GitHub.
4. `statut_relecture` : `brouillon` → `verifie_ia` (vérification par IA juridique) → `valide_humain` (relecture humaine finale, obligatoire avant d'afficher une fiche comme fiable).
5. **Aucune donnée personnelle** dans les retours d'usagers (anonymisez).
6. Liens officiels uniquement (`.gouv.fr`, `ameli.fr`, `caf.fr`, `service-public.fr`…).

## Workflow
1. Fork + branche (`fiche/<sujet>` ou `fix/<sujet>`).
2. Ajouter/modifier un fichier dans `src/content/fiches` ou `src/content/courriers` (copier une fiche existante).
3. `npm ci && npm run build` : le build échoue si le front-matter est invalide.
4. Ouvrir une PR avec le template ; la CI vérifie le build et les liens.
5. Une personne relit les sources avant fusion ; l'IA juridique peut servir d'aide à la vérification, jamais de validation finale.

## Signaler une erreur
Ouvrir une issue avec la fiche concernée, l'article cité et la source contradictoire.
