const cheerio = require('cheerio');

class WebScrappingService extends IScrapperService {
    constructor(html) {
        super(html);
        this.instace = cheerio.load(this.page);
    }

    getElementsBySelector(selector) {
        return this.instace(selector);
    }
}
