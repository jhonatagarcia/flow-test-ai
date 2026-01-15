import { CSSProperties } from 'react';
import { useDrop } from 'react-dnd';
import { TaskCard } from './taskCard';
import { AddTaskForm } from './addTaskForm';
import { Plus } from 'lucide-react';
import type { Task, Column } from './page';

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  onMoveTask: (taskId: string, toColumnId: string) => void;
  onAddTask: (columnId: string, title: string, description: string) => void;
  onDeleteTask: (taskId: string) => void;
  isAddingTask: boolean;
  onAddTaskClick: () => void;
  onCancelAdd: () => void;
}

const styles: Record<string, CSSProperties> = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  columnHeader: {
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  columnTitle: {
    fontWeight: 600,
    color: '#1e293b',
  },
  taskCount: {
    backgroundColor: '#e2e8f0',
    color: '#334155',
    fontSize: '0.75rem',
    fontWeight: 500,
    padding: '0.125rem 0.5rem',
    borderRadius: '9999px',
  },
  addButton: {
    color: '#64748b',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  dropZone: {
    flex: 1,
    borderRadius: '0.5rem',
    padding: '1rem',
    minHeight: '500px',
    transition: 'all 0.2s',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
};

export function BoardColumn({
  column,
  tasks,
  onMoveTask,
  onAddTask,
  onDeleteTask,
  isAddingTask,
  onAddTaskClick,
  onCancelAdd,
}: BoardColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => onMoveTask(item.id, column.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropZoneStyle: CSSProperties = {
    ...styles.dropZone,
    backgroundColor: column.color,
    boxShadow: isOver ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
  };

  return (
    <div style={styles.column}>
      <div style={styles.columnHeader}>
        <div style={styles.headerContent}>
          <h2 style={styles.columnTitle}>{column.title}</h2>
          <span style={styles.taskCount}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onAddTaskClick}
          style={styles.addButton}
          aria-label="Add task"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#334155';
            e.currentTarget.style.backgroundColor = '#e2e8f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Plus style={{ width: '1rem', height: '1rem' }} />
        </button>
      </div>

      <div ref={drop} style={dropZoneStyle}>
        <div style={styles.taskList}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
          ))}
          {isAddingTask && (
            <AddTaskForm
              columnId={column.id}
              onAdd={onAddTask}
              onCancel={onCancelAdd}
            />
          )}
        </div>
      </div>
    </div>
  );
}
