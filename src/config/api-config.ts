export const API_CONFIG = {
  baseUrl: process.env.BOT_API_URL || 'http://192.168.160.104:61445',
  testFbId: process.env.TEST_FB_ID || '31722948147349726',
  channel: process.env.TEST_CHANNEL || 'FACEBOOK',
  timeout: 30_000,
};