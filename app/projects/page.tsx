"use client";

import { useState, CSSProperties } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BoardColumn } from "./boardColumn";

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

const initialColumns: Column[] = [
  { id: "todo", title: "To Do", color: "#f1f5f9" },
  { id: "in-progress", title: "In Progress", color: "#eff6ff" },
  { id: "review", title: "Review", color: "#fffbeb" },
  { id: "done", title: "Done", color: "#f0fdf4" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and mockups",
    columnId: "todo",
  },
  {
    id: "2",
    title: "Update documentation",
    description: "Add API reference guides",
    columnId: "todo",
  },
  {
    id: "3",
    title: "Fix navigation bug",
    description: "Mobile menu not closing properly",
    columnId: "in-progress",
  },
  {
    id: "4",
    title: "Implement search feature",
    description: "Add full-text search capability",
    columnId: "in-progress",
  },
  {
    id: "5",
    title: "Code review PR #234",
    description: "Review authentication changes",
    columnId: "review",
  },
  {
    id: "6",
    title: "Set up CI/CD pipeline",
    description: "Automated testing and deployment",
    columnId: "done",
  },
];

const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
    padding: "2rem",
  },
  wrapper: {
    maxWidth: "90rem",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#475569",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(280px, 1fr))",
    gap: "2.5rem",
  },
};

export default function ProjectsPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns] = useState<Column[]>(initialColumns);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState<string>("");

  const moveTask = (taskId: string, toColumnId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId: toColumnId } : task
      )
    );
  };

  const addTask = (columnId: string, title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      columnId,
    };
    setTasks([...tasks, newTask]);
    setIsAddingTask(false);
    setNewTaskColumn("");
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleAddTaskClick = (columnId: string) => {
    setNewTaskColumn(columnId);
    setIsAddingTask(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.header}>
            <h1 style={styles.title}>Project Board</h1>
            <p style={styles.subtitle}>
              Drag and drop tasks to update their status
            </p>
          </div>

            <div style={styles.grid}>
              {columns.map((column) => (
                <BoardColumn
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  onMoveTask={moveTask}
                  onAddTask={addTask}
                  onDeleteTask={deleteTask}
                  isAddingTask={isAddingTask && newTaskColumn === column.id}
                  onAddTaskClick={() => handleAddTaskClick(column.id)}
                  onCancelAdd={() => {
                    setIsAddingTask(false);
                    setNewTaskColumn("");
                  }}
                />
              ))}
            </div>
        </div>
      </div>
    </DndProvider>
  );
}
