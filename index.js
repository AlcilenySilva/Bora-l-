const express = require('express');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const eventoRoutes = require('./src/routes/eventoRoutes');
const authRoutes = require('./src/routes/authroutes');  
const app = express();

app.use(express.json());
require('dotenv').config();

app.use('/usuarios', usuarioRoutes);       
app.use('/categoria', categoriaRoutes); 
app.use('/eventos', eventoRoutes);    
app.use('/auth', authRoutes);      


const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
