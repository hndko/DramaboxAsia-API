<script setup>
import { computed } from "vue";
import { useWatchlist } from "../composables/useWatchlist";
import DramaCard from "../components/DramaCard.vue";

const { watchlist, clearList } = useWatchlist();

const sortedList = computed(() => {
  return [...watchlist.value].sort((a, b) => b.addedAt - a.addedAt);
});
</script>

<template>
  <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">My List</h1>
            <p class="text-gray-400">
              {{ watchlist.length }} drama{{
                watchlist.length !== 1 ? "s" : ""
              }}
              saved
            </p>
          </div>
        </div>

        <button
          v-if="watchlist.length > 0"
          @click="clearList"
          class="text-gray-400 hover:text-red-400 text-sm font-medium flex items-center gap-1 transition-colors"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear All
        </button>
      </div>

      <!-- Watchlist Grid -->
      <div
        v-if="sortedList.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <DramaCard
          v-for="drama in sortedList"
          :key="drama.bookId"
          :drama="drama"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div
          class="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-12 h-12 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold text-white mb-3">
          Your list is empty
        </h3>
        <p class="text-gray-400 mb-6 max-w-md mx-auto">
          Start adding dramas to your watchlist by clicking the heart icon or
          "Add to List" button on any drama.
        </p>
        <router-link
          to="/trending"
          class="btn-primary px-6 py-3 rounded-full text-white font-semibold inline-flex items-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Browse Dramas
        </router-link>
      </div>
    </div>
  </div>
</template>
