import { useState, useEffect } from 'react';
import './index.css';
import { TaskComponent, TaskType } from '../Task';

interface PlannerProps {
  selectedTaskId: TaskType["id"] | null;
  setSelectedTaskId: (taskId: TaskType["id"] | null) => void;
  onTasksUpdate: (updatedTasks: TaskType[]) => void;
}

export const Planner: React.FC<PlannerProps> = ({
  selectedTaskId,
  setSelectedTaskId,
  onTasksUpdate
}) => {
  const [tasks, setLocalTasks] = useState<TaskType[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Полная загрузка задач без состояния загрузки
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        const data = await response.json();
        setLocalTasks(data);
        onTasksUpdate(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchTasks();
  }, [onTasksUpdate]);

  // Добавление задачи
  const addTask = async () => {
    if (!newTaskText.trim()) return;
    
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: newTaskText,
          completed: false,
          date: null
        })
      });
      const newTask = await response.json();
      setLocalTasks(prev => [...prev, newTask]);
      onTasksUpdate([...tasks, newTask]);
      setNewTaskText('');
    } catch (error) {
      console.error('Add task error:', error);
    }
  };

  // Удаление задачи
  const deleteTask = async (taskId: string) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
      });
      setLocalTasks(prev => prev.filter(task => task.id !== taskId));
      onTasksUpdate(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Обновление задачи
  const updateTask = async (taskId: string, updatedData: Partial<TaskType>) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const updatedTask = await response.json();
      setLocalTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      onTasksUpdate(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <section className="planner-section">
      <h2 className="planner-title">📝 My Monthly Planner</h2>

      <div className="task-input-container">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="task-input"
          placeholder="Enter a task..."
        />
        <button onClick={addTask} className="add-task-button">
          Add Task
        </button>
      </div>

      <ul className="planner-tasks">
        {tasks.filter(task => !task.date).map(task => (
          <TaskComponent
            key={task.id}
            task={task}
            isSelected={task.id === selectedTaskId}
            onSelect={() => setSelectedTaskId(task.id)}
            onRemove={deleteTask}
            onUpdate={updateTask}
            onMove={() => setSelectedTaskId(task.id)}
          />
        ))}
      </ul>
    </section>
  );
};