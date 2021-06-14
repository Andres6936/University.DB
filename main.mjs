import puppeteer from "puppeteer";

const url = 'Simea Dinas site:http://scienti.colciencias.gov.co';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.click('[name=q]');
    await page.keyboard.type(url);
    await page.keyboard.press('Enter');
    await page.waitForSelector('h3.LC20lb', {timeout: 2500});
    await page.evaluate(() => {
        document.querySelectorAll('h3.LC20lb').item(0).click();
    })
})()
