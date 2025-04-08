import React from 'react';
import './index.css';
import { TaskType } from '../Task';

interface CalendarDateProps {
  tasks: TaskType[];
  date: Date;
  disabled: boolean;
  click?: () => void;
  // onRemove: (index: number) => void;
  // onMove: (task: string) => void; // Новая функция для переноса
  // isHovered: boolean;
  // onMouseEnter: () => void;
  // onMouseLeave: () => void;
}

export const CalendarDate: React.FC<CalendarDateProps> = ({
  tasks,
  date,
  disabled,
  click,
}) => {
  return (
    <div 
      className="calendar-day" 
      style={{backgroundColor: disabled ? 'gray' : 'white'}}
      // style={{backgroundColor: selectedTask && date.getDate()=== selectedDate?.getDate() ? 'blue' : 'red'}}
      onClick={click}
    >
      <span className="day-number">{date.getDate()}</span>
      {tasks?.map(task => (
      <div className="task">{task.text}</div>

            ))}
    </div>
  );
};