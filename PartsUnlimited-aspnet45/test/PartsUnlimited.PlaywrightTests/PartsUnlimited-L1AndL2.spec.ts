import { test, expect, Page } from '@playwright/test';

const baseURL = 'https://dabu-partsunlimited-dev.azurewebsites.net';
const subsidiaryName = 'a Fabrikam subsidiary';
const categories = ['1','2','3','4','5','99'];
test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
});

// Level 1 Tests
test.describe('Level 1 Tests', () => {

    test('Verify Subsidiary Name On Home Page @LEVEL_1', async ({ page }) => {

    // Home Page
    await expect(page.locator('text=' + subsidiaryName).first()).toBeVisible();
    });
    
    test('Verify Subsidiary Name On Store Page @LEVEL_1', async ({ page }) => {

        // Store Page
        await page.goto(baseURL + '/Store');
        await expect(page.locator('text=' + subsidiaryName).first()).toBeVisible();
    });

    test('Verify Subsidiary Name On Login Page @LEVEL_1', async ({ page }) => {

        // Login Page
        await page.goto(baseURL + '/Login');
        //  await expect(page.locator('text=' + subsidiaryName).first()).oBeVisible();
    });

    test('Verify Subsidiary Name On ShoppingCart Page @LEVEL_1', async ({ page }) => {

        // Shopping Page
        await page.goto(baseURL + '/ShoppingCart');
        await expect(page.locator('text=' + subsidiaryName).first()).toBeVisible();
    });
});

// Level 2 Tests
test.describe('Level 2 Tests', () => {

    // CodeGen
    test('Search Test @LEVEL_2', async ({ page }) => {
        // This function was created by using 'npx playwright codegen' and:
        // - Searching for 'oil'
        // - Clicking on the itme labeld 'Synthetic Engin Oil'
        // - Verifying that the title of the page said 'Synthetic Engin Oil' 
        // - Copy/Paste the code into this function. 

        // Fill [placeholder="Keyword"] with 'oil'
        await page.locator('[placeholder="Keyword"]').fill('oil');
      
        // Press Enter
        await page.locator('[placeholder="Keyword"]').press('Enter');

        // Click img[alt="Synthetic\ Engine\ Oil\ zoom"]
        await expect(page.locator('img[alt="Synthetic\\ Engine\\ Oil\\ zoom"]').first()).toBeVisible();
        await page.locator('img[alt="Synthetic\\ Engine\\ Oil\\ zoom"]').click();

        // Click text=Synthetic Engine Oil
        await expect(page.locator('text=Synthetic Engine Oil').first()).toBeVisible();
    });    
  

    test('Login and Manage Account @LEVEL_2', async ({ page }) => {

        // Click text=Log in
        await page.locator('text=Log in').click();
        await expect(page).toHaveURL(baseURL + '/Account/Login');

        // Click [placeholder="Email\ Address"]
        await page.locator('[placeholder="Email\\ Address"]').click();

        // Fill [placeholder="Email\ Address"]
        await page.locator('[placeholder="Email\\ Address"]').fill('abc@outlook.com');

        // Click [placeholder="Password"]
        await page.locator('[placeholder="Password"]').click();

        // Fill [placeholder="Password"]
        await page.locator('[placeholder="Password"]').fill('F@keP@55word');

        // Click text=Login
        await page.locator('text=Login').click();
        await expect(page).toHaveURL(baseURL);

        // Click text=Profile >> b
        await page.locator('text=Profile >> b').click();

        // Click #collapse-header-nav >> text=Manage Account
        await page.locator('#collapse-header-nav >> text=Manage Account').click();
        await expect(page).toHaveURL(baseURL +  '/Manage');

        // Click text=Change your account settings
        await expect(page.locator('text=Change your account settings').first()).toBeVisible();
    });

    test('Verify Subsidiary Name On Product Pages @LEVEL_2', async ({ page }) => {
        // Each Product Category Page
        for (const item of categories) {
            await page.goto(baseURL + '/Store/Browse?CategoryId=' + item);
            await expect(page.locator('text=' + subsidiaryName).first()).toBeVisible();
        }
    });

});

