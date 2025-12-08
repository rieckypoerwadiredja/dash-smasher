/* eslint-disable @typescript-eslint/no-explicit-any */
export interface APIResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
}
