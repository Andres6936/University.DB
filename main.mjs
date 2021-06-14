import puppeteer from "puppeteer";
import fs from 'fs';

const url = 'Simea Dinas site:http://scienti.colciencias.gov.co';

async function getHtmlFromQuery(url) {
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
    await page.click('h3.LC20lb');
    return await page.content();
}

(async () => {
    const html = await getHtmlFromQuery(url);
    fs.writeFile('Output.html', html, (error) => {
        if (error) return console.log(error);
        console.log('Writing file > Output.html');
    });
})()
