import { server } from '../mocks/server';
import puppeteer, { Browser } from 'puppeteer';

let browser: Browser;

/**
 * Set up the server and start listening before all tests.
 */
beforeAll(() => {
  server.listen();
});

/**
 * Close the server and the browser after all tests.
 */
afterAll(() => {
  server.close();
  if (browser) {
    browser.close();
  }
});

/**
 * Test that the UserPage loads user data and displays the user name.
 * @returns {Promise<void>}
 */
test('UserPage should load user data and display user name', async () => {
  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set up request interception to mock any additional requests if needed
  await page.setRequestInterception(false);

  // Navigate to the application page
  await page.goto('http://localhost:3000/users'); // Modify with the correct URL of your app

  // Wait for the user data to be loaded
  await page.waitForSelector('.MuiDataGrid-root'); // Ensure the selector matches your app

  // Verify that the user data is correctly displayed
  const userName = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('.MuiDataGrid-cell'));
    const userElement = elements.find(
      (el) => el.textContent?.includes('Leanne Graham'),
    );
    return userElement ? userElement.textContent : null;
  });

  // Check if the user name is displayed correctly
  expect(userName).toContain('Leanne Graham');
}, 60000); // Set the timeout to 60 seconds
