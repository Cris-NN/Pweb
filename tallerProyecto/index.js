import * as cheerio from 'cheerio'
import axios from 'axios'
import fetch from "node-fetch"
import fs from 'fs';

async function iniciar() {
    const inputs = [{ page: "Ort", url: 'https://fi.ort.edu.uy/blog/los-10-lenguajes-de-programacion-mas-usados-actualmente' },
    { page: "Hostinger", url: 'https://www.hostinger.com.ar/tutoriales/mejores-lenguajes-de-programacion' },
    { page: "Teclab", url: 'https://teclab.edu.ar/tecnologia-y-desarrollo/lenguajes-de-programacion-mas-usados/' }
    ]

    let datos = [];
    for (let input of inputs) {
        const html = await getPage(input.url);
        datos.push(extraerDatos(input, html));
    }
    datos = datos.flat(1)

    let resultado = datos.reduce((acumulador, actual) => {
        let item = acumulador.find(item => item.nombreLenguaje === actual.nombreLenguaje);

        if (item) {
            item.posicion += actual.posicion;
        } else {
            acumulador.push({ ...actual });
        }

        return acumulador;
    }, []);
    const ordenado = resultado.sort((a, b) => b.posicion - a.posicion);
    await generarRanking(resultado.map(el => el.nombreLenguaje), ordenado.map(el => Math.ceil(el.posicion / 3)));
}


async function getPage(url) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url,
        headers: {}
    };
    return axios.request(config)
        .then((response) => {
            return response.data;
        })
}

function extraerDatos(input, html) {
    const $ = cheerio.load(html);
    if (input.page == "Ort") {
        const lenguajes = [...$('#type-ort-genericGontent h2 strong')].map(el => cheerio.load(el).text())
        return lenguajes.map((lenguaje, index) => {
            return {
                nombreLenguaje: lenguaje.match(/\d+\.\s*([a-zA-Z0-9\+#]+)/)[1].toLowerCase(),
                posicion: 100 - (index + 1) * 10,
            };
        });
    } else if (input.page == "Hostinger") {
        const lenguajes = [...$($('.ez-toc-list-level-3 li'))].map(el => cheerio.load(el).text())
        return lenguajes.map((lenguaje, index) => {
            return {
                nombreLenguaje: lenguaje.match(/\d+\.\s*([a-zA-Z0-9\+#]+)/)[1].toLowerCase(),
                posicion: 100 - (index + 1) * 10,
            };
        });
    } else {
        const lenguajes = [...$($('.wp-block-list a strong'))].map(el => cheerio.load(el).text())
        return lenguajes.map((lenguaje, index) => {
            return {
                nombreLenguaje: lenguaje.match(/\s*([a-zA-Z0-9\+#]+)/)[1].toLowerCase(),
                posicion: 100 - (index + 1) * 10,
            };
        });
    }
}

async function generarRanking(labels, scores) {
    const chartConfig = {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Valoracion",
                data: scores,
            }],
        },
    };
    const url = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync("rankingGrafico.png", buffer);
}

await iniciar();