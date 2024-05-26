// api/server.js
export default async (req, res) => {
    // Importación dinámica de 'node-fetch' para optimizar el empaquetado en plataformas como Vercel.
    // Esto permite que Vercel sólo incluya 'node-fetch' cuando realmente se necesite en tiempo de ejecución.
    const fetch = (await import('node-fetch')).default;

    // URL de la API externa a la que se harán las peticiones para obtener datos de bancos.
    // Esta URL es específica del proveedor 'dev.obtenmas.com' bajo el endpoint 'catom/api/challenge/banks'.
    const url = 'https://dev.obtenmas.com/catom/api/challenge/banks';

    // Configuración de CORS para aumentar la seguridad limitando los orígenes que pueden hacer solicitudes.
    // Aquí se define una lista blanca de dominios que están autorizados para acceder a este servidor.
    const allowedOrigins = ['https://luischvz.com/', 'https://luisenriquechavarriavazquez.github.io/reactChallenge/'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        // Si el origen de la solicitud está en la lista blanca, se configura para permitir peticiones desde ese origen.
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Configuración de los métodos HTTP permitidos y los encabezados aceptados.
    // Esto refuerza la seguridad al asegurarse de que sólo se permitan métodos específicos y cabeceras necesarias.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    try {
      // Realización de la petición HTTP GET a la URL especificada.
      // Se usa await para esperar la respuesta de la API antes de continuar.
      const apiRes = await fetch(url);
      // Verificación del estado de la respuesta. Si algo salió mal, se lanza un error con el estado HTTP.
      if (!apiRes.ok) throw new Error(`HTTP status ${apiRes.status}`);
      
      // Conversión de la respuesta en formato JSON.
      const data = await apiRes.json();
      // Configuración del tipo de contenido de la respuesta a 'application/json'.
      res.setHeader('Content-Type', 'application/json');
      // Envío de la respuesta con estado 200 y los datos en formato JSON.
      res.status(200).send(data);
    } catch (err) {
      // Manejo de errores al capturar cualquier excepción que ocurra durante la solicitud o procesamiento de la respuesta.
      // Aquí se envía un estado HTTP 500 y un mensaje de error genérico, lo que ayuda a prevenir la exposición de detalles sensibles.
      res.status(500).json({ error: 'Error al conectar con la API', details: err.message });
    }
  };
