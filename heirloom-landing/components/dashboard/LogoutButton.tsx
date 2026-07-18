"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/dashboard/logout", { method: "POST" });
        router.push("/dashboard/login");
        router.refresh();
      }}
      className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-medium text-ink/70 transition hover:border-ink/30 hover:text-ink"
    >
      Log out
    </button>
  );
}
