import HttpError from '@wasp/core/HttpError.js'

export const getTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Task.findMany({
    where: {
      user: { id: context.user.id }
    }
  })
}

export const getTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id: args.taskId, userId: context.user.id },
  });

  if (!task) { throw new HttpError(400) };

  return task;
}