const express = require('express');
const cors = require('cors');
const colors = require('colors')
const app = express();
app.use(cors());
app.use(express.static('public'));
app.listen(8080,() => {
    console.log('Servidor Iniciado'.green);
})