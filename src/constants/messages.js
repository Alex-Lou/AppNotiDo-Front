// src/constants/messages.js

// ===== NOTIFICATIONS =====
export const NOTIFICATIONS = {
  BLOCKED: '🚫 Les notifications sont bloquées. Activez-les dans les paramètres du navigateur.',
  ACTIVATED: '🎉 Notifications activées !',
  ACTIVATED_BODY: 'Vous recevrez maintenant des alertes pour vos tâches.',
  REFUSED: '🚫 Notifications refusées',
  ERROR: '❌ Erreur lors de l\'activation des notifications',
  SEND_ERROR_CONSOLE: '❌ Erreur envoi notification :',
};

// ===== AUTH =====
export const AUTH = {
  // Titres
  APP_TITLE: '📝 AppNotiDo',
  APP_SUBTITLE: 'Gérez vos tâches efficacement',
  
  // Tabs
  TAB_LOGIN: 'Connexion',
  TAB_REGISTER: 'Inscription',
  
  // Labels
  LABEL_USERNAME: "Nom d'utilisateur",
  LABEL_EMAIL: 'Email',
  LABEL_PASSWORD: 'Mot de passe',
  LABEL_CONFIRM_PASSWORD: 'Confirmer le mot de passe',
  
  // Placeholders
  PLACEHOLDER_USERNAME: 'alice',
  PLACEHOLDER_EMAIL: 'alice@example.com',
  PLACEHOLDER_PASSWORD: '••••••••',
  
  // Boutons
  BUTTON_LOGIN: 'Se connecter',
  BUTTON_LOGIN_LOADING: 'Connexion...',
  BUTTON_REGISTER: "S'inscrire",
  BUTTON_REGISTER_LOADING: 'Inscription...',
  
  // Erreurs
  ERROR_INVALID_CREDENTIALS: 'Identifiants incorrects',
  ERROR_PASSWORDS_MISMATCH: 'Les mots de passe ne correspondent pas',
  ERROR_PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 6 caractères',
  ERROR_USERNAME_EXISTS: "Ce nom d'utilisateur existe déjà",
  ERROR_REGISTER_FAILED: "Erreur lors de l'inscription",
};

// ===== THEME =====
export const THEME = {
  FETCH_ERROR: '⚠️ Erreur lors de la récupération du thème, utilisation du thème local',
  SAVE_ERROR: '⚠️ Erreur lors de la sauvegarde du thème',
  CONTEXT_ERROR: 'useTheme doit être utilisé à l\'intérieur de ThemeProvider',
  TITLE_SWITCH_TO_LIGHT: 'Passer en mode clair',
  TITLE_SWITCH_TO_DARK: 'Passer en mode sombre',
  LABEL_LIGHT_MODE: 'Mode clair',
  LABEL_DARK_MODE: 'Mode sombre',
};

// ===== DASHBOARD =====
export const DASHBOARD = {
  GREETING: 'Bonjour',
  SUBTITLE: 'Voici un aperçu de vos tâches pour aujourd\'hui.',
  NEW_TASK: 'Nouvelle tâche',
  SEARCH_PLACEHOLDER: 'Rechercher par titre ou description...',
  SEARCH_COMPACT: 'Votre tâche ici...',
  EXPORT: 'Exporter',
  NO_RESULTS: 'Aucun résultat trouvé pour',
  RESULTS_COUNT: 'tâche(s) trouvée(s)',
  EMPTY_TASKS: 'Aucune tâche à afficher',
};

// ===== TASKS =====
export const TASKS = {
  // Statuts
  STATUS_ALL: '📋 Tous les statuts',
  STATUS_TODO: '📝 À faire',
  STATUS_IN_PROGRESS: '⏳ En cours',
  STATUS_DONE: '✅ Terminé',
  
  // Priorités
  PRIORITY_ALL: '🎯 Toutes priorités',
  PRIORITY_LOW: '🟢 Basse',
  PRIORITY_MEDIUM: '🟡 Moyenne',
  PRIORITY_HIGH: '🔴 Haute',
  
  // Actions
  EDIT: 'Modifier',
  DELETE: 'Supprimer',
  LOCK: 'Verrouiller',
  UNLOCK: 'Déverrouiller',
  SAVE: 'Enregistrer',
  CANCEL: 'Annuler',
  
  // Timer
  START_TIMER: 'Démarrer',
  PAUSE_TIMER: 'Pause',
  STOP_TIMER: 'Arrêter',
  TIME_SPENT: 'Temps passé',
  
  // Messages
  DELETE_CONFIRM: 'Voulez-vous vraiment supprimer cette tâche ?',
  LOCKED: 'Verrouillée',
  URGENT: 'Urgentes',
};

