<script setup>
import { onMounted } from "vue";
import { useLatest } from "../composables/useDrama";
import DramaCard from "../components/DramaCard.vue";

const { data: latestDramas, loading, hasMore, fetch, loadMore } = useLatest();

onMounted(() => {
  fetch(true);
});
</script>

<template>
  <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Latest Updates</h1>
            <p class="text-gray-400">Fresh dramas just added</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading && latestDramas.length === 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <div v-for="n in 15" :key="n" class="animate-pulse">
          <div class="aspect-2/3 rounded-xl bg-white/10"></div>
          <div class="mt-2 h-4 bg-white/10 rounded w-3/4"></div>
          <div class="mt-1 h-3 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Latest Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <DramaCard
          v-for="drama in latestDramas"
          :key="drama.bookId"
          :drama="drama"
          :show-new-badge="true"
        />
      </div>

      <!-- Load More Button -->
      <div v-if="latestDramas.length > 0 && hasMore" class="text-center mt-10">
        <button
          @click="loadMore"
          :disabled="loading"
          class="btn-primary px-8 py-3 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          <svg
            v-if="loading"
            class="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <span>{{ loading ? "Loading..." : "Load More" }}</span>
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && latestDramas.length === 0"
        class="text-center py-20"
      >
        <div
          class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-10 h-10 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">No Latest Dramas</h3>
        <p class="text-gray-400">Check back later for new content</p>
      </div>
    </div>
  </div>
</template>
