export const API_CONFIG = {
  baseUrl: process.env.BOT_API_URL || 'http://192.148.120.104:61445',
  testFbId: process.env.TEST_FB_ID || '',
  channel: process.env.TEST_CHANNEL || 'FACEBOOK',
};


export const BUTTONS = {
  // Navigation
  mesAssignations: 'D2E5DA5E-45D2-46BB-8B74-57ED0C051C5B',
  afficher: '7B59131A-289D-4FA4-39DA-3209CE5B8B39',
  continuer: '1658D757-78E8-4C07-BDD0-728FE4C633D0',
  reporter: '51B973D4-5AD2-47A4-BB61-8AC34E970CCF', // OK_CANCEL
  rejeter: '29BD60E1-06E2-45D2-B611-70AD23474F4D', // CONFIRM_REJECT_ASSESMENT

  // Choix binaires
  oui: '5B59131A-289D-4FA4-29DA-3209CE5B8B31', // YES_NO
  non: '5B59131A-289D-4FA4-29DA-3209CE5B8B32', // YES_NO / UPDATE_CUSTOMER_INFO

  // Nature client
  clientRecurrent: '26EF9686-12F6-4412-B740-4096EC0A2416', // QuickReply MessageContent (Nature du client)
  
  // Logement / Local
  locataire: '55E80BF7-803B-4910-824E-6DAEB9952995',
  proprietaire: 'A_CHERCHER_DANS_LA_BDD', // <-- À compléter (pas vu dans l'export)
  autreLogement: 'BC2BD94E-7C17-4EEE-AC7A-610493D8A42D',

  // Secteurs
  secteurCommerce: 'A_CHERCHER', 
  secteurProduction: 'C0372F91-8B74-4136-A432-7CAD91BF7F01',
  secteurTransport: '65483CFA-0085-49D6-972D-6CDB3663A67E',
  secteurService: '8EC6EC49-5275-497B-A0DA-0FA673FCDF95',
  secteurConsommation: 'E9A91922-8760-4F84-B07B-0E58D48805EC',
};

export const QUESTIONS = {
  nomPrenom: 'A3727E48-9638-4E0B-9A1E-2925F1DBC8AA',
  codeAgence: 'B1593A20-00BE-4CBA-B142-21C303E93A24',
  montant: 'DCA3AA81-0DEB-4756-8E41-1431AF5448D7',
  maturite: '44DBC143-AB3F-4450-AAB0-A411AB89B835',
  venteMinMax: 'A3EBB67A-7A14-4EF6-B159-0D9DD87F9319',
};