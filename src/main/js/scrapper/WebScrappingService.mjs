import cheerio from "cheerio";
import {IScrapperService} from './IScrapperService.mjs'

export class WebScrappingService extends IScrapperService {
    #instance = undefined;

    constructor(html) {
        super();
        this.#instance = this.#parseNode(html);
    }

    static #parseNode(node) {
        return cheerio.load(node);
    }

    /**
     * @inheritDoc
     */
    parsePage(html) {
        this.#instance = this.#parseNode(html);
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
