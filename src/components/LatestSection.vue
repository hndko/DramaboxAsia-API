<script setup>
import { onMounted } from "vue";
import { useLatest } from "../composables/useDrama";

const { data: latestDramas, loading, hasMore, fetch, loadMore } = useLatest();

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
        <a
          href="#"
          class="text-pink-400 hover:text-pink-300 text-sm font-medium flex items-center gap-1 transition-colors"
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
        </a>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading && latestDramas.length === 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div v-for="n in 12" :key="n" class="animate-pulse">
          <div class="aspect-2/3 rounded-xl bg-white/10"></div>
          <div class="mt-2 h-4 bg-white/10 rounded w-3/4"></div>
          <div class="mt-1 h-3 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Latest Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div
          v-for="drama in latestDramas"
          :key="drama.bookId"
          class="group cursor-pointer"
        >
          <div class="relative rounded-xl overflow-hidden card-hover">
            <!-- Poster -->
            <div
              class="aspect-2/3 relative bg-gradient-to-br from-pink-600 to-purple-600"
            >
              <img
                :src="drama.cover"
                :alt="drama.judul"
                class="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                @error="$event.target.style.display = 'none'"
              />

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <div
                  class="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <!-- NEW Badge -->
              <div
                class="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded"
              >
                NEW
              </div>

              <!-- Episode Count -->
              <div
                class="absolute bottom-2 left-2 bg-black/50 backdrop-blur text-white text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {{ drama.total_episode }}
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="mt-2 px-1">
            <h3
              class="text-white font-semibold text-sm truncate group-hover:text-pink-400 transition-colors"
            >
              {{ drama.judul }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="latestDramas.length > 0 && hasMore" class="text-center mt-8">
        <button
          @click="loadMore"
          :disabled="loading"
          class="btn-primary px-8 py-3 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
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
