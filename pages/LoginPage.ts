import {Page, Locator,expect} from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.submitButton = page.getByRole('button', {name: 'Log in'})
        this.errorMessage = page.locator('.alert, .error, [role = "alert"]').first();

     }    
    
        async goto(){
            await this.page.goto('https://quickabackend.accesbanquevousprotege.com/');
            await expect(this.usernameInput).toBeVisible();
        }

        async login (username: string, password:string){
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.submitButton.click();
        }

        async expectLoginSuccess(){
            await expect(this.page).not.toHaveURL('/#/landing/auth');
        }

        async expectLoginError(message?: string | RegExp) {
             await expect(this.errorMessage).toBeVisible();
            if (message) await expect(this.errorMessage).toContainText(message);
         }
   
}