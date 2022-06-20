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
};
