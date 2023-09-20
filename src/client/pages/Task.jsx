import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTask from '@wasp/queries/getTask';
import editTask from '@wasp/actions/editTask';
import markTaskAsDone from '@wasp/actions/markTaskAsDone';

export function Task() {
  const { data: task, isLoading, error } = useQuery(getTask);
  const editTaskFn = useAction(editTask);
  const markTaskAsDoneFn = useAction(markTaskAsDone);
  const [newDescription, setNewDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleEditTask = () => {
    editTaskFn({ taskId: task.id, newDescription });
    setNewDescription('');
  };

  const handleMarkTaskAsDone = () => {
    markTaskAsDoneFn({ taskId: task.id });
  };

  return (
    <div className=''>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Description'
          className='px-1 py-2 border rounded text-lg'
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          onClick={handleEditTask}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Edit Task
        </button>
      </div>
      <div>
        <div
          className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
        >
          <input
            type='checkbox'
            checked={task.isDone}
            onChange={handleMarkTaskAsDone}
            className='mr-2 h-6 w-6'
          />
          <p>{task.description}</p>
        </div>
      </div>
      <div>
        <Link to='/' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'>Back</Link>
      </div>
    </div>
  );
}