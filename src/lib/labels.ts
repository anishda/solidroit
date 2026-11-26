export const relecture = {
  brouillon: { label: 'Brouillon' },
  verifie_ia: { label: 'Relu par IA' },
  valide_humain: { label: 'Validé' },
} as const;

export const sourceStatut = {
  verifie: { label: 'Vérifié' },
  a_verifier: { label: 'À vérifier' },
} as const;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// « Code de la sécurité sociale, art. L553-1 (prescription…) » → { ref: 'CSS L553-1', desc: 'prescription…' }
export function splitSource(ref: string) {
  const short = ref
    .replace(/^Code de la sécurité sociale, art\. /, 'CSS ')
    .replace(/^Code des relations entre le public et l'administration, art\. /, 'CRPA ');
  const m = short.match(/^(.*?)\s*\((.*)\)\s*$/);
  return m ? { ref: m[1], desc: m[2] } : { ref: short, desc: '' };
}
