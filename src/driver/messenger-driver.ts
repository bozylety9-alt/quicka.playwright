import { Page, Locator } from '@playwright/test';

export class MessengerDriver {
  constructor(private page: Page) {}

  // ═══════════════════════════════════════════════════════════
  // OUVERTURE DE CONVERSATION
  // ═══════════════════════════════════════════════════════════

  /**
   * Ouvrir une conversation par son ID (méthode la plus fiable)
   * L'ID se trouve dans l'URL : https://www.messenger.com/t/{ID}
   */
  async openConversationById(conversationId: string) {
    console.log(` Ouverture de la conversation ID: ${conversationId}`);
    await this.page.goto(`https://www.messenger.com/t/${conversationId}`);
    await this.page.waitForTimeout(5000);

    const url = this.page.url();
    if (!url.includes(`/t/${conversationId}`)) {
      throw new Error(` Échec ouverture. URL actuelle: ${url}`);
    }
    console.log(` Conversation ouverte: ${url}`);
  }

  /**
   * Ouvrir une conversation par son nom (fallback si ID inconnu)
   */
  async openConversationByName(name: string) {
    console.log(` Recherche de "${name}" dans la liste...`);
    await this.page.waitForTimeout(3000);

    const selector = `a[href*="/t/"]:has-text("${name}")`;
    const links = this.page.locator(selector);
    const count = await links.count();

    if (count === 0) {
      throw new Error(` Conversation "${name}" introuvable`);
    }
    await links.first().click();
    await this.page.waitForTimeout(3000);
    console.log(` Conversation "${name}" ouverte`);
  }

  // ═══════════════════════════════════════════════════════════
  // ENVOI DE MESSAGES
  // ═══════════════════════════════════════════════════════════

  /**
   * Envoyer un message texte dans la conversation active
   */
  async sendMessage(text: string) {
    console.log(` Envoi: "${text}"`);
    const input = await this.getMessageInput();
    await input.click();
    await input.fill(text);
    await this.page.waitForTimeout(300);
    await input.press('Enter');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Cliquer sur un bouton de réponse rapide (quick reply)
   */
  async clickButton(text: string) {
    console.log(` Clic bouton: "${text}"`);
    const selectors = [
      `[role="button"]:has-text("${text}")`,
      `button:has-text("${text}")`,
      `div[role="button"] >> text="${text}"`,
    ];

    for (const sel of selectors) {
      const loc = this.page.locator(sel);
      if ((await loc.count()) > 0) {
        await loc.first().click();
        await this.page.waitForTimeout(2000);
        return;
      }
    }
    throw new Error(` Bouton "${text}" introuvable`);
  }

  /**
   * Envoyer une photo
   */
  async sendPhoto(photoPath: string) {
    console.log(` Envoi photo: ${photoPath}`);

    // Ouvrir le menu "Joindre"
    const attachBtn = this.page.locator(
      '[aria-label="Joindre un fichier"], [aria-label="Attach a file"], [aria-label="Joindre"]'
    );
    if ((await attachBtn.count()) > 0) {
      await attachBtn.first().click();
      await this.page.waitForTimeout(1000);
    }

    // Envoyer le fichier
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(photoPath);
    await this.page.waitForTimeout(5000);
  }

  // ═══════════════════════════════════════════════════════════
  // RÉCUPÉRATION DES MESSAGES
  // ═══════════════════════════════════════════════════════════

  /**
   * Récupérer le dernier message du bot
   */
  async getLastMessage(): Promise<string> {
    const messages = await this.getAllMessages();
    return messages.length > 0 ? messages[messages.length - 1] : '';
  }

  /**
   * Récupérer tous les messages visibles
   */
  async getAllMessages(): Promise<string[]> {
    const messages: string[] = [];
    const messageElements = this.page.locator('[role="row"], [role="listitem"]');
    const count = await messageElements.count();

    for (let i = 0; i < count; i++) {
      const text = await messageElements.nth(i).textContent().catch(() => '');
      if (text && text.trim()) {
        messages.push(text.trim());
      }
    }
    return messages;
  }

  /**
   * Attendre qu'un message contenant un texte spécifique apparaisse
   */
  async waitForMessage(text: string, timeout = 30_000) {
    console.log(` Attente du message contenant: "${text}"`);
    await this.page.waitForSelector(`text=${text}`, { timeout });
    console.log(` Message détecté`);
  }

  /**
   * Vérifier si un message est présent (sans attendre)
   */
  async hasMessage(text: string): Promise<boolean> {
    const count = await this.page.locator(`text=${text}`).count();
    return count > 0;
  }

  // ═══════════════════════════════════════════════════════════
  // UTILITAIRES
  // ═══════════════════════════════════════════════════════════

  /**
   * Récupérer le champ de saisie du message (robuste)
   */
  private async getMessageInput(): Promise<Locator> {
    const selectors = [
      '[aria-label="Message"]',
      '[aria-label="Écrire un message..."]',
      '[aria-label="Write a message..."]',
      '[contenteditable="true"][role="textbox"]',
      'div[role="textbox"]',
      '[contenteditable="true"]',
    ];

    for (const sel of selectors) {
      const loc = this.page.locator(sel);
      if ((await loc.count()) > 0) {
        return loc.last();
      }
    }
    throw new Error(' Champ de message introuvable');
  }

  /**
   * Prendre une capture d'écran
   */
  async screenshot(name: string) {
    const path = `reports/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path, fullPage: true });
    console.log(` Screenshot: ${path}`);
  }
}