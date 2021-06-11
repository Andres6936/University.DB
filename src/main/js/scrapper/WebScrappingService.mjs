import cheerio from "cheerio";
import {IScrapperService} from './IScrapperService.mjs'

export class WebScrappingService extends IScrapperService {
    constructor(html) {
        super(html);
        this.instace = cheerio.load(this.page);
    }

    /**
     * @inheritDoc
     */
    parsePage(html) {
        this.instace(html)
        return this;
    }

    /**
     * @inheritDoc
     */
    getElementsBySelector(selector) {
        return this.instace(selector);
    }
}
