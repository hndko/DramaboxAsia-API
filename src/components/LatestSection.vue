<script setup>
import { onMounted, computed } from "vue";
import { useLatest } from "../composables/useDrama";
import DramaCard from "./DramaCard.vue";

const props = defineProps({
  limit: {
    type: Number,
    default: 0, // 0 = show all
  },
});

const { data: latestDramas, loading, hasMore, fetch, loadMore } = useLatest();

const displayDramas = computed(() => {
  if (props.limit > 0) {
    return latestDramas.value.slice(0, props.limit);
  }
  return latestDramas.value;
});

onMounted(() => {
  fetch(true);
});
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
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
            <h2 class="text-2xl font-bold text-white">Latest Updates</h2>
            <p class="text-gray-400 text-sm">Fresh dramas just added</p>
          </div>
        </div>
        <router-link
          to="/latest"
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
        v-if="loading && latestDramas.length === 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div v-for="n in limit || 12" :key="n" class="animate-pulse">
          <div class="aspect-2/3 rounded-xl bg-white/10"></div>
          <div class="mt-2 h-4 bg-white/10 rounded w-3/4"></div>
        </div>
      </div>

      <!-- Latest Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <DramaCard
          v-for="drama in displayDramas"
          :key="drama.bookId"
          :drama="drama"
          :show-new-badge="true"
        />
      </div>

      <!-- Load More (only on homepage) -->
      <div
        v-if="!limit && latestDramas.length > 0 && hasMore"
        class="text-center mt-8"
      >
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
        class="text-center py-12"
      >
        <p class="text-gray-400">No latest dramas available</p>
      </div>
    </div>
  </section>
</template>
