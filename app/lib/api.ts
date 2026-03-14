export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const {
    timeout = 10000,
    retries = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;

  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * i));
      }

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(id);

      // Handle Cloudflare/Tunnel errors specifically
      if (response.status === 530 || response.status === 502) {
        console.error(`🚩 Tunnel Error (${response.status}): Cloudflare cannot reach your local backend. Please restart your tunnel!`);
      }

      return response;

    } catch (err: any) {
      clearTimeout(id);
      lastError = err;
      
      if (err.name !== 'AbortError') {
        console.error(`Fetch to ${url} failed: ${err.message}`);
      }

      if (i === retries) break;
    }
  }

  throw lastError || new Error(`Failed to fetch ${url} after ${retries} retries`);
}
