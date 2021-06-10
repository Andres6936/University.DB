const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000494089';

function extractPersonalInformation(node) {
    const $ = cheerio.load(node);
    const elements = $('tr')
    const information = [];
    for (const element of elements) {
        const keyPair = $(element).find('td')
        if (keyPair.length === 2) {
            const keyString = $(keyPair.get(0)).text();
            const valueString = $(keyPair.get(1)).text();
            const personal = {};
            // We can remove all line breaks by using a regex to match all the line breaks by writing:
            // str = str.replace(/(\r\n|\n|\r)/gm, "");
            // \r\n is the CRLF line break used by Windows.
            // \n is a LF line break used by everything else.
            // \r is a carriage return.
            // g gets all instances of the line breaks.
            // We replace them all with empty strings to remove them.
            personal[keyString] = valueString.trim()
                .replace(/(\r\n|\n|\r)/gm, "")
                // Remove any amount of spaces for a single space
                .replace(/\s+/g, ' ');
            information.push(personal)
        }
    }
    console.info(information)
}

function extractSocialNetworks() {

}

function extractAcademicInformation() {

}

function extractComplementaryInformation() {

}

function extractProfessionalExperience() {

}

function extractImpactAreas() {

}

function extractLanguages() {

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
                extractPersonalInformation(table);
            } else if (textNode.includes('Redes sociales académicas')) {

            } else if (textNode.includes('Identificadores de autor')) {

            } else if (textNode.includes('Formación Académica')) {

            } else if (textNode.includes('Formación Complementaria')) {

            } else if (textNode.includes('Experiencia profesional')) {

            } else if (textNode.includes('Áreas de actuación')) {

            } else if (textNode.includes('Idiomas')) {

            } else if (textNode.includes('Líneas de investigación')) {

            } else if (textNode.includes('Reconocimientos')) {

            } else if (textNode.includes('Cursos de corta duración')) {

            } else if (textNode.includes('Trabajos dirigidos/tutorías')) {

            } else if (textNode.includes('Jurado en comités de evaluación')) {

            } else if (textNode.includes('Participación en comités de evaluación')) {

            } else if (textNode.includes('Par evaluador')) {

            } else if (textNode.includes('Eventos científicos')) {

            } else if (textNode.includes('Redes de conocimiento especializado')) {

            } else if (textNode.includes('Espacios de participación ciudadana')) {

            } else if (textNode.includes('Artículos')) {

            } else if (textNode.includes('Capitulos de libro')) {

            } else if (textNode.includes('Documentos de trabajo')) {

            } else if (textNode.includes('Softwares')) {

            }
        }
    })
    .catch(console.error);
