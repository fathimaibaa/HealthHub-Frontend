export default function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response?: { data?: { message?: string } | string };
      message?: string;
    };
    const data = axiosError.response?.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object" && data.message) return data.message;
    if (axiosError.message) return axiosError.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
