const axios = require('axios');

const geniusApiToken = 'apikey';
const songTitle = 'nombre_de_la_cancion';
const artistName = 'nombre_del_artista';

const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(`${songTitle} ${artistName}`)}`;
const headers = {
    Authorization: `Bearer ${geniusApiToken}`,
};

// Realiza la solicitud a la API de Genius usando Axios
axios.get(apiUrl, { headers })
    .then(response => {
    // Verifica si la solicitud fue exitosa
        if (response.data.response && response.data.response.hits.length > 0) {
        // Obtiene la URL de la letra de la primera canción encontrada
            const songUrl = response.data.response.hits[0].result.url;

        // Realiza otra solicitud para obtener el contenido de la letra
        return axios.get(songUrl);
        } else {
        throw new Error('No se encontraron resultados');
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error:', error.message);
});
