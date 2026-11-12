const { chromium } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config({ override: true });

class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators 
    this.locators = {
      usernameInput: page.getByPlaceholder("Username"),
      passwordInput: page.getByPlaceholder("Password"),
      loginButton: page.locator("button[type='submit']"),
      errorMessage: page.locator(".oxd-alert-content-text"),
      dashboardHeading: page.getByRole('heading', { name: 'Dashboard' }),
    };
  }

  /**
   * Navigate to the login page and verify it loaded correctly
   */
  async navigateToLoginPage(timeout = 30000) {
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
      { waitUntil: "domcontentloaded" }
    );
    
    // Pastikan elemen input siap digunakan
    await this.locators.usernameInput.waitFor({ state: 'visible', timeout });
    await this.locators.passwordInput.waitFor({ state: 'visible', timeout });
  }

  /**
   * Perform login action with given credentials
   */
  async performLogin(username, password) {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.loginButton.click();
  }

  /**
   * Verify successful login by checking URL and dashboard heading
   */
  async verifySuccessfulLogin() {
    // Tunggu hingga URL berubah ke halaman dashboard (maksimal 15 detik)
    await this.page.waitForURL('**/dashboard/index', { timeout: 15000 });
    await this.locators.dashboardHeading.waitFor({ state: 'visible', timeout: 10000 });
    return true;
  }
}

async function globalSetup() {
  console.log('🚀 Starting global setup with authentication...');
  
  const authFile = 'authState.json';
  const browser = await chromium.launch({
    headless: process.env.CI ? true : false // Otomatis headless di CI, tampil UI saat run lokal
  });
  
  const context = await browser.newContext({
    viewport: { width: 1536, height: 695 }
  });
  
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  try {
    console.log('📱 Navigating to OrangeHRM login page...');
    await loginPage.navigateToLoginPage();
    
    // Gunakan prefix spesifik agar tidak tertimpa variabel USERNAME bawaan Windows
    const credentials = {
      username: process.env.ORANGEHRM_USERNAME || "Admin",
      password: process.env.ORANGEHRM_PASSWORD || "admin123",
    };
    
    console.log(`🔑 Performing login as: ${credentials.username}...`);
    await loginPage.performLogin(credentials.username, credentials.password);
    
    console.log('✅ Verifying successful login...');
    await loginPage.verifySuccessfulLogin();
    
    console.log('💾 Saving authentication state...');
    await context.storageState({ path: authFile });
    
    console.log('🎉 Authentication state saved successfully to authState.json!');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error.message);
    
    await page.screenshot({ 
      path: 'global-setup-error.png', 
      fullPage: true 
    });
    
    console.error('📸 Error screenshot saved as global-setup-error.png');
    throw error;
    
  } finally {
    await browser.close();
    console.log('🏁 Global setup completed!');
  }
}

module.exports = globalSetup;
