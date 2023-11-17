import axios from "axios";

const apiKey = 'AIzaSyD7IikkRs_9W3rY1jbW4dVLzF8Gs8gC-o0'; // Esto te lo paso por .env en el repositorio.


function buscarVideos(query) {
    const url = 'https://www.googleapis.com/youtube/v3/search';

    const params = {
        part: 'snippet',
        q: query,
        type: 'video',
        key: apiKey,
    };

    return axios.get(url, { params })
        .then(response => {
        // La respuesta contiene la información de los videos
        return response.data.items;
        })
        .catch(error => {
        console.error('Error al buscar videos en YouTube:', error);
    });
}

    // Ejemplo de uso
    const terminoBusqueda = 'cure for me official video ';
    buscarVideos(terminoBusqueda)
    .then(videos => {
        console.log('Videos encontrados:', videos);
    });