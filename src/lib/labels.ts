export const relecture = {
  brouillon: { label: 'Brouillon, non relu', icon: '✎' },
  verifie_ia: { label: 'Relu par une IA juridique', icon: '◐' },
  valide_humain: { label: 'Validé par un humain', icon: '✓' },
} as const;

export const sourceStatut = {
  verifie: { label: 'Vérifié', icon: '✓' },
  a_verifier: { label: 'À vérifier', icon: '!' },
} as const;

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
