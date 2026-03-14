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
        console.log(`Retry ${i}/${retries} for ${url}...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay * i));
      }

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(id);
      return response;

    } catch (err: any) {
      clearTimeout(id);
      lastError = err;
      
      // Don't retry if it's an abort (manual or timeout) unless you want to
      if (err.name === 'AbortError') {
        console.warn(`Fetch to ${url} timed out after ${timeout}ms`);
      } else {
        console.error(`Fetch to ${url} failed: ${err.message}`);
      }

      if (i === retries) break;
    }
  }

  throw lastError || new Error(`Failed to fetch ${url} after ${retries} retries`);
}
