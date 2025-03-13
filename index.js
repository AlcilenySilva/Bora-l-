const express = require('express');
const usuarioRoutes = require('./src/routes/usuarioRoutes'); 
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const eventoRoutes = require('./src/routes/eventoRoutes'); 
const authroutes = require('./src/routes/authroutes'); 
const app = express();
app.use(express.json());

app.use('/api', usuarioRoutes); 
app.use('/categoria', categoriaRoutes);
app.use('/eventos', eventoRoutes);
app.use('/auth', authroutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
