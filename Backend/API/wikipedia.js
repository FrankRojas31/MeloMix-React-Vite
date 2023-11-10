const axios = require('axios');

function buscarEnWikipedia(termino) {
    // URL de la API de Wikipedia
    const url = "https://es.wikipedia.org/w/api.php";

    // Parámetros de la solicitud
    const params = {
        action: 'query',
        format: 'json',
        titles: termino,
        prop: 'extracts',
        exintro: true,  // Obtener solo la introducción
    };

    // Realizar la solicitud con Axios
    return axios.get(url, { params })
        .then(response => {
        // Extraer el contenido de la página
        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        return extract;
        })
        .catch(error => {
        console.error("Error al buscar en Wikipedia:", error);
        });
    }

// Ejemplo de uso
    const terminoBusqueda = "JavaScript";
    buscarEnWikipedia(terminoBusqueda)
    .then(resultado => {
        console.log(resultado);
    });
