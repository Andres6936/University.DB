import axios from "axios";
import cheerio from 'cheerio';
import {App} from "./src/main/js/App.mjs";
import {KeyValueNodeExtractor} from "./src/main/js/scrapper/KeyValueNodeExtractor.mjs";
import {TranslationService} from "./src/main/js/TranslationService.mjs";
import {NormalizeStringService} from "./src/main/js/NormalizeStringService.mjs";

const url = 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000494089';

function extractPersonalInformation(node) {
    let nodes = new KeyValueNodeExtractor(node).toArray();
    for (const node of nodes) {
        let value = NormalizeStringService.removeExtraSpaces(node.second)
        value = NormalizeStringService.removeLineBreak(value);
        node.second = value;
    }
    new TranslationService().translateArrayPair(nodes)
        .then(result => {
            for (const object of result) {
                console.log(object.toString());
            }
        });
}

function extractSocialNetworks() {

}

function extractAcademicInformation(node) {

}

function extractComplementaryInformation() {

}

function extractProfessionalExperience() {

}

function extractImpactAreas() {

}

function extractLanguages() {

}

//
// axios.get(url, {responseEncoding: 'latin1'})
//     .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         const tableInfo = $('tr');
//         for (const table of tableInfo) {
//             //@type {string} The text of node
//             const textNode = $(table).text();
//             if (textNode.includes('Par evaluador reconocido por Minciencias')) {
//                 extractPersonalInformation(table);
//             } else if (textNode.includes('Redes sociales académicas')) {
//
//             } else if (textNode.includes('Identificadores de autor')) {
//
//             } else if (textNode.includes('Formación Académica')) {
//                 extractAcademicInformation(table);
//             } else if (textNode.includes('Formación Complementaria')) {
//
//             } else if (textNode.includes('Experiencia profesional')) {
//
//             } else if (textNode.includes('Áreas de actuación')) {
//
//             } else if (textNode.includes('Idiomas')) {
//
//             } else if (textNode.includes('Líneas de investigación')) {
//
//             } else if (textNode.includes('Reconocimientos')) {
//
//             } else if (textNode.includes('Cursos de corta duración')) {
//
//             } else if (textNode.includes('Trabajos dirigidos/tutorías')) {
//
//             } else if (textNode.includes('Jurado en comités de evaluación')) {
//
//             } else if (textNode.includes('Participación en comités de evaluación')) {
//
//             } else if (textNode.includes('Par evaluador')) {
//
//             } else if (textNode.includes('Eventos científicos')) {
//
//             } else if (textNode.includes('Redes de conocimiento especializado')) {
//
//             } else if (textNode.includes('Espacios de participación ciudadana')) {
//
//             } else if (textNode.includes('Artículos')) {
//
//             } else if (textNode.includes('Capitulos de libro')) {
//
//             } else if (textNode.includes('Documentos de trabajo')) {
//
//             } else if (textNode.includes('Softwares')) {
//
//             }
//         }
//     })
//     .catch(console.error);

(async () => {
    await new App().startUp()
})()
