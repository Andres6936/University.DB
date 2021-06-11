import cheerio from "cheerio";
import {IScrapperService} from './IScrapperService.mjs'

export class WebScrappingService extends IScrapperService {
    #instance = undefined;

    constructor(html) {
        super();
        this.#instance = cheerio.load(html);
    }

    /**
     * @inheritDoc
     */
    parsePage(html) {
        this.#instance = cheerio.load(html)
        return this;
    }

    /**
     * @inheritDoc
     */
    getElementsBySelector(selector) {
        return this.#instance(selector);
    }

    toText() {
        return this.#instance.text();
    }

    toHTML() {
        return this.#instance.html();
    }
}
