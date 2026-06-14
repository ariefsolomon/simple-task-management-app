import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { TaskList } from "./components/TaskList";
import { TaskModal } from "./components/TaskModal";
import { Task } from "./types";

type View = "dashboard" | "all" | "today";

const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Review desain mockup halaman utama",
    description: "Tinjau dan berikan feedback untuk mockup yang dibuat oleh tim desain",
    priority: "high",
    project: "Desain UI",
    dueDate: today,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Implementasi fitur autentikasi pengguna",
    description: "Buat sistem login dan registrasi menggunakan JWT",
    priority: "high",
    project: "Pengembangan",
    dueDate: tomorrow,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Riset kompetitor untuk strategi produk",
    priority: "medium",
    project: "Riset",
    dueDate: nextWeek,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Buat laporan mingguan tim",
    description: "Rangkum progress pekerjaan minggu ini untuk presentasi ke stakeholder",
    priority: "medium",
    project: "Lainnya",
    dueDate: today,
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Perbaiki bug pada form pendaftaran",
    description: "Validasi email tidak berjalan dengan benar pada browser Firefox",
    priority: "high",
    project: "Pengembangan",
    dueDate: yesterday,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Update konten halaman tentang kami",
    priority: "low",
    project: "Pemasaran",
    dueDate: nextWeek,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Setup environment development baru",
    description: "Konfigurasi Docker dan database lokal untuk anggota tim baru",
    priority: "medium",
    project: "Pengembangan",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Buat komponen button design system",
    priority: "low",
    project: "Desain UI",
    dueDate: nextWeek,
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  const taskCounts = {
    all: tasks.filter((t) => !t.completed).length,
    today: tasks.filter((t) => !t.completed && t.dueDate === todayStr).length,
    done: tasks.filter((t) => t.completed).length,
  };

  const handleNewTask = () => {
    setEditTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const handleSave = (data: Omit<Task, "id" | "createdAt">) => {
    if (editTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editTask.id ? { ...t, ...data } : t))
      );
    } else {
      const newTask: Task = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onNewTask={handleNewTask}
        taskCounts={taskCounts}
      />

      {activeView === "dashboard" && (
        <Dashboard
          tasks={tasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onNewTask={handleNewTask}
        />
      )}
      {activeView === "all" && (
        <TaskList
          tasks={tasks}
          title="Semua Tugas"
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onNewTask={handleNewTask}
        />
      )}
      {activeView === "today" && (
        <TaskList
          tasks={tasks}
          title="Hari Ini"
          filterToday
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onNewTask={handleNewTask}
        />
      )}
      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editTask={editTask}
      />
    </div>
  );
}
