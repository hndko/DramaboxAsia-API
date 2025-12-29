<script setup>
import { onMounted, computed } from "vue";
import { useTrending } from "../composables/useDrama";
import DramaCard from "./DramaCard.vue";

const props = defineProps({
  limit: {
    type: Number,
    default: 0, // 0 = show all
  },
});

const { data: trendingDramas, loading, fetch } = useTrending();

const displayDramas = computed(() => {
  if (props.limit > 0) {
    return trendingDramas.value.slice(0, props.limit);
  }
  return trendingDramas.value;
});

onMounted(() => {
  fetch();
});
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 relative">
    <!-- Section Background -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-pink-900/10 via-transparent to-purple-900/10 pointer-events-none"
    ></div>

    <div class="max-w-6xl mx-auto relative">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
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
            <h2 class="text-2xl font-bold text-white">Trending Now</h2>
            <p class="text-gray-400 text-sm">Most watched this week</p>
          </div>
        </div>
        <router-link
          to="/trending"
          class="text-pink-400 hover:text-pink-300 text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          See All
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </router-link>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div v-for="n in limit || 6" :key="n" class="animate-pulse">
          <div class="aspect-2/3 rounded-xl bg-white/10"></div>
          <div class="mt-2 h-4 bg-white/10 rounded w-3/4"></div>
        </div>
      </div>

      <!-- Trending Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <DramaCard
          v-for="drama in displayDramas"
          :key="drama.bookId"
          :drama="drama"
          :show-rank="true"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && trendingDramas.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-400">No trending dramas available</p>
      </div>
    </div>
  </section>
</template>
