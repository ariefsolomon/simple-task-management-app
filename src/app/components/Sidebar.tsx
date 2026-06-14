import { LayoutDashboard, CheckSquare, ListTodo, Settings, Plus } from "lucide-react";

type View = "dashboard" | "all" | "today";

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
  onNewTask: () => void;
  taskCounts: { all: number; today: number; done: number };
}

const navItems = [
  { id: "dashboard" as View, label: "Dashboard", icon: LayoutDashboard },
  { id: "all" as View, label: "Semua Tugas", icon: ListTodo },
  { id: "today" as View, label: "Hari Ini", icon: CheckSquare },
];

export function Sidebar({ activeView, onViewChange, onNewTask, taskCounts }: SidebarProps) {
  return (
    <aside className="w-60 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      <div className="px-5 pt-6 pb-4 border-b border-border">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
            <CheckSquare className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-foreground tracking-tight" style={{ fontSize: "15px", fontWeight: 600 }}>TaskFlow</span>
        </div>
        <button
          onClick={onNewTask}
          className="w-full flex items-center justify-center gap-2 bg-foreground text-primary-foreground rounded-lg py-2.5 px-4 hover:opacity-90 transition-opacity"
          style={{ fontSize: "13px", fontWeight: 500 }}
        >
          <Plus className="w-3.5 h-3.5" />
          Tugas Baru
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-left ${
                isActive
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span style={{ fontSize: "13px", fontWeight: 500 }}>{label}</span>
              </div>
              {id === "all" && (
                <span
                  className={`rounded-full px-1.5 py-0.5 ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
                  style={{ fontSize: "11px", fontWeight: 500 }}
                >
                  {taskCounts.all}
                </span>
              )}
              {id === "today" && (
                <span
                  className={`rounded-full px-1.5 py-0.5 ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
                  style={{ fontSize: "11px", fontWeight: 500 }}
                >
                  {taskCounts.today}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <button
          onClick={() => {}}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span style={{ fontSize: "13px", fontWeight: 500 }}>Pengaturan</span>
        </button>

        <div className="mt-3 px-3 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-primary-foreground" style={{ fontSize: "11px", fontWeight: 600 }}>AR</span>
          </div>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 500 }} className="text-foreground">Andi Reza</p>
            <p style={{ fontSize: "11px" }} className="text-muted-foreground">andi@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
