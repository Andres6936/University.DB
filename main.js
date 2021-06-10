const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000494089';

function extractPersonalInformation(node) {
    console.log(node);
}

axios.get(url, {responseEncoding: 'latin1'})
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const tableInfo = $('tr');
        for (const table of tableInfo) {
            //@type {string} The text of node
            const textNode = $(table).text();
            if (textNode.includes('Par evaluador reconocido por Minciencias')) {
                extractPersonalInformation(textNode);
            } else if (textNode.includes('Redes sociales académicas')) {

            } else if (textNode.includes('Identificadores de autor')) {

            } else if (textNode.includes('Formación Académica')) {

            } else if (textNode.includes('Formación Complementaria')) {

            }
        }
    })
    .catch(console.error);
