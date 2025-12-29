import { ref, watch } from "vue";

const STORAGE_KEY = "dramabox_watchlist";

// Shared reactive state
const watchlist = ref([]);

// Initialize from localStorage
function loadWatchlist() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      watchlist.value = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load watchlist:", e);
    watchlist.value = [];
  }
}

// Save to localStorage
function saveWatchlist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist.value));
  } catch (e) {
    console.error("Failed to save watchlist:", e);
  }
}

// Initialize on first import
loadWatchlist();

// Watch for changes and auto-save
watch(watchlist, saveWatchlist, { deep: true });

/**
 * Composable for managing watchlist/favorites
 */
export function useWatchlist() {
  /**
   * Add drama to watchlist
   */
  function addToList(drama) {
    if (!drama || !drama.bookId) return false;

    // Check if already in list
    const exists = watchlist.value.some((item) => item.bookId === drama.bookId);
    if (exists) return false;

    watchlist.value.push({
      bookId: drama.bookId,
      judul: drama.judul,
      cover: drama.cover,
      total_episode: drama.total_episode,
      addedAt: Date.now(),
    });

    return true;
  }

  /**
   * Remove drama from watchlist
   */
  function removeFromList(bookId) {
    const index = watchlist.value.findIndex((item) => item.bookId === bookId);
    if (index > -1) {
      watchlist.value.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Toggle drama in watchlist
   */
  function toggleList(drama) {
    if (isInList(drama.bookId)) {
      removeFromList(drama.bookId);
      return false;
    } else {
      addToList(drama);
      return true;
    }
  }

  /**
   * Check if drama is in watchlist
   */
  function isInList(bookId) {
    return watchlist.value.some((item) => item.bookId === bookId);
  }

  /**
   * Clear entire watchlist
   */
  function clearList() {
    watchlist.value = [];
  }

  /**
   * Get watchlist count
   */
  function getCount() {
    return watchlist.value.length;
  }

  return {
    watchlist,
    addToList,
    removeFromList,
    toggleList,
    isInList,
    clearList,
    getCount,
  };
}
