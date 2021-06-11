const cheerio = require('cheerio');

class WebScrappingService extends IScrapperService {
    constructor(page) {
        super(page);
        this.instace = cheerio.load(this.page);
    }

    getElementsBySelector(selector) {
        return this.instace(selector);
    }
}
