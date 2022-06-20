module.exports = {
  createTodo: async (parent, { title, category }, { models }) => {
    return await models.Todo.create({
      title,
      category,
    });
  },
  deleteTodo: async (parent, { id }, { models }) => {
    const note = await models.Todo.findById(id);

    try {
      await note.remove();
      return true;
    } catch {
      return false;
    }
  },
  checkTodo: async (parent, { id }, { models }) => {
    try {
      const todo = await models.Todo.findById(id);
      todo.done = !todo.done;
      const checkedTodo = await todo.save();

      return checkedTodo;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
