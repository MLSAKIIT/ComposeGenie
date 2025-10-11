import { Link, useNavigate } from "react-router-dom";

type TemplateItem = {
  id: string;
  name: string;
  updatedAt: string; // ISO string
};

type ScanItem = {
  id: string;
  target: string;
  status: "passed" | "issues" | "failed";
  ranAt: string; // ISO string
};

const mockTemplates: TemplateItem[] = [
  { id: "t1", name: "Next.js + Postgres", updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: "t2", name: "Mongo + Express API", updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() },
  { id: "t3", name: "Redis Cache", updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
];

const mockScans: ScanItem[] = [
  { id: "s1", target: "compose.prod.yml", status: "passed", ranAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: "s2", target: "compose.dev.yml", status: "issues", ranAt: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
  { id: "s3", target: "compose.demo.yml", status: "failed", ranAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

const Stat = ({ label, value, accent }: { label: string; value: string | number; accent?: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
    <div className="text-sm text-gray-400">{label}</div>
    <div className={`mt-1 text-2xl font-semibold ${accent ?? "text-white"}`}>{value}</div>
  </div>
);

const statusPillStyles: Record<ScanItem["status"], string> = {
  passed: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  issues: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  failed: "bg-rose-500/15 text-rose-300 border-rose-400/20",
};

const formatTimeAgo = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diffMs / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

const Card = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

const Icon = ({ name, className }: { name: "plus" | "catalog" | "scan" | "template" | "shield"; className?: string }) => {
  const cn = `h-5 w-5 ${className ?? ""}`;
  switch (name) {
    case "plus":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
        </svg>
      );
    case "catalog":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );
    case "scan":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h10M4 17h7" />
        </svg>
      );
    case "template":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3h8a2 2 0 0 1 2 2v14l-6-3-6 3V5a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" />
        </svg>
      );
  }
};

const Dashboard = () => {
  const navigate = useNavigate();

  const totalTemplates = mockTemplates.length;
  const recentScans = mockScans.length;
  const passed = mockScans.filter((s) => s.status === "passed").length;

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">Dashboard</h1>
          <p className="mt-1 text-gray-400">A bird's-eye view of your activity and system health.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => navigate("/templates")}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-emerald-300 hover:bg-emerald-500/20"
          >
            <Icon name="plus" /> New Compose
          </button>
          <button
            onClick={() => navigate("/security")}
            className="inline-flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-amber-300 hover:bg-amber-500/20"
          >
            <Icon name="scan" /> Run Scan
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Templates" value={totalTemplates} accent="text-sky-300" />
        <Stat label="Recent Scans" value={recentScans} accent="text-amber-300" />
        <Stat label="Passed Scans" value={passed} accent="text-emerald-300" />
        <Stat label="Validation Status" value={passed === recentScans ? "Healthy" : "Attention"} accent={passed === recentScans ? "text-emerald-300" : "text-amber-300"} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Templates */}
        <Card
          title="Recent Templates"
          action={
            <Link to="/templates" className="text-sm text-sky-300 hover:underline">
              View all
            </Link>
          }
        >
          <ul className="divide-y divide-white/10">
            {mockTemplates.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Icon name="template" className="text-sky-300" />
                  </div>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-gray-400">Updated {formatTimeAgo(t.updatedAt)}</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/templates")}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent Scans */}
        <Card
          title="Recent Scans"
          action={
            <Link to="/security" className="text-sm text-amber-300 hover:underline">
              View all
            </Link>
          }
        >
          <ul className="divide-y divide-white/10">
            {mockScans.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Icon name="shield" className="text-amber-300" />
                  </div>
                  <div>
                    <div className="font-medium">{s.target}</div>
                    <div className="text-xs text-gray-400">Ran {formatTimeAgo(s.ranAt)}</div>
                  </div>
                </div>
                <span className={`rounded-full border px-2 py-1 text-xs ${statusPillStyles[s.status]}`}>{s.status}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Quick Actions */}
        <Card
          title="Quick Actions"
          action={<span className="text-sm text-gray-400">Boost your flow</span>}
        >
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => navigate("/templates")}
              className="group inline-flex items-center justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-left hover:bg-emerald-500/20"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                  <Icon name="plus" />
                </span>
                <div>
                  <div className="font-medium">Create New Compose</div>
                  <div className="text-sm text-emerald-200/80">Start from a template or blank</div>
                </div>
              </div>
              <span className="opacity-60 transition group-hover:opacity-100">→</span>
            </button>

            <Link
              to="/catalog"
              className="group inline-flex items-center justify-between gap-3 rounded-xl border border-sky-400/20 bg-sky-500/10 p-4 hover:bg-sky-500/20"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/15 text-sky-300">
                  <Icon name="catalog" />
                </span>
                <div>
                  <div className="font-medium">Open Catalog</div>
                  <div className="text-sm text-sky-200/80">Browse ready-to-use stacks</div>
                </div>
              </div>
              <span className="opacity-60 transition group-hover:opacity-100">→</span>
            </Link>

            <Link
              to="/security"
              className="group inline-flex items-center justify-between gap-3 rounded-xl border border-amber-400/20 bg-amber-500/10 p-4 hover:bg-amber-500/20"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300">
                  <Icon name="scan" />
                </span>
                <div>
                  <div className="font-medium">Run Security Scan</div>
                  <div className="text-sm text-amber-200/80">Check configs for issues</div>
                </div>
              </div>
              <span className="opacity-60 transition group-hover:opacity-100">→</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
