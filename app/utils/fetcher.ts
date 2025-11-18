import { Session } from "next-auth";
import generateId from "./generateId";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchData<T>(
  url: string,
  options?: { runtime?: boolean; method?: "GET" | "POST"; body?: unknown }
): Promise<T> {
  const fetchOptions: RequestInit = {
    method: options?.method || "GET",
    headers: { "Content-Type": "application/json" },
  };

  if (options?.runtime) {
    fetchOptions.cache = "no-store";
  }

  if (options?.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, fetchOptions);

  // Ambil response JSON dulu
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  // Kalau status bukan 2xx, lempar Error dengan message dari server
  if (!res.ok) {
    const msg =
      (data && data.message) ||
      `Server returned status ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return (data.data || data) as T;
}

export async function handleJoin(
  eventId: string,
  session: Session | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any
) {
  if (!session || !session.user?.email || !session.user?.name) {
    route.push("/login");
    return;
  }

  const payload = {
    id: generateId(),
    name: session.user.name,
    email: session.user.email,
    event_id: eventId,
  };

  try {
    const data = await fetchData<{ message: string; data?: unknown }>(
      `${API_BASE_URL}/api/sheets/event_member`,
      { method: "POST", body: payload }
    );
    alert(data.message || "Successfully joined!");
  } catch (err) {
    console.log(err);
    alert(err instanceof Error ? err.message : "Failed to join");
  }
}
