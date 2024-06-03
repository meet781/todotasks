
const TodoOperationService = require("./todoOperation.service");
const TODO = require("../model/todo");

class TodoService extends TodoOperationService {
    constructor () {
        super();
    }
    async create(data) {
        const todo = new TODO(data);
        return await todo.save();
      }
    
      // Get record by id
      async get(id) {
        return await TODO.findById(id);
      }
    
      // Get all records
      async getAll() {
        return await TODO.find();
      }
    
      // Update record by id
      async update(id, data) {
        return await TODO.findByIdAndUpdate(id, data);
      }
    
      // Delete record by id
      async delete(id) {
        return await TODO.findByIdAndDelete(id);
      }
    
      // Check if task exists by id or name
      async taskExist(identifier) {
        console.log("🚀 ~ TodoServices ~ taskExist ~ identifier:", identifier)
        
    
        if (typeof identifier === 'string' && identifier.match(/^[0-9a-fA-F]{24}$/)) {
          // Check if the identifier is a valid MongoDB ObjectId
          return await TODO.findById(identifier)
        } else {
          // Otherwise, assume it is a title
          return await TODO.findOne({ title: identifier });
        }
      
      }
}

module.exports = TodoService



