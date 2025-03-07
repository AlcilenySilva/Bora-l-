const express = require('express');
const usuarioRoutes = require('./src/routes/usuarioRoutes'); 

const app = express();
app.use(express.json());

app.use('/api', usuarioRoutes); 
app.use("/categorias", categoriaRoutes);
app.use("/eventos", eventoRoutes);
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
