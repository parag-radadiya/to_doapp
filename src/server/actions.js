import HttpError from '@wasp/core/HttpError.js'


export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const task = await context.entities.Task.create({
    data: {
      description: args.description,
      isDone: false,
      user: { connect: { id: context.user.id } }
    }
  })

  return task
}

export const editTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const task = await context.entities.Task.findUnique({
    where: { id: args.taskId }
  });

  if (task.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Task.update({
    where: { id: args.taskId },
    data: { description: args.newDescription }
  });
}

export const deleteTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.taskId }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Task.delete({
    where: { id: args.taskId }
  });

  return { message: 'Task deleted successfully' };
}

export const markTaskAsDone = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Task.update({
    where: { id: args.taskId },
    data: { isDone: true }
  });
}