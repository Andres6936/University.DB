import fs from 'fs';
import {BrowserQuery} from "./src/main/js/search/BrowserQuery.mjs";

const url = 'Simea Dinas site:http://scienti.colciencias.gov.co';

(async () => {
    const browserQuery = await new BrowserQuery();
    const html = await browserQuery.getHtmlByQuery(url);
    fs.writeFile('Output.html', html, (error) => {
        if (error) return console.log(error);
        console.log('Writing file > Output.html');
    });
    browserQuery.close();
})()
