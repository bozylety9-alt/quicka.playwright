import { request, APIRequestContext } from '@playwright/test';
import { API_CONFIG } from '../config/api-config';

export interface BotResponse {
  isSuccess?: boolean;
  content?: any;
  fbId?: string;
  channel?: string;
  message?: string;
  text?: string;
  buttons?: any[];
  quick_replies?: any[];
  [key: string]: any;
}

export class ApiDriver {
  private ctx!: APIRequestContext;
  public fbId: string;

  constructor(fbId?: string) {
    this.fbId = fbId || API_CONFIG.testFbId;
  }

  async init() {
    this.ctx = await request.newContext({
      baseURL: API_CONFIG.baseUrl,
      timeout: API_CONFIG.timeout,
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
    console.log('API Driver pret:', API_CONFIG.baseUrl);
  }

  async close() {
    await this.ctx.dispose();
  }

  async post(content: any): Promise<BotResponse> {
    const res = await this.ctx.post('/api/quicka/post', {
      data: {
        isTest: true,
        fbId: this.fbId,
        content,
        channel: API_CONFIG.channel,
        lon: 0,
        lat: 0,
      },
    });
    if (!res.ok()) {
      throw new Error(`HTTP ${res.status()}: ${await res.text()}`);
    }
    return await res.json();
  }

  async sendMessage(text: string): Promise<BotResponse> {
    return await this.post(text);
  }

  async clickButton(payload: string): Promise<BotResponse> {
    return await this.post(payload);
  }

  async sendPhoto(photoUrl: string): Promise<BotResponse> {
    return await this.post(photoUrl);
  }

  async sendLocation(lat: number, lon: number): Promise<BotResponse> {
    const res = await this.ctx.post('/api/quicka/geoloc', {
      data: {
        isTest: true,
        fbId: this.fbId,
        content: {
          fbId: this.fbId,
          lat,
          lon,
          channel: API_CONFIG.channel,
        },
        channel: API_CONFIG.channel,
        lon,
        lat,
      },
    });
    if (!res.ok()) {
      throw new Error(`HTTP ${res.status()}: ${await res.text()}`);
    }
    return await res.json();
  }
}