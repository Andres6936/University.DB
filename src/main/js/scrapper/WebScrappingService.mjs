import cheerio from "cheerio";
import {IScrapperService} from './IScrapperService.mjs'

/**
 * Cheerio parses markup and provides an API for traversing/manipulating the
 * resulting data structure. It does not interpret the result as a web browser
 * does. Specifically, it does not produce a visual rendering, apply CSS, load
 * external resources, or execute JavaScript. This makes Cheerio much, much
 * faster than other solutions.
 */
export class WebScrappingService extends IScrapperService {
    #instance = undefined;

    constructor(html) {
        super();
        this.#instance = WebScrappingService.#parseNode(html);
    }

    static #parseNode(node) {
        return cheerio.load(node);
    }

    /**
     * @inheritDoc
     */
    parsePage(html) {
        this.#instance = WebScrappingService.#parseNode(html);
        return this;
    }

    getTextByNode(node) {
        return WebScrappingService.#parseNode(node).text();
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
