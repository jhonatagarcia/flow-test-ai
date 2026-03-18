export interface UserSession {
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

export interface DashboardMetrics {
  aiRequests: number;
  testsCreated: number;
  failedRuns: number;
}

export interface RecentTest {
  name: string;
  status: "stable" | "flaky";
}

export interface RecorderStep {
  ts: number;
  action: string;
  selector: string;
}

export interface SampleUIItem {
  id: string;
  label: string;
}

export interface RouteItem {
  path: string;
  label: string;
  requireAuth?: boolean;
  order?: number;
}
