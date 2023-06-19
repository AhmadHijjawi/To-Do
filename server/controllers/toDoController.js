const factory = require("./handlerFactory");

const ToDo = require("../models/toDoModel");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getToDo = factory.getOne(ToDo);
exports.updateToDo = factory.updateOne(ToDo);
exports.deleteToDo = factory.deleteOne(ToDo);
exports.getAllToDo = factory.getAll(ToDo);
exports.createToDo = factory.createOne(ToDo);
