import cheerio from "cheerio";
import {IScrapperService} from './IScrapperService.mjs'

export class WebScrappingService extends IScrapperService {
    constructor(html) {
        super();
        this.#instace = cheerio.load(html);
    }

    /**
     * @inheritDoc
     */
    parsePage(html) {
        this.#instace = cheerio.load(html)
        return this;
    }

    /**
     * @inheritDoc
     */
    getElementsBySelector(selector) {
        return this.#instace(selector);
    }

    toText() {
        return this.#instace.text();
    }

    toHTML() {
        return this.#instace.html();
    }
}
