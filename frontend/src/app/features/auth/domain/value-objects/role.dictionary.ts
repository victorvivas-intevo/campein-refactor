// role.dictionary.ts
export const ROLE_DICTIONARY: Record<string, string> = {
  'ADMIN_SISTEMA': 'Adm. sistema',
  'ADMIN_CAMPANA': 'Adm. campaña',
  'LIDER_ALFA': 'Líder alfa',
  'LIDER_BETA': 'Líder beta',
};

// Opcional: Una función utilitaria pura por si la necesitas en funciones TS
export function getRoleDisplayName(roleCode: string | undefined | null): string {
  if (!roleCode) return 'Desconocido';
  return ROLE_DICTIONARY[roleCode] || roleCode;
}