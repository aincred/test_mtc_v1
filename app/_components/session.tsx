"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export type SessionRole = "admin" | "state" | "district" | "mtc";

const LOGIN_PATH: Record<SessionRole, string> = {
  admin: "/admin",
  state: "/state-user",
  district: "/district-user",
  mtc: "/mtc-user",
};

const STORAGE_KEYS = ["mtc_user", "district_user", "userSession"];

/** Kills the session on the server (DB row + cookie) and clears client storage. */
export async function endSession(role: SessionRole) {
  try {
    STORAGE_KEYS.forEach((k) => sessionStorage.removeItem(k));
    localStorage.removeItem("authToken");
  } catch {}
  try {
    await fetch(`/api/auth/session?role=${role}`, {
      method: "DELETE",
      credentials: "same-origin",
      keepalive: true,
    });
  } catch {}
}

/**
 * Put on a login (main) page: reaching it - including via the browser Back
 * button or the back/forward cache - ends any session for that role.
 */
export function useEndSessionOnLoginPage(role: SessionRole) {
  useEffect(() => {
    endSession(role);
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) endSession(role);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, [role]);
}

/**
 * Put in a dashboard layout. Verifies the session on mount, when the tab regains
 * focus / is restored from bfcache, and every 15s. If the session is gone (logged
 * out, or the account logged in somewhere else) the user is sent to the login page.
 */
export function SessionGuard({ role, children }: { role: SessionRole; children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch(`/api/auth/session?role=${role}`, {
          cache: "no-store",
          credentials: "same-origin",
        });
        if (!cancelled && res.status === 401) {
          try {
            STORAGE_KEYS.forEach((k) => sessionStorage.removeItem(k));
          } catch {}
          router.replace(LOGIN_PATH[role]);
        }
      } catch {
        /* network error: keep the user where they are */
      }
    };
    check();
    const id = setInterval(check, 15000);
    const onVisible = () => document.visibilityState === "visible" && check();
    const onShow = (e: PageTransitionEvent) => e.persisted && check();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);
    window.addEventListener("pageshow", onShow);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
      window.removeEventListener("pageshow", onShow);
    };
  }, [role, router]);

  return <>{children}</>;
}

/**
 * Spread onto the username / password inputs of a login page so their contents
 * cannot be copied or cut (keyboard, context menu, or drag-out).
 * Paste is left enabled so password managers keep working.
 */
export const noCopyProps = {
  onCopy: (e: React.ClipboardEvent) => e.preventDefault(),
  onCut: (e: React.ClipboardEvent) => e.preventDefault(),
  onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  onDragStart: (e: React.DragEvent) => e.preventDefault(),
};
