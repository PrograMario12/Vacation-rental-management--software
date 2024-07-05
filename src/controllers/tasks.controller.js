import {pool} from '../db.js'

//Función para obtener todas las ausencias
export const getAllTasks = async (req, res, next) => {
    const result = await pool.query('SELECT * FROM ausencias WHERE empleado_id = $1', [req.userId]);
    return res.json(result.rows);
};

//Función  para obtener una ausencia en específico
export const getTask = async (req, res, next) => {
    //Obtener solo una ausencia en específico
    const id = req.params.empleado_id;

    const result = await pool.query('SELECT * FROM ausencias WHERE id = $1', [id]);
    
    if (result.rowCount ===0){
        return res.status(404).json({message: 'No se encontró la ausencia'});
    }

    return res.json(result.rows);  
};

//Función para crear una ausencia
export const createTask = async (req, res, next) => {
    const {empleado_id, fecha_inicio, fecha_fin, horas, tipo} = req.body;
    console.log(req.body);

    try{
        const result = await pool.query("INSERT INTO ausencias (empleado_id, fecha_inicio, fecha_fin, horas, tipo, estado) VALUES ($1, $2, $3, $4, $5, 'Pendiente') RETURNING *", [empleado_id, fecha_inicio, fecha_fin, horas, tipo]);

        //console.log(result)
        res.json(result.rows[0]);
    }catch(e){
        if(e.code === '23505'){
            return res.status(409).json({
                message: 'El ID ya existe'
            });
        }
        return res.status(500).json({ message: 'Error al crear la ausencia', error: e.message });
    }
};

//Función para actualizar una ausencia
export const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {empleado_id, fecha_inicio, fecha_fin, horas, tipo, estado} = req.body;

        const result = await pool.query('UPDATE ausencias SET empleado_id = $1, fecha_inicio = $2, fecha_fin = $3, horas = $4, tipo = $5, estado = $6 WHERE ausencia_id = $7', [empleado_id, fecha_inicio, fecha_fin, horas, tipo, estado, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontró la ausencia' });
        }

        return res.status(200).json({ message: `Ausencia modificada con ID: ${id}` });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la ausencia' });
    }
}

//Función para eliminar una ausencia
export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query('DELETE FROM ausencias WHERE ausencia_id = $1', [id]);
        console.log(result);
        return res.send(`Ausencia eliminada con ID: ${id}`);
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la ausencia' });
    }
}