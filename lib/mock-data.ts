import type { Column, DashboardMetrics, RecentTest, Task } from "@/lib/types";

export const initialColumns: Column[] = [
  { id: "todo", title: "To Do", color: "#f1f5f9" },
  { id: "in-progress", title: "In Progress", color: "#eff6ff" },
  { id: "review", title: "Review", color: "#fffbeb" },
  { id: "done", title: "Done", color: "#f0fdf4" },
];

export const initialTasks: Task[] = [
  { id: "1", title: "Design new landing page", description: "Create wireframes and mockups", columnId: "todo" },
  { id: "2", title: "Update documentation", description: "Add API reference guides", columnId: "todo" },
  { id: "3", title: "Fix navigation bug", description: "Mobile menu not closing properly", columnId: "in-progress" },
  { id: "4", title: "Implement search feature", description: "Add full-text search capability", columnId: "in-progress" },
  { id: "5", title: "Code review PR #234", description: "Review authentication changes", columnId: "review" },
  { id: "6", title: "Set up CI/CD pipeline", description: "Automated testing and deployment", columnId: "done" },
];

export const dashboardMetrics: DashboardMetrics = {
  aiRequests: 120,
  testsCreated: 18,
  failedRuns: 2,
};

export const recentTests: RecentTest[] = [
  { name: "Login flow", status: "stable" },
  { name: "Checkout flow", status: "flaky" },
  { name: "Payment redirect", status: "stable" },
];
