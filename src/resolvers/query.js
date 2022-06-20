module.exports = {
  todos: async (parent, args, { models }) => await models.Todo.find().limit(100),
};
