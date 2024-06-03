const TodoService = require("../services/todo.service");
const todoService = new TodoService();

const { codes } = require("../helper/responseCode");
const ResponseService = require("../helper/response.service");

/**
 * Controller class responsible for handling Todo Service Operation.
 */
class TodoController {
  /**
   * 
   * @param {*} req   The HTTP request object.
   * @param {*} res   The HTTP response object.
   * @param {*} next  The next MiddleWare function to execute
   * @returns  create new task
   */
  static async createTask(req, res, next) {
    try {
      const payload = req.body;

      const isExist = await todoService.taskExistName(payload.title);

      if (isExist) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("BAD_REQUEST"),
            data: "Task already exist",
          },
          res
        );
      }

      const task = await todoService.create(payload);

      if (!task) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("BAD_REQUEST"),
            data: "Task not created",
          },
          res
        );
      }

      return ResponseService.send(
        {
          status: ResponseService.getCode("OK"),
          data: task,
          message: "Task created successfully",
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * retrive single task
   */

  static async getTask(req, res, next) {
    try {
      const id = req.params.id;
      const task = await todoService.get(id);

      if (!task) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("NOT_FOUND"),
            data: "Task not found",
          },
          res
        );
      }

      return ResponseService.send(
        {
          status: ResponseService.getCode("OK"),
          data: task,
          message: "Task retrieved successfully",
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * retrives all tasks
   */

  static async getAllTask(req, res, next) {
    try {
      const tasks = await todoService.getAll();

      if (!tasks.length) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("NOT_FOUND"),
            data: "Tasks not found",
          },
          res
        );
      }

      return ResponseService.send(
        {
          status: ResponseService.getCode("OK"),
          data: tasks,
          message: "All Tasks retrieved successfully",
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }

/**
 * update record in database
 */

  static async updateTask(req, res, next) {
    try {
      const id = req.params.id;
      const payload = req.body;
      

      const task = await todoService.taskExistID(id);
      if (!task) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("NOT_FOUND"),
            data: "Task not found",
          },
          res
        );
      }

      if (payload.title) {
        const isExist = await todoService.taskExistName(payload.title);
        if (isExist || task.title === payload.title) {
          return ResponseService.send(
            {
              status: ResponseService.getCode("BAD_REQUEST"),
              data: "For Update This Title not allowed",
            },
            res
          );
        }
      }

      const updateData = await todoService.update(id, payload);
      if (!updateData) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("NOT_MODIFIED"),
            data: "Task not updated",
          },
          res
        );
      }

      return ResponseService.send(
        {
          status: ResponseService.getCode("OK"),
          data: updateData,
          message: "Task updated successfully",
        },
        res
      );
    } catch (error) {
      next(error);
    }
  }
 /**
  * delete a record from the database
  */

  static async deleteTask(req, res, next) {
    try {
      const id = req.params.id;
      const isExist = await todoService.taskExistID(id);
      if (!isExist) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("NOT_FOUND"),
            data: "Task not found",
          },
          res
        );
      }

      const deleteData = await todoService.delete(id);

      if (!deleteData) {
        return ResponseService.send({
            status : ResponseService.getCode("NOT_FOUND") ,
            data : "Task Not Found"
        } , res )
      }
      
      return  ResponseService.send({
        status : ResponseService.getCode("OK"),
        data : deleteData,
        message : "Task deleted successfully"
      }, res )

    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
