function Mapa() {
    useEffect(() => {
        async function buscarLugares() {
        const apiKey = 'TU_CLAVE_DE_API'; // Reemplaza con tu propia clave de API
        const endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

        try {
            const response = await axios.get(endpoint, {
                params: {
                    query: 'restaurantes en ciudad de mexico', // Ejemplo de consulta de búsqueda
                    key: apiKey,
                },
        });

            // Manejar la respuesta de la API aquí
            console.log('Resultados de la búsqueda de lugares:', response.data.results);
            } catch (error) {
                console.error('Error al buscar lugares:', error);
            }
        }

        // Llama a la función para buscar lugares cuando el componente se monta
        buscarLugares();
    }, [])
}