import { Tag, Plus } from "lucide-react";
import { Task } from "../types";
import { TaskItem } from "./TaskItem";

interface ProjectViewProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onNewTask: () => void;
}

const projectColors: Record<string, string> = {
  "Desain UI": "bg-purple-100 text-purple-700",
  "Pengembangan": "bg-blue-100 text-blue-700",
  "Riset": "bg-yellow-100 text-yellow-700",
  "Pemasaran": "bg-green-100 text-green-700",
  "Lainnya": "bg-gray-100 text-gray-700",
};

export function ProjectView({ tasks, onToggle, onEdit, onDelete, onNewTask }: ProjectViewProps) {
  const projects = Array.from(new Set(tasks.map((t) => t.project)));

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 style={{ fontSize: "22px", fontWeight: 600 }} className="text-foreground">Proyek</h1>
          <button
            onClick={onNewTask}
            className="flex items-center gap-2 bg-foreground text-primary-foreground rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah Tugas
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <Tag className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p style={{ fontSize: "14px", fontWeight: 500 }} className="text-foreground mb-1">Belum ada proyek</p>
            <p style={{ fontSize: "12px" }} className="text-muted-foreground">Buat tugas pertama untuk memulai proyek.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => {
              const projectTasks = tasks.filter((t) => t.project === project);
              const done = projectTasks.filter((t) => t.completed).length;
              const pct = Math.round((done / projectTasks.length) * 100);
              const colorClass = projectColors[project] || "bg-gray-100 text-gray-700";

              return (
                <div key={project} className="bg-card rounded-2xl border border-border overflow-hidden">
                  <div className="px-5 py-4 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-lg px-2.5 py-1 ${colorClass}`} style={{ fontSize: "12px", fontWeight: 600 }}>
                          {project}
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
                          {projectTasks.length} tugas
                        </span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 600 }} className="text-foreground">{pct}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-foreground rounded-full h-1.5 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    {projectTasks.map((task) => (
                      <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
