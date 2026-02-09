export const ROLE_DEFINITIONS = {
  ADMIN_SISTEMA: {
    canManageTenants: true,
    canManageAllUsers: true,
  },
  ADMIN_CAMPANA: {
    canManageCampaign: true,
    canViewAllCampaignUsers: true,
  },
  LIDER_ALFA: {
    canViewSubordinates: true,
    canAssignForms: true,
  },
  LIDER_BETA: {
    canCollectData: true,
    canViewOwnData: true,
  },
};

export type UserRole = keyof typeof ROLE_DEFINITIONS;
