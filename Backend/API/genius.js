import axios from "axios";

const geniusApiToken = 'jJYdxIWKFaKtL6Pk3WyyNw4eilmwI0rFIbWdUPz_Czw2aHVfcado7azq2ZdsYTD1';
const songTitle = 'Cure For Me';
const artistName = 'AURORA';

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
            console.log(songUrl)

        // Realiza otra solicitud para obtener el contenido de la letra
        return axios.get(songUrl, { headers }).then(response => {
                    
                });
        } else {
        throw new Error('No se encontraron resultados');
    }
})
.catch(error => {
    console.error('Error:', error.message);
});
