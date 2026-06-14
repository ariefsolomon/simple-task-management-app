import { Pencil, Trash2, Calendar, Flag } from "lucide-react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low: { label: "Rendah", dot: "bg-blue-400", text: "text-blue-600", bg: "bg-blue-50" },
  medium: { label: "Sedang", dot: "bg-yellow-400", text: "text-yellow-700", bg: "bg-yellow-50" },
  high: { label: "Tinggi", dot: "bg-red-400", text: "text-red-600", bg: "bg-red-50" },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Hari ini";
  if (diff === 1) return "Besok";
  if (diff < 0) return `${Math.abs(diff)} hari lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const pc = priorityConfig[task.priority];
  const isOverdue = task.dueDate && new Date(task.dueDate + "T00:00:00") < new Date(new Date().setHours(0, 0, 0, 0)) && !task.completed;

  return (
    <div
      className={`group flex items-start gap-3.5 bg-card rounded-xl px-4 py-3.5 border border-border hover:shadow-sm transition-all ${task.completed ? "opacity-50" : ""}`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
          task.completed ? "bg-foreground border-foreground" : "border-muted-foreground hover:border-foreground"
        }`}
      >
        {task.completed && (
          <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 12 12">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-foreground ${task.completed ? "line-through text-muted-foreground" : ""}`}
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-muted-foreground mt-0.5 line-clamp-1" style={{ fontSize: "12px" }}>
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${pc.bg} ${pc.text}`} style={{ fontSize: "11px", fontWeight: 500 }}>
            <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
            {pc.label}
          </span>
          <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
            {task.project}
          </span>
          {task.dueDate && (
            <span
              className={`flex items-center gap-1 ${isOverdue ? "text-red-500" : "text-muted-foreground"}`}
              style={{ fontSize: "11px" }}
            >
              <Calendar className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
