const ToDoService = require('../services/todo.services');

exports.createToDo = async (req, res, next) => {
    try {
        const { userId, title, desc } = req.body;
        let newToDo = await ToDoService.createToDo(userId, title, desc);
        res.json({ status: true, success: newToDo });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getToDoList = async (req, res, next) => {
    try {
        const { _id } = req.body;
        let todoData = await ToDoService.getUserToDoList(_id);
        res.json({ status: true, success: todoData });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.deleteToDo = async (req, res, next) => {
    try {
        const { id } = req.body;
        console.log(`Deleting ToDo with id: ${id}`);
        let deletedToDo = await ToDoService.deleteToDo(id);
        res.json({ status: true, success: deletedToDo });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
