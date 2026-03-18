import type { Task } from "@/lib/types";

export function moveTaskToColumn(tasks: Task[], taskId: string, targetColumnId: string): Task[] {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, columnId: targetColumnId } : task,
  );
}

export function createTask(columnId: string, title: string, description: string): Task {
  return {
    id: Date.now().toString(),
    title,
    description,
    columnId,
  };
}

export function removeTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId);
}
