/**
 * DramaBox Asia - API Service Layer
 *
 * Features:
 * - Centralized API configuration
 * - Request caching with TTL
 * - Concurrent request handling (multi-thread simulation)
 * - Error handling & retry logic
 * - Request deduplication
 */

// Use relative URL in development (proxied by Vite) or full URL in production
const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_BASE_URL || "https://dramabox-asia.vercel.app/api";

// Cache configuration
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const pendingRequests = new Map(); // For request deduplication

/**
 * Generate cache key from URL and params
 */
function getCacheKey(endpoint, params = {}) {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return `${endpoint}?${sortedParams}`;
}

/**
 * Check if cached data is still valid
 */
function isValidCache(cacheEntry) {
  if (!cacheEntry) return false;
  return Date.now() - cacheEntry.timestamp < CACHE_TTL;
}

/**
 * Core fetch function with caching and error handling
 */
async function fetchAPI(endpoint, params = {}, options = {}) {
  const { useCache = true, retries = 2, timeout = 10000 } = options;

  const cacheKey = getCacheKey(endpoint, params);

  // Check cache first
  if (useCache && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (isValidCache(cached)) {
      return cached.data;
    }
    cache.delete(cacheKey);
  }

  // Deduplicate concurrent requests
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  // Build URL with query params
  const url = new URL(endpoint, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });

  // Create request promise with timeout
  const requestPromise = (async () => {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache successful response
        if (useCache && data.status === "success") {
          cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
          });
        }

        return data;
      } catch (error) {
        lastError = error;

        // Don't retry on abort or client errors
        if (error.name === "AbortError" || attempt === retries) {
          break;
        }

        // Exponential backoff
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 500));
      }
    }

    throw lastError;
  })();

  // Store pending request for deduplication
  pendingRequests.set(cacheKey, requestPromise);

  try {
    return await requestPromise;
  } finally {
    pendingRequests.delete(cacheKey);
  }
}

/**
 * Parallel fetch multiple endpoints
 * Simulates multi-threading for concurrent data loading
 */
async function fetchParallel(requests) {
  const results = await Promise.allSettled(
    requests.map(({ endpoint, params, options }) =>
      fetchAPI(endpoint, params, options)
    )
  );

  return results.map((result, index) => ({
    endpoint: requests[index].endpoint,
    success: result.status === "fulfilled",
    data: result.status === "fulfilled" ? result.value : null,
    error: result.status === "rejected" ? result.reason.message : null,
  }));
}

/**
 * Clear all cache or specific endpoint
 */
function clearCache(endpoint = null) {
  if (endpoint) {
    for (const key of cache.keys()) {
      if (key.startsWith(endpoint)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
}

// ============================================
// API Endpoint Functions
// ============================================

/**
 * Search dramas by keyword
 * @param {string} query - Search keyword
 */
export async function searchDramas(query) {
  if (!query || query.trim() === "") {
    return { status: "success", data: [], total_results: 0 };
  }
  return fetchAPI("/api/search", { q: query.trim() });
}

/**
 * Get latest dramas (paginated)
 * @param {number} page - Page number (default: 1)
 */
export async function getLatestDramas(page = 1) {
  return fetchAPI("/api/latest", { page });
}

/**
 * Get trending dramas
 */
export async function getTrendingDramas() {
  return fetchAPI("/api/trending");
}

/**
 * Get drama detail by bookId
 * @param {string} bookId - Drama book ID
 */
export async function getDramaDetail(bookId) {
  if (!bookId) {
    throw new Error("bookId is required");
  }
  return fetchAPI("/api/detail", { bookId });
}

/**
 * Get stream URL for episode
 * @param {string} bookId - Drama book ID
 * @param {number} episode - Episode number
 */
export async function getStreamUrl(bookId, episode = 1) {
  if (!bookId) {
    throw new Error("bookId is required");
  }
  // Stream URLs should not be cached long (they expire)
  return fetchAPI("/api/stream", { bookId, episode }, { useCache: false });
}

/**
 * Load initial homepage data in parallel
 * Fetches trending and latest simultaneously
 */
export async function getHomePageData() {
  const results = await fetchParallel([
    { endpoint: "/api/trending" },
    { endpoint: "/api/latest", params: { page: 1 } },
  ]);

  return {
    trending: results[0].success ? results[0].data : null,
    latest: results[1].success ? results[1].data : null,
    errors: results.filter((r) => !r.success).map((r) => r.error),
  };
}

// Export utilities
export { fetchParallel, clearCache };

// Default export
export default {
  searchDramas,
  getLatestDramas,
  getTrendingDramas,
  getDramaDetail,
  getStreamUrl,
  getHomePageData,
  fetchParallel,
  clearCache,
};
