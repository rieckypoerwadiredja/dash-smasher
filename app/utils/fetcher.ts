import { Session } from "next-auth";
import generateId from "./generateId";
import { APIError, APIResponse } from "../types/apiResponse";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function fetchData<T>(
  url: string,
  options?: {
    runtime?: boolean;
    method?: "GET" | "POST" | "PUT";
    body?: unknown;
  }
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


  if (!url.startsWith(API_BASE_URL)) {
    throw new Error("Invalid URL");
  }

  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  
 const res = await fetch(url, fetchOptions);

  // parse JSON
  const json: APIResponse<T> = await res.json();
console.log(json)
  // handle error format from API
  if (!json.success) {
    throw new Error(json.message || "Request failed");
  }

  return json.data as T;

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
    route.refresh();
  } catch (err) {
    console.log(err);
    alert(err instanceof Error ? err.message : "Failed to join");
  }
}
