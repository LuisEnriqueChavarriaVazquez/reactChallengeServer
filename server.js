const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Middleware para servir archivos estáticos de React (build folder)
app.use(express.static(path.join(__dirname, 'build')));

// Proxy para resolver el problema CORS al acceder a la API
app.use('/catom/api/challenge/banks', createProxyMiddleware({
    target: 'https://dev.obtenmas.com',
    changeOrigin: true,
    pathRewrite: {
        '^/catom/api/challenge/banks': '', // Si necesitas modificar el path aquí
    },
}));

// Captura cualquier otra ruta y devuelve el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
