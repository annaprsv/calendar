import './index.css';

interface TaskProps {
  task: TaskType;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: (taskId: TaskType["id"]) => void;
  onUpdate: (taskId: TaskType["id"], updatedData: Partial<TaskType>) => void;
  onMove: (taskId: TaskType["id"]) => void;
}

export interface TaskType {
  id: string;
  text: string;
  completed?: boolean;
  date?: Date | null;
}

export const TaskComponent: React.FC<TaskProps> = ({
  task,
  onRemove,
  onMove,
  isSelected,
  onSelect
}) => {
  return (
    <li 
      className={`task-item ${isSelected ? 'selected' : ''} ${task.completed ? 'completed' : ''}`}
      onClick={onSelect}
    >
      <span className="task-text">{task.text}</span>
      
      <div className="task-actions">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(task.id);
          }} 
          className="delete-button"
        >
          🗑️
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onMove(task.id);
          }} 
          className="move-button"
        >
          📅
        </button>
      </div>
    </li>
  );
};