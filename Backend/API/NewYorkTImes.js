import axios from "axios";

const apiKey = '3UqmIPMMCYATjTs2xzWkwAPWJ3tdwN9W';
const apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const searchTerm = 'music';

axios.get(apiUrl, {
    headers: {
        'api-key': apiKey,
    },
    params: {
        q: searchTerm,
    },
})
    .then(response => {
        const docs = response.data.response.docs;
        docs.forEach(doc => {
            console.log('Titulo:', doc.headline.main);
            console.log('Resumen:', doc.abstract);
            console.log('URL:', doc.web_url);
            console.log('------------------------');
        });
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
