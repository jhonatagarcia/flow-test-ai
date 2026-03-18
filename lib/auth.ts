import type { UserSession } from "@/lib/types";

export const USER_STORAGE_KEY = "user";
export const USER_COOKIE_KEY = "user";
export const PUBLIC_PATHS: string[] = ["/", "/login"];

export function serializeUserSession(user: UserSession): string {
  return JSON.stringify(user);
}

export function persistUserSession(user: UserSession): void {
  const serializedUser = serializeUserSession(user);
  localStorage.setItem(USER_STORAGE_KEY, serializedUser);
  document.cookie = `${USER_COOKIE_KEY}=${encodeURIComponent(serializedUser)}; path=/; SameSite=Lax`;
}

export function getStoredUserSession(): UserSession | null {
  const rawUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as UserSession;
  } catch {
    return null;
  }
}

export function getSafeRedirectPath(redirectParam: string | null | undefined): string {
  if (!redirectParam) {
    return "/dashboard";
  }

  if (!redirectParam.startsWith("/") || redirectParam.startsWith("//")) {
    return "/dashboard";
  }

  return redirectParam;
}
