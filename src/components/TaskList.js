import TaskListItem from './TaskListItem';

function TaskList(props) {
  const { tasks, onDeleteTask, uid } = props;
  const filteredTasks = tasks.filter((task) => {
    if (task.accountId === uid && !task.done) return true;
    return false;
  });
  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskListItem key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;
