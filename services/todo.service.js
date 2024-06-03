const TodoOperationService = require("./todoOperation.service");
const TODO = require("../model/todo");

class TodoService extends TodoOperationService {
    constructor() {
        super();
    }

    //create  new  task
    async create(data) {
        const todo = await new Promise((resolve, reject) => {
            const newTodo = new TODO(data);
            newTodo
                .save()
                .then((newTodo) => resolve(newTodo))
                .catch((err) => reject(err));
        });
        return todo;
    }

    // Get record by id

    async get(id) {
        const task = await new Promise((resolve, reject) => {
            TODO.findById(id)
                .then((todo) => resolve(todo))
                .catch((err) => reject(err));
        });
        return task;
    }

    // Get all records
    async getAll() {
        const tasks = await new Promise((resolve, reject) => {
            TODO.find()
                .then((tasks) => resolve(tasks))
                .catch((err) => reject(err));
        });
        return tasks;
    }

    // Update record by id
    async update(id, data) {
        const updateTask = await new Promise((resolve, reject) => {
            TODO.findByIdAndUpdate(id, data, { new: true })
                .then((update) => resolve(update))
                .catch((err) => reject(err));
        });
        return updateTask;
    }

    // Delete record by id
    async delete(id) {
        const deleteTask = await new Promise((resolve, reject) => {
            TODO.findByIdAndDelete(id)
                .then((deleteTask) => resolve(deleteTask))
                .catch((err) => reject(err));
        });
        return deleteTask;
    }

    // Check if task exists by id 
    async taskExistID(id) {
        
            // Check if the identifier is a valid MongoDB ObjectId
            const isExist = await new Promise((resolve, reject) => {
                TODO.findById(id)
                    .then((todo) => resolve(todo))
                    .catch((err) => reject(err));
            });
            return isExist;
    }

    // Check if task exists by name
    async taskExistName(title) {
        const isExist = await new Promise((resolve, reject) => {
            TODO.findOne({ title: title })
               .then((todo) => resolve(todo))
               .catch((err) => reject(err));
        });
        return isExist;
    }
}

module.exports = TodoService;
