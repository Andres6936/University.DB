const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000494089';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const tableInfo = $('table > tbody');
        for (const table of tableInfo) {
            console.info($(table).text())

        }
    })
    .catch(console.error);
