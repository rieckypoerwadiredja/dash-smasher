export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(
      "There was a problem communicating with the server. Please try again later."
    );
  const data = await res.json();
  return (data.data || data) as T;
}
