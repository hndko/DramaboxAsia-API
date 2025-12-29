<script setup>
import { onMounted } from "vue";
import { useTrending } from "../composables/useDrama";
import DramaCard from "../components/DramaCard.vue";

const { data: trendingDramas, loading, fetch } = useTrending();

onMounted(() => {
  fetch();
});
</script>

<template>
  <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01.56-1.71l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.51 5.13 5.7.83a1 1 0 01.56 1.71l-4.12 4 1 5.63a1 1 0 01-1 1.18z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Trending Dramas</h1>
            <p class="text-gray-400">Most watched dramas this week</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <div v-for="n in 10" :key="n" class="animate-pulse">
          <div class="aspect-2/3 rounded-xl bg-white/10"></div>
          <div class="mt-2 h-4 bg-white/10 rounded w-3/4"></div>
          <div class="mt-1 h-3 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Trending Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <DramaCard
          v-for="drama in trendingDramas"
          :key="drama.bookId"
          :drama="drama"
          :show-rank="true"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && trendingDramas.length === 0"
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">
          No Trending Dramas
        </h3>
        <p class="text-gray-400">Check back later for trending content</p>
      </div>
    </div>
  </div>
</template>
