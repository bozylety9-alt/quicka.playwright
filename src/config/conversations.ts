/**
 * IDs des conversations Messenger
 * 
 * Pour trouver l'ID d'une conversation :
 * 1. Ouvrir Messenger manuellement
 * 2. Cliquer sur la conversation
 * 3. L'URL ressemble à https://www.messenger.com/t/123456789
 * 4. L'ID est 123456789
 */

export const CONVERSATIONS = {
  //  Bot principal à tester
  QUICKA_DEV_1: '100757431516152',
  
  // Autres bots (pour référence)
  QUICKA_MAIN: '648255285787769',
  MYACCES_DEV: '401246307164574',
  MYACCES_PREPROD: '104851191578481',
  MYACCES_PREPROD_BACKUP: '903479342839003',
  ACCESCASH_BIS: '101236295999282',
} as const;

export type ConversationKey = keyof typeof CONVERSATIONS;

// Raccourci pour le bot à tester
export const TEST_BOT_ID = CONVERSATIONS.QUICKA_DEV_1;