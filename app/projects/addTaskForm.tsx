import { useState, CSSProperties } from 'react';
import { Plus, X } from 'lucide-react';

interface AddTaskFormProps {
  columnId: string;
  onAdd: (columnId: string, title: string, description: string) => void;
  onCancel: () => void;
}

const styles: Record<string, CSSProperties> = {
  form: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    border: '2px solid #93c5fd',
  },
  input: {
    width: '100%',
    marginBottom: '0.5rem',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    outline: 'none',
    transition: 'box-shadow 0.2s',
  },
  textarea: {
    width: '100%',
    marginBottom: '0.75rem',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    resize: 'none' as const,
    outline: 'none',
    transition: 'box-shadow 0.2s',
    fontFamily: 'inherit',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
  },
  cancelButton: {
    padding: '0.375rem 0.75rem',
    color: '#475569',
    background: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  icon: {
    width: '1rem',
    height: '1rem',
  },
};

export function AddTaskForm({ columnId, onAdd, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(columnId, title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        style={styles.input}
        autoFocus
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          e.currentTarget.style.borderColor = '#60a5fa';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description..."
        style={styles.textarea}
        rows={2}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          e.currentTarget.style.borderColor = '#60a5fa';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      />
      <div style={styles.buttonGroup}>
        <button
          type="submit"
          style={styles.submitButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
        >
          <Plus style={styles.icon} />
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={styles.cancelButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X style={styles.icon} />
        </button>
      </div>
    </form>
  );
}
