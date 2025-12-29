import { ref, readonly, shallowRef } from "vue";
import {
  getHomePageData,
  getLatestDramas as fetchLatest,
  getTrendingDramas as fetchTrending,
  searchDramas as fetchSearch,
  getDramaDetail as fetchDetail,
  getStreamUrl as fetchStream,
} from "../services/api";

/**
 * Composable for fetching homepage data (trending + latest)
 * Uses parallel fetching for optimal load time
 */
export function useHomeData() {
  const trending = shallowRef([]);
  const latest = shallowRef([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchData() {
    loading.value = true;
    error.value = null;

    try {
      const result = await getHomePageData();

      if (result.trending?.data) {
        trending.value = result.trending.data;
      }
      if (result.latest?.data) {
        latest.value = result.latest.data;
      }
      if (result.errors?.length > 0) {
        console.warn("Some requests failed:", result.errors);
      }
    } catch (e) {
      error.value = e.message;
      console.error("Failed to fetch home data:", e);
    } finally {
      loading.value = false;
    }
  }

  return {
    trending: readonly(trending),
    latest: readonly(latest),
    loading: readonly(loading),
    error: readonly(error),
    fetchData,
  };
}

/**
 * Composable for trending dramas
 */
export function useTrending() {
  const data = shallowRef([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetch() {
    loading.value = true;
    error.value = null;

    try {
      const result = await fetchTrending();
      if (result.status === "success") {
        data.value = result.data || [];
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
  };
}

/**
 * Composable for latest dramas with pagination
 */
export function useLatest() {
  const data = shallowRef([]);
  const page = ref(1);
  const loading = ref(false);
  const error = ref(null);
  const hasMore = ref(true);

  async function fetch(resetPage = false) {
    if (resetPage) {
      page.value = 1;
      data.value = [];
    }

    loading.value = true;
    error.value = null;

    try {
      const result = await fetchLatest(page.value);
      if (result.status === "success") {
        const newData = result.data || [];
        if (resetPage) {
          data.value = newData;
        } else {
          data.value = [...data.value, ...newData];
        }
        hasMore.value = newData.length >= 12; // Assuming 12 per page
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function loadMore() {
    if (!loading.value && hasMore.value) {
      page.value++;
      await fetch();
    }
  }

  return {
    data: readonly(data),
    page: readonly(page),
    loading: readonly(loading),
    error: readonly(error),
    hasMore: readonly(hasMore),
    fetch,
    loadMore,
  };
}

/**
 * Composable for search functionality
 */
export function useSearch() {
  const results = shallowRef([]);
  const query = ref("");
  const loading = ref(false);
  const error = ref(null);
  const totalResults = ref(0);

  let debounceTimer = null;

  async function search(searchQuery) {
    query.value = searchQuery;

    if (!searchQuery || searchQuery.trim() === "") {
      results.value = [];
      totalResults.value = 0;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const result = await fetchSearch(searchQuery);
      if (result.status === "success") {
        results.value = result.data || [];
        totalResults.value = result.total_results || 0;
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  function debouncedSearch(searchQuery, delay = 300) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => search(searchQuery), delay);
  }

  function clearSearch() {
    query.value = "";
    results.value = [];
    totalResults.value = 0;
    error.value = null;
  }

  return {
    results: readonly(results),
    query: readonly(query),
    loading: readonly(loading),
    error: readonly(error),
    totalResults: readonly(totalResults),
    search,
    debouncedSearch,
    clearSearch,
  };
}

/**
 * Composable for drama detail
 */
export function useDramaDetail() {
  const drama = shallowRef(null);
  const loading = ref(false);
  const error = ref(null);

  async function fetch(bookId) {
    if (!bookId) {
      error.value = "Book ID is required";
      return;
    }

    loading.value = true;
    error.value = null;
    drama.value = null;

    try {
      const result = await fetchDetail(bookId);
      if (result.status === "success") {
        drama.value = result;
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    drama: readonly(drama),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
  };
}

/**
 * Composable for video streaming
 */
export function useStream() {
  const streamData = shallowRef(null);
  const loading = ref(false);
  const error = ref(null);

  async function fetch(bookId, episode = 1) {
    if (!bookId) {
      error.value = "Book ID is required";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const result = await fetchStream(bookId, episode);
      if (result.status === "success") {
        streamData.value = result.data;
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    streamData: readonly(streamData),
    loading: readonly(loading),
    error: readonly(error),
    fetch,
  };
}
