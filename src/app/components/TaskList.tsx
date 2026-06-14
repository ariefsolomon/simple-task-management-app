import { useState } from "react";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Task, Priority } from "../types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  title: string;
  filterToday?: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onNewTask: () => void;
}

type Filter = "all" | "active" | "completed";

export function TaskList({ tasks, title, filterToday = false, onToggle, onEdit, onDelete, onNewTask }: TaskListProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let filtered = filterToday
    ? tasks.filter((t) => t.dueDate && new Date(t.dueDate + "T00:00:00").getTime() === today.getTime())
    : tasks;

  if (filter === "active") filtered = filtered.filter((t) => !t.completed);
  if (filter === "completed") filtered = filtered.filter((t) => t.completed);
  if (priorityFilter !== "all") filtered = filtered.filter((t) => t.priority === priorityFilter);
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter((t) => t.title.toLowerCase().includes(q) || t.project.toLowerCase().includes(q));
  }

  const filterTabs: { value: Filter; label: string }[] = [
    { value: "all", label: "Semua" },
    { value: "active", label: "Aktif" },
    { value: "completed", label: "Selesai" },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 style={{ fontSize: "22px", fontWeight: 600 }} className="text-foreground">{title}</h1>
          <button
            onClick={onNewTask}
            className="flex items-center gap-2 bg-foreground text-primary-foreground rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah Tugas
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari tugas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-foreground placeholder-muted-foreground outline-none focus:border-foreground/30 transition-colors"
              style={{ fontSize: "13px" }}
            />
          </div>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | "all")}
            className="bg-card border border-border rounded-xl px-3 py-2.5 text-foreground outline-none appearance-none cursor-pointer"
            style={{ fontSize: "13px" }}
          >
            <option value="all">Semua Prioritas</option>
            <option value="high">Tinggi</option>
            <option value="medium">Sedang</option>
            <option value="low">Rendah</option>
          </select>
        </div>

        <div className="flex gap-1 mb-5 bg-muted rounded-xl p-1 w-fit">
          {filterTabs.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                filter === value ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontSize: "13px", fontWeight: filter === value ? 500 : 400 }}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <p style={{ fontSize: "14px", fontWeight: 500 }} className="text-foreground mb-1">
              {search ? "Tidak ada hasil pencarian" : "Tidak ada tugas"}
            </p>
            <p style={{ fontSize: "12px" }} className="text-muted-foreground mb-4">
              {search ? `Tidak ditemukan tugas untuk "${search}"` : "Mulai dengan membuat tugas pertama Anda."}
            </p>
            {!search && (
              <button
                onClick={onNewTask}
                className="bg-foreground text-primary-foreground rounded-xl px-4 py-2 hover:opacity-90 transition-opacity"
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                Buat Tugas
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        )}

        <p className="text-muted-foreground mt-4 text-center" style={{ fontSize: "11px" }}>
          {filtered.length} tugas ditampilkan
        </p>
      </div>
    </div>
  );
}
