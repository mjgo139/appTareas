import taskModel from "../models/task.model.js"


export const getTasks = async(req,res)=>{
    try {
        const tasks = await taskModel.find({user:req.user.id}).populate('user');

        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message:'Error interno del Servidor'});
    }
}

export const getTasksCompleted = async(req,res)=>{
    try {
        const tasks = await taskModel.find({user:req.user.id, completed:true}).populate('user');

        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message:'Error interno del Servidor'});
    }
}

export const getTask = async(req,res)=>{
    const {id} = req.params;
    try {
        const task = await taskModel.findById(id).populate('user');
        if(!task){
            return res.status(400).json({message:'Tarea no encontrada'});
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message:'Error interno del Servidor'});
    }
}

export const createTask = async(req,res)=>{
    const {title, description, date} = req.body;
    try {
        const newTask = new taskModel({
            title,
            description,
            date,
            user: req.user.id,
            completed : false
        });

        await newTask.save();

        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).json({message:'Error interno del Servidor'})
    }
}

export const updateTask = async(req,res)=>{
    const {id} = req.params;
    const {title,description,date,completed} = req.body;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(id,
            {$set:{title,description,date,completed}},
            {new:true}
        );

        if(!updatedTask){
            return res.status(400).json({message:'Tarea no encontrada'});
        }

        res.status(200).json({message:'Tarea actualizada correctamente', updatedTask});
    } catch (error) {
        res.status(500).json({message:'Error interno del Servidor'});
    }
}

export const deleteTask = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);

        if(!deletedTask){
            return res.status(400).json({message:'Tarea no encontrada'});
        }

        res.status(204).json({message:'Tarea eliminada correctamente', deletedTask});
    } catch (error) {
        res.status(500).json({message:'Error interno del Servidor'});
    }
}