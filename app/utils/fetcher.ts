export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchData<T>(
  url: string,
  options?: { runtime?: boolean }
): Promise<T> {
  const fetchOptions: RequestInit = {};

  if (options?.runtime) {
    // runtime fetch for component dynamic
    fetchOptions.cache = "no-store";
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok)
    throw new Error(
      "There was a problem communicating with the server. Please try again later."
    );

  const data = await res.json();
  return (data.data || data) as T;
}
