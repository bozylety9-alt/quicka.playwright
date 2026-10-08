import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentification', () => {
    let loginPage : LoginPage;

    test.beforeEach(async({page})=>{
        loginPage =  new LoginPage(page);
        await loginPage.goto();
    });

    test('Connexion réussie', async ({ page }) => {
        await loginPage.login(
            process.env.TEST_USER_EMAIL!,
            process.env.TEST_USER_PASSWORD!
        );
        await loginPage.expectLoginSuccess();
    });

    test('Échec avec mauvais mot de passe', async () => {
        await loginPage.login('utilisateur_test', 'mauvais_mdp');
        await loginPage.expectLoginError();
    });

    test('Échec avec champs vides', async ({ page }) => {
        await loginPage.submitButton.click();
        await expect(page).toHaveURL(/login/);
    });
});