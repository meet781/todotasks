class TodoOperationService {
    constructor(){
     if (new.target === TodoOperationService) {
       throw new Error("Cannot instantiate abstract class Vehicle.");
   }
    }
      
    // CRUD Operations 
     create(){
       throw new TypeError('Method "create" must be implemented');
    }

     get(){
       throw new TypeError('Method "read" must be implemented');
    }

    getAll(){
      throw new TypeError('Method "getAll" must be implemented');
    }

     update(){
       throw new TypeError('Method "update" must be implemented');
    }

     delete() {
       throw new TypeError('Method "delete" must be implemented');
     }

     taskExist(){
       throw new TypeError('Method "taskExists" must be implemented');
     }

}

module.exports = TodoOperationService;