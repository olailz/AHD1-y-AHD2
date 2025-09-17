const mongo = require('mongodb');

//Definir el esquema de tareas

const tareasSchema = new mongo.Schema({
    id:{ type: Number, require:true},
    titulo:{type:String, require:true},
    descripcion: {type:String, require:false},
    completada: {type: Boolean, default: false},
    fechaCreacion: {type: Date, default: Date.now},
    fechaActualizacion:{type: Date, default: Date.now}
});

//Crear el modelo y exportarlo

const Tareas = mongo.model('tareas', tareasSchema)

//Conexion a MongoDB
const conectarDB =  async () => {
    try{
        const MONGODB_CON = process.env.MONGODB_CONEXION.replace('<db_password>', process.env.DB_PASS || '');
        
    await mongo.connect(MONGODB_CON, {
      dbName: process.env.DB_NAME || 'NombreDB'
    });

    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error conectando a MongoDB: ', error.message);
  }
};

//funcion para obtener todas las tareas

const obtenerTodasLasTareas = async () => {
    try{
        return await Tareas.find().sort({fechaCreacion: -1})    
    }
    catch(error){
        console.error('Error obtenido tareas: ', error.message);
    }   
 };

    //funcion para obtener tareas por ID
    const obtenerTareaPorId = async(id) => {
        try{
            return await Tareas.findById(id);
        }
        catch (error){
            console.error('Error obtenido tareas por id: ', error.message);
        }
    };

    //funcion para crear nueva tarea

    const crearTarea = async (tareaData) => {
        try{
            const nuevaTarea = new Tareas(tareaData);
            return await nuevaTarea.save();
        }
        catch(error){
           console.error('Error crearndpo tareas: ', error.message);
        } 
};
    

//Funcion para actualizar tarea
const actualizarTarea = async (id,nuevosDatos) => {
    try{
        return await Tareas.findByIdAndUpdate(
            id,
            {
                ...nuevosDatos, fechaActualizacion: new Date()
            },
        );
    }
    catch{
        console.error('Error actualizando tareas por id: ', error.message);
    }
};

//Función para eliminar tareas
const eliminarTarea = async (id) => {
    try{
        return await Tareas.findByIdAndUpdate(id);
    }
    catch{
        console.error('Error actualizando tareas por id: ', error.message); 
    }
};


//Exportacion de module
module.exports = {
  conectarDB,
  Tareas,
  obtenerTodasLasTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea

};