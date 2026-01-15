import { CSSProperties, useState } from 'react';
import { useDrag } from 'react-dnd';
import { GripVertical, Trash2 } from 'lucide-react';
import type { Task } from './page';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

const styles: Record<string, CSSProperties> = {
  card: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    cursor: 'move',
    transition: 'box-shadow 0.2s',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  gripIcon: {
    width: '1rem',
    height: '1rem',
    color: '#cbd5e1',
    marginTop: '0.125rem',
    flexShrink: 0,
  },
  textContent: {
    flex: 1,
    minWidth: 0,
  },
  taskTitle: {
    fontWeight: 500,
    color: '#0f172a',
    marginBottom: '0.25rem',
  },
  taskDescription: {
    fontSize: '0.875rem',
    color: '#475569',
  },
  deleteButton: {
    color: '#cbd5e1',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    flexShrink: 0,
    padding: 0,
  },
  deleteIcon: {
    width: '1rem',
    height: '1rem',
  },
};

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const cardStyle: CSSProperties = {
    ...styles.card,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isHovered 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  };

  const deleteButtonStyle: CSSProperties = {
    ...styles.deleteButton,
    opacity: isHovered ? 1 : 0,
    color: isDeleteHovered ? '#ef4444' : '#cbd5e1',
  };

  return (
    <div
      ref={drag}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardContent}>
        <GripVertical style={styles.gripIcon} />
        <div style={styles.textContent}>
          <h3 style={styles.taskTitle}>{task.title}</h3>
          <p style={styles.taskDescription}>{task.description}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          style={deleteButtonStyle}
          aria-label="Delete task"
          onMouseEnter={() => setIsDeleteHovered(true)}
          onMouseLeave={() => setIsDeleteHovered(false)}
        >
          <Trash2 style={styles.deleteIcon} />
        </button>
      </div>
    </div>
  );
}
