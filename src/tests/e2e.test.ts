import { server } from '../mocks/server';
import puppeteer, { Browser } from 'puppeteer';

let browser: Browser;

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
  if (browser) {
    browser.close();
  }
});

test('UserPage should load user data and display user name', async () => {
  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Vai alla pagina dell'applicazione
  await page.goto('http://localhost:3000/users'); // Modifica con l'URL corretto della tua app

  // Aspetta che i dati degli utenti siano caricati
  await page.waitForSelector('.MuiDataGrid-root'); // Assicurati che il selettore corrisponda alla tua app

  // Verifica che i dati siano correttamente visualizzati
  const userName = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('.MuiDataGrid-cell'));
    const userElement = elements.find(
      (el) => el.textContent?.includes('Leanne Graham'),
    );
    return userElement ? userElement.textContent : null;
  });

  expect(userName).toContain('Leanne Graham');
}, 60000); // Imposta il timeout a 60 secondi
