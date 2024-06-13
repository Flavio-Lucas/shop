export interface HttpResponse<T> {
  success: T | null;
  error: any | null;
}
