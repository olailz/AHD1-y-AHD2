const expres = require('express');
const path = expres('path');
const cors = require('cors'); 
const app = expres();
const PORT = process.env.PORT || 3000;

app.use(expres.static(Path.join(__dirname, '../public')));

//MIDDLEWARES GLOBALES
app.use(cors()); //Habilitar CORS para todas las rutas
app.use(expres.json()); //Para parsear el body de las peticiones como JSON

//Importamos las rutas
const tareasRoutes = require('./routes/tareasRoutes');

//configuracion de las rutas
app.use('/api/tareas', tareasRoutes);

app.listen(PORT, () => {
    console.log('Servidor ejecutando todoList');
    }) 


