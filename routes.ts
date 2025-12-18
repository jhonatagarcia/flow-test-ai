export type RouteItem = {
  path: string;
  label: string;
  requireAuth?: boolean;
  order?: number;
};

const routes: RouteItem[] = [
  { path: "/dashboard", label: "Dashboard", requireAuth: true, order: 1 },
  { path: "/projects", label: "Projects", requireAuth: true, order: 2 },
  { path: "/recorder", label: "Recorder", requireAuth: true, order: 3 },
  { path: "/settings", label: "Settings", requireAuth: true, order: 4 },
];

export default routes;
