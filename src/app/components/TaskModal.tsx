import { useState, useEffect } from "react";
import { X, Calendar, Flag } from "lucide-react";
import { Task, Priority } from "../types";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, "id" | "createdAt">) => void;
  editTask?: Task | null;
}

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Rendah", color: "text-blue-500" },
  { value: "medium", label: "Sedang", color: "text-yellow-500" },
  { value: "high", label: "Tinggi", color: "text-red-500" },
];


export function TaskModal({ open, onClose, onSave, editTask }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || "");
      setPriority(editTask.priority);
      setDueDate(editTask.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
    }
  }, [editTask, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), description, priority, project: editTask?.project || "Lainnya", dueDate, completed: editTask?.completed || false });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <h2 className="text-foreground" style={{ fontSize: "16px", fontWeight: 600 }}>
            {editTask ? "Edit Tugas" : "Buat Tugas Baru"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nama tugas..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
              style={{ fontSize: "18px", fontWeight: 500 }}
              autoFocus
            />
          </div>

          <div>
            <textarea
              placeholder="Tambahkan deskripsi (opsional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-input-background rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground outline-none resize-none border border-transparent focus:border-border transition-colors"
              style={{ fontSize: "13px" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "11px", fontWeight: 500 }}>
                <Flag className="w-3 h-3 inline mr-1" />PRIORITAS
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-input-background rounded-lg px-3 py-2 text-foreground outline-none border border-transparent focus:border-border transition-colors appearance-none cursor-pointer"
                style={{ fontSize: "13px" }}
              >
                {priorities.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: "11px", fontWeight: 500 }}>
                <Calendar className="w-3 h-3 inline mr-1" />TENGGAT
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-input-background rounded-lg px-3 py-2 text-foreground outline-none border border-transparent focus:border-border transition-colors cursor-pointer"
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted transition-colors"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 py-2.5 rounded-xl bg-foreground text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {editTask ? "Simpan Perubahan" : "Buat Tugas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
