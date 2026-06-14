export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  project: string;
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}
