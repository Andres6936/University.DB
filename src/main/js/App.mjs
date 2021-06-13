import axios from "axios";
import {WebScrappingService} from "./scrapper/WebScrappingService.mjs";
import {AcademicInformation} from "./scrapper/AcademicInformation.mjs";
import {PersonalInformation} from "./scrapper/PersonalInformation.mjs";

export class App {
    async startUp() {
        const html = (await axios.get('http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000494089', {responseEncoding: 'latin1'})).data
        const webScrapper = new WebScrappingService(html);
        const tables = webScrapper.getElementsBySelector('tr');
        for (const table of tables) {
            //@type {string} The text of node
            const text = webScrapper.parsePage(table).toText();
            if (text.includes('Par evaluador reconocido por Minciencias')) {
                new PersonalInformation().start(table);
            } else if (text.includes('Formación Académica')) {
                new AcademicInformation().start(table);
            }
        }
    }
}
