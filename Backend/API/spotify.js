import axios from "axios";

function buscarCancion(clientId, clientSecret, searchQuery) {
    // Codificando las credenciales para la autenticación
    const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    // Configura la solicitud de token de acceso
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const tokenHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`,
    };
    const tokenData = 'grant_type=client_credentials';

    // Obtiene el token de acceso
    return axios.post(tokenUrl, tokenData, { headers: tokenHeaders })
        .then(response => {
        const accessToken = response.data.access_token;

        // Configura la solicitud para buscar una canción
        const searchUrl = 'https://api.spotify.com/v1/search';
        const searchHeaders = {
            'Authorization': `Bearer ${accessToken}`,
        };
        
        const searchParams = {
                q: searchQuery,
                type: 'track',
        };

        // Realiza la solicitud de búsqueda
        return axios.get(searchUrl, { headers: searchHeaders, params: searchParams });
        })
        .then(response => {
        return response.data.tracks.items;
        })
        .catch(error => {
        console.error('Error al buscar en la API de Spotify:', error);
        throw error; // Propaga el error para que pueda ser manejado externamente si es necesario
        });
}

// Ejemplo de uso
const clientId = '8130933d946e4eddbf215afdfe8e63ec';
const clientSecret = 'c0d2bd34630e425e8a002f9269c0ef49';
const searchQuery = 'Cure for me';

buscarCancion(clientId, clientSecret, searchQuery)
    .then(resultados => {
    console.log('Resultados de la búsqueda:', resultados);
    })
    .catch(error => {
    console.log("Me dio error el alonso XD:" , error);
    });
