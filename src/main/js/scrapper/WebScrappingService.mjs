const cheerio = require('cheerio');

export class WebScrappingService extends IScrapperService {
    constructor(html) {
        super(html);
        this.instace = cheerio.load(this.page);
    }

    getElementsBySelector(selector) {
        return this.instace(selector);
    }
}
