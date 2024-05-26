export default async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const url = 'https://dev.obtenmas.com/catom/api/challenge/banks';

    // Lista de orígenes permitidos
    const allowedOrigins = [
        'https://luischvz.com',
        'https://luisenriquechavarriavazquez.github.io'
    ];

    // Obtiene el origen de la solicitud
    const origin = req.headers.origin;

    // Depura el origen recibido para verificar qué está llegando exactamente
    console.log('Origen recibido:', origin);

    // Verifica si el origen está en la lista blanca
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        // Si no está en la lista blanca, envía un error o no configures el header para CORS
        res.status(403).json({ message: "Acceso no permitido desde este origen." });
        return; // Detiene la ejecución si el origen no está permitido
    }

    // Configura otros encabezados CORS y métodos permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    try {
        const apiRes = await fetch(url);
        if (!apiRes.ok) throw new Error(`HTTP status ${apiRes.status}`);

        const data = await apiRes.json();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al conectar con la API', details: err.message });
    }
};
