// api/proxy.js
export default async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const url = 'https://dev.obtenmas.com/catom/api/challenge/banks';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    try {
      const apiRes = await fetch(url);
      if (!apiRes.ok) throw new Error(`HTTP status ${apiRes.status}`);
      
      const data = await apiRes.json();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    } catch (err) {
      res.status(500).json({ error: 'Error al conectar con la API', details: err.message });
    }
  };
  