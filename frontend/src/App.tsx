import { useState } from 'react';
import './App.css';
import { Planner } from './components/Planner';
import { CalendarDate } from './components/CalendarDate';
import { TaskType } from './components/Task';



const App = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<TaskType["id"]| null>(null);
  //const [tasksByDate, setTasksByDate] = useState<Record<number, TaskType[]>>({});
  const [tasks, setTasks] = useState<TaskType[]>([]); // Все задачи хранятся здесь
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    date.setMonth(3);
    return date;
  });

   // Получаем задачи без даты для Planner
   const tasksWithoutDate = tasks.filter(task => !task.date);

   // Получаем задачи по датам для Calendar
   const getTasksByDate = (date: Date) => {
     return tasks.filter(task => 
       task.date && 
       new Date(task.date).toDateString() === date.toDateString()
     );
   };
   const addTask = (newTask: Omit<TaskType, 'id'>) => {
    const taskWithId = { 
      ...newTask,
      id: Date.now().toString(),  
      date: newTask.date || null 
    };
    setTasks((prev :  TaskType[]) => [...prev, taskWithId]);
  };

 // Функция для синхронизации задач
 const handleTasksUpdate = (updatedTasks: TaskType[]) => {
  setTasks(updatedTasks);
};

  const updateTask = (updatedTask: TaskType) => {
    setTasks((prev :  TaskType[]) => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (taskId: TaskType["id"]) => {
    setTasks((prev :  TaskType[]) => prev.filter(task => task.id !== taskId));
  };

  const addTaskToDate = (date: Date) => {
    if (selectedTaskId === null) return;

    setTasks((prev :  TaskType[]) => prev.map(task => {
      if (task.id === selectedTaskId) {
        return { ...task, date };
      }
      return task;
    }));
    
    setSelectedTaskId(null);
  

    // setTasksByDate((prevTasksByDate) => {
    //   const updatedTasksByDate = { ...prevTasksByDate };
    //   if (updatedTasksByDate[date] === undefined) {
    //     updatedTasksByDate[date] = [];
    //   }
    //   updatedTasksByDate[date].push(selectedTask);
    //   return updatedTasksByDate;
    // });
    // setSelectedTask(null);
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate : Date) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate : Date) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const prevDates = [];
  const currentDates = [];
  const nextDates = [];

  let offset = 0;
  while (true) {
    let offsetDate = new Date(currentDate);
    offsetDate.setDate(offset);
    if (offsetDate.getDay() === 6) break;
    prevDates.push(offsetDate);
    offset--;
  }

  offset = 1;
  while (true) {
    let offsetDate = new Date(currentDate);
    offsetDate.setDate(offset);
    if (offsetDate.getMonth() !== currentDate.getMonth()) break;
    currentDates.push(offsetDate);
    offset++;
  }

  offset = 1;
  while (true) {
    let offsetDate = new Date(currentDate);
    offsetDate.setDate(1);
    offsetDate.setMonth(currentDate.getMonth() + 1);
    offsetDate.setDate(offset);
    if (offsetDate.getDay() === 0) break;
    nextDates.push(offsetDate);
    offset++;
  }

  return (
    <>
      <header className="header">
        <div className='header-buttons'>
         <button onClick={goToPreviousMonth}>←</button>
        </div>
        <div className='header-month'>
         {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </div>
        <div className='header-buttons'>
         <button onClick={goToNextMonth}>→</button>
        </div>
      </header>

      <div className="container-p">
        <section className="calendar-section">
          <div className="calendar">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="calendar-header">
                {day}
              </div>
            ))}

{prevDates.map((date) => (
              <CalendarDate 
                key={`prev-${date}`} 
                tasks={[]} 
                date={date} 
                disabled={true} 
              />
            ))}
            {currentDates.map((date) => (
              <CalendarDate 
                key={`current-${date}`} 
                tasks={getTasksByDate(date)} 
                date={date} 
                disabled={false} 
                click={() => addTaskToDate(date)} 
              />
            ))}
            {nextDates.map((date) => (
              <CalendarDate 
                key={`next-${date}`} 
                tasks={[]} 
                date={date} 
                disabled={true} 
              />
            ))}
          </div>
        </section>

        <Planner setSelectedTaskId={setSelectedTaskId} selectedTaskId={selectedTaskId} onTasksUpdate={handleTasksUpdate} />
      </div>
    </>
  );
};

export default App;