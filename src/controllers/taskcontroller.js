import Task from '../models/Task';
import {getPagination} from '../libs/getPagination';

export const findAllTasks = async (req, res) => {

   try {

    const {size, page, title} = req.query;

    const {limit, offset} = getPagination(page, size)

    const condition = title ? {
        title: {$regex: new RegExp(title), $options: "i"}
    } : {};

    //const tasks = await Task.find();
    const data = await Task.paginate(condition, {offset, limit});

    res.json({
        totalItems: data.totalDocs,
        task: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1
    });

   } catch (error) {

    res.status(500).json({
        message: error.message || 'Algo salio mal'
    })

   }
}

export const createTask = async (req, res) => {

    if(!req.body.title) 
    {
        return res.status(400).send({message: "El contenido de title no puede estar vacion"});
    }    
   
    try{

        const newTask =  new Task({
            title: req.body.title, 
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        });

        const taskSaved =  await newTask.save();
        res.json(taskSaved);
        
    } catch (error) {

        res.status(500).json({
            message: error.message || 'Algo salio mal al crear la tarea'
        })
    }

}

export const findOneTask = async (req,res) => {
    
    const {id} = req.params;
    
   try {

        const task = await Task.findById(id);

        if(!task){
            return res.status(400).json({message: `La tarea con el id ${id} no existe`})
        }

        res.json(task);
       
   } catch (error) {
       
        res.status(500).json({
            message: error.message || 'Algo salio mal'
        })
   }

}

export const deleteTask = async (req,res) => {

    const {id} = req.params;

    try {

        const data = await Task.findByIdAndDelete(id);

        res.json({
            message: `${data.id} la tarea ha sido eliminada de forma satisfactoriamente`
        });
     
    } catch (error) {

        res.status(500).json({
            message: error.message || `Algo salio mal al eliminar la nota ${id}`
        })
        
    }    
}

export const findAllDoneTasks = async (req,res) => {
    const tasks = await Task.find({done: true});
    res.json(tasks)
}

export const updateTask = async (req,res) => {

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body);
    Task.findOneAndUpdate
    res.json({message: `La tarea ${updatedTask.id} fue actualizada`});
}