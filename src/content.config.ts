import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const url = z.string().url();

// Une source légale = un article précis + son état de vérification.
const sourceLegale = z.object({
  ref: z.string().min(3), // ex. « Code de la sécurité sociale, art. R142-1 »
  url: url.optional(), // lien Légifrance de l'article si connu
  statut: z.enum(['verifie', 'a_verifier']),
  note: z.string().optional(),
});

const lienOfficiel = z.object({ label: z.string(), url });

// Résumé court de la relecture IA juridique (avant validation humaine).
const revueIA = z.object({
  date: z.coerce.date(),
  verdict: z.enum(['confirme', 'douteux', 'a_corriger']),
  resume: z.string().min(10).max(800), // ~10 lignes max
});

const commun = {
  title: z.string().min(5),
  summary: z.string().min(20),
  organismes: z.array(z.enum(['CPAM', 'Ameli', 'Cramif', 'CAF', 'MSA', 'Autre'])).min(1),
  // Date ISO de la dernière vérification des sources (obligatoire).
  derniere_verification: z.coerce.date(),
  // Qui a relu : pseudo/identifiant GitHub, ou « aucun » tant que non relu.
  relecteur: z.string().min(1),
  statut_relecture: z.enum(['brouillon', 'verifie_ia', 'valide_humain']),
  sources_legales: z.array(sourceLegale).min(1),
  liens_officiels: z.array(lienOfficiel).min(1),
  revue_ia: revueIA.optional(),
};

// Règle : « valide_humain » exige un relecteur humain identifié.
const humainRequis = (d: { statut_relecture: string; relecteur: string }) =>
  d.statut_relecture !== 'valide_humain' || !/^aucun/i.test(d.relecteur);
const msg = { message: 'valide_humain exige un relecteur humain (pas « aucun »)', path: ['relecteur'] };

const fiches = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fiches' }),
  schema: z
    .object({
      ...commun,
      situation: z.string(), // ex. « arrêt de travail refusé »
      courriers: z.array(z.string()).default([]), // ids de modèles de courrier liés
    })
    .refine(humainRequis, msg),
});

const courriers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courriers' }),
  schema: z.object(commun).refine(humainRequis, msg),
});

export const collections = { fiches, courriers };
