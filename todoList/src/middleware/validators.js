const validarTareaId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID de la tarea debe ser un número válido.' });
    }
    req.tareaId = id;
    next();
};

const validarDatosTarea = (req, res, next) => {
    const {titulo} = req.body;
    
    if(req.mothod ===  'POST' || req.method === 'PUT'){
        if(!titulo || titulo.trim() === ''){
            return res.status(400).json({ error: 'El título de la tarea es obligatorio y no puede estar vacío.' });

        }
    }
    next();
};

module.exports = {
    validarTareaId,
    validarDatosTarea,
};

