import puppeteer from "puppeteer";

export class BrowserQuery {
    #browser = undefined;
    #page = undefined;

    async constructor() {
        this.#browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.#page = await this.#browser.newPage();
    }

    async getHtmlByQuery(query) {
        // Wait 1/2 second in each search
        // Ref: https://stackoverflow.com/a/49139664
        await new Promise(resolve => setTimeout(resolve, 500));
        await this.#page.goto('https://google.com');
        await this.#page.click('[name=q]');
        await this.#page.keyboard.type(query);
        await this.#page.keyboard.press('Enter');
        await this.#page.waitForSelector('h3.LC20lb', {timeout: 2500});
        await this.#page.click('h3.LC20lb');
        return await this.#page.content();
    }

    async close() {
        this.#browser.close();
    }
}
