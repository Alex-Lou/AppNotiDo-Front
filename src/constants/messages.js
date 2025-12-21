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
  TITLE_SWITCH_TO_LIGHT: 'Passer en mode clair',
  TITLE_SWITCH_TO_DARK: 'Passer en mode sombre',
  LABEL_LIGHT_MODE: 'Mode clair',
  LABEL_DARK_MODE: 'Mode sombre',
};