// ===== STATS =====
export const STATS = {
  TOTAL: 'TOTAL',
  TODO: 'À FAIRE',
  IN_PROGRESS: 'EN COURS',
  DONE: 'TERMINÉES',
  TOTAL_SUBTITLE: 'TÂCHES ENREGISTRÉES',
  TODO_SUBTITLE: 'EN ATTENTE',
  IN_PROGRESS_SUBTITLE: 'EN TRAITEMENT',
  DONE_SUBTITLE: 'COMPLÉTÉES',
};

// ===== SIDEBAR =====
export const SIDEBAR = {
  APP_NAME: 'AppNotiDo',
  QUICK_VIEWS: 'VUES RAPIDES',
  VIEW_IMPORTANT: 'Importantes',
  VIEW_TODAY: 'Aujourd\'hui',
  VIEW_THIS_WEEK: 'Cette semaine',
  VIEW_COMPLETED: 'Complétées',
  NOTIFICATIONS_BUTTON: 'Notifications',
  LOGOUT_BUTTON: 'Déconnexion',
  QUOTE_LABEL: 'CITATION DU JOUR',
  SHOW_QUOTE: 'Afficher une citation',
  URGENT_TASKS_TITLE: 'Tâches urgentes',
  URGENT_TASKS_DESC: 'Vous avez des tâches urgentes à traiter !',
};

// ===== RIGHT SIDEBAR =====
export const RIGHT_SIDEBAR = {
  DAY_SUMMARY: 'Résumé du jour',
  PROGRESS: 'Progression',
  COMPLETED: 'Terminées',
  IN_PROGRESS: 'En cours',
  URGENT_ALERT: 'tâche(s) urgente(s) !',
  UPCOMING: 'À venir',
  UPCOMING_EMPTY: 'Aucune tâche à venir',
  RECENT_ACTIVITY: 'Activité récente',
  ACTIVITY_EMPTY: 'Aucune activité récente',
  ACTIVITY_CREATED: 'Créée',
  ACTIVITY_COMPLETED: 'Terminée',
  ACTIVITY_UPDATED: 'Modifiée',
  DELETE_BUTTON: 'Supprimer',
};

// ===== PROFILE =====
export const PROFILE = {
  MODAL_TITLE: 'Mon Profil',
  MODAL_SUBTITLE: 'PARAMÈTRES UTILISATEUR',
  SECTION_INFO: 'Informations personnelles',
  SECTION_INFO_DESC: 'Modifiez vos informations de profil',
  SECTION_PASSWORD: 'Sécurité',
  SECTION_PASSWORD_DESC: 'Changez votre mot de passe',
  SECTION_DANGER: 'Zone dangereuse',
  SECTION_DANGER_DESC: 'Actions irréversibles sur votre compte',
  LABEL_USERNAME: 'Nom d\'utilisateur',
  LABEL_EMAIL: 'Adresse email',
  LABEL_CURRENT_PASSWORD: 'Mot de passe actuel',
  LABEL_NEW_PASSWORD: 'Nouveau mot de passe',
  LABEL_CONFIRM_PASSWORD: 'Confirmer le nouveau mot de passe',
  BUTTON_SAVE: 'Enregistrer',
  BUTTON_CHANGE_PASSWORD: 'Changer le mot de passe',
  BUTTON_DELETE_ACCOUNT: 'Supprimer mon compte',
  DELETE_CONFIRM: 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
};

// ===== ERRORS =====
export const ERRORS = {
  NETWORK: 'Erreur réseau. Vérifiez votre connexion.',
  SERVER: 'Erreur serveur. Réessayez plus tard.',
  UNAUTHORIZED: 'Session expirée. Reconnectez-vous.',
  NOT_FOUND: 'Ressource non trouvée.',
  VALIDATION: 'Données invalides.',
  UNKNOWN: 'Une erreur est survenue.',
};

// ===== SUCCESS =====
export const SUCCESS = {
  TASK_CREATED: 'Tâche créée avec succès !',
  TASK_UPDATED: 'Tâche mise à jour !',
  TASK_DELETED: 'Tâche supprimée !',
  PROFILE_UPDATED: 'Profil mis à jour !',
  PASSWORD_CHANGED: 'Mot de passe modifié !',
  ACCOUNT_DELETED: 'Compte supprimé.',
};

// ===== EXPORT =====
export const EXPORT = {
  BUTTON: 'Exporter',
  CSV_TITLE: 'Export CSV',
  CSV_DESC: 'Tableau (Excel, Sheets...)',
  PDF_TITLE: 'Export PDF',
  PDF_DESC: 'Document imprimable',
};

// Export par défaut de tous les messages
export const MESSAGES = {
  NOTIFICATIONS,
  AUTH,
  THEME,
  DASHBOARD,
  TASKS,
  STATS,
  SIDEBAR,
  RIGHT_SIDEBAR,
  PROFILE,
  ERRORS,
  SUCCESS,
  EXPORT,
};