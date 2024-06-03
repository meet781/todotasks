const TodoService = require("../services/todo.service");
const todoService = new TodoService();

const { codes } = require("../helper/responseCode");
const ResponseService = require("../helper/response.service");

class TodoController {
  static async createTask(req, res, next) {
    try {
      const payload = req.body;
     
      const isExist = await todoService.taskExist(payload.title);

      if (isExist) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("BAD_REQUEST"),
            data: "Task already exists",
          },
          res
        );
      }
      const task = await todoService.create(payload);

      if (!task) {
        return ResponseService.send(
          {
            status: ResponseService.getCode("BAD_REQUEST"),
            message: "Task not created",
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

  static async getTask(req, res, next) {
    try {
      const id = req.params.id;
      const task = await todoService.get(id);

      if (!task) {
        return res.status(codes.BAD_REQUEST[0]).json({
          message: codes.BAD_REQUEST[1],
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllTask(req, res, next) {
    try {
      const tasks = await todoService.getAll();

      if (!tasks.length) {
        return res.status(codes.BAD_REQUEST[0]).json({
          message: codes.BAD_REQUEST[1],
        });
      }

      return res.status(200).json({
        message: "Tasks retrieved successfully",
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const id = req.params.id;
      const payload = req.body;
      const updateData = await todoService.update(id, payload);

      if (!updateData) {
        return res.status(codes.NOT_MODIFIED[0]).json({
          message: codes.NOT_MODIFIED[1],
        });
      }

      return res.status(200).json({
        message: "Task updated successfully",
        data: updateData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const id = req.params.id;
      const deleteData = await todoService.delete(id);

      if (!deleteData) {
        return res.status(codes.BAD_REQUEST[0]).json({
          message: codes.BAD_REQUEST[1],
        });
      }

      return res.status(200).json({
        message: "Task deleted successfully",
        data: deleteData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
