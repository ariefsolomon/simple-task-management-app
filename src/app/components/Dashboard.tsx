import { CheckCircle2, Clock, AlertCircle, ListTodo, TrendingUp } from "lucide-react";
import { Task } from "../types";
import { TaskItem } from "./TaskItem";

interface DashboardProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onNewTask: () => void;
}

export function Dashboard({ tasks, onToggle, onEdit, onDelete, onNewTask }: DashboardProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const inProgress = tasks.filter((t) => !t.completed).length;
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate + "T00:00:00") < today
  ).length;
  const dueToday = tasks.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate + "T00:00:00").getTime() === today.getTime()
  );
  const recentPending = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""))
    .slice(0, 4);

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total Tugas", value: total, icon: ListTodo, color: "bg-gray-50", iconColor: "text-gray-600" },
    { label: "Selesai", value: completed, icon: CheckCircle2, color: "bg-green-50", iconColor: "text-green-600" },
    { label: "Sedang Berjalan", value: inProgress, icon: Clock, color: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Terlambat", value: overdue, icon: AlertCircle, color: "bg-red-50", iconColor: "text-red-500" },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-foreground mb-1" style={{ fontSize: "22px", fontWeight: 600 }}>
            Selamat datang kembali, Arief 👋
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "13px" }}>
            {today.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {stats.map(({ label, value, icon: Icon, color, iconColor }) => (
            <div key={label} className="bg-card rounded-2xl p-4 border border-border">
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-3`}>
                <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
              </div>
              <p style={{ fontSize: "22px", fontWeight: 700 }} className="text-foreground leading-none mb-1">
                {value}
              </p>
              <p style={{ fontSize: "11px" }} className="text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span style={{ fontSize: "13px", fontWeight: 500 }} className="text-foreground">Progress Penyelesaian</span>
            </div>
            <span style={{ fontSize: "20px", fontWeight: 700 }} className="text-foreground">{completionRate}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-foreground rounded-full h-2 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-muted-foreground mt-2" style={{ fontSize: "11px" }}>
            {completed} dari {total} tugas telah diselesaikan
          </p>
        </div>

        {dueToday.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 style={{ fontSize: "13px", fontWeight: 600 }} className="text-foreground">Jatuh Tempo Hari Ini</h2>
              <span className="bg-red-100 text-red-600 rounded-full px-2 py-0.5" style={{ fontSize: "11px", fontWeight: 500 }}>
                {dueToday.length} tugas
              </span>
            </div>
            <div className="space-y-2">
              {dueToday.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: "13px", fontWeight: 600 }} className="text-foreground">Tugas Prioritas</h2>
            <button
              className="text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              Lihat semua →
            </button>
          </div>
          {recentPending.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-10 text-center">
              <CheckCircle2 className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p style={{ fontSize: "14px", fontWeight: 500 }} className="text-foreground mb-1">Semua tugas selesai!</p>
              <p style={{ fontSize: "12px" }} className="text-muted-foreground mb-4">Tidak ada tugas yang belum diselesaikan.</p>
              <button
                onClick={onNewTask}
                className="bg-foreground text-primary-foreground rounded-xl px-4 py-2 hover:opacity-90 transition-opacity"
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                Tambah Tugas Baru
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {recentPending.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
