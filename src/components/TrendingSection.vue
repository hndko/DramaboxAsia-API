<script setup>
const trendingDramas = [
  {
    id: 1,
    title: "Queen of Tears",
    genre: "Romance • Drama",
    rating: 9.2,
    episodes: 16,
    country: "K-Drama",
    gradient: "from-pink-600 to-purple-600",
    new: true,
  },
  {
    id: 2,
    title: "The Glory",
    genre: "Thriller • Revenge",
    rating: 9.5,
    episodes: 16,
    country: "K-Drama",
    gradient: "from-red-600 to-rose-600",
    new: false,
  },
  {
    id: 3,
    title: "Love Between Fairy",
    genre: "Fantasy • Romance",
    rating: 8.8,
    episodes: 40,
    country: "C-Drama",
    gradient: "from-blue-600 to-indigo-600",
    new: true,
  },
  {
    id: 4,
    title: "F4 Thailand",
    genre: "Romance • Comedy",
    rating: 8.5,
    episodes: 16,
    country: "Thai Drama",
    gradient: "from-purple-600 to-pink-600",
    new: false,
  },
  {
    id: 5,
    title: "My Happy Marriage",
    genre: "Historical • Romance",
    rating: 8.7,
    episodes: 12,
    country: "J-Drama",
    gradient: "from-amber-600 to-orange-600",
    new: false,
  },
];
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

      <!-- Trending Grid -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <div
          v-for="drama in trendingDramas"
          :key="drama.id"
          class="group cursor-pointer"
        >
          <div class="relative rounded-xl overflow-hidden card-hover">
            <!-- Poster Placeholder -->
            <div class="aspect-[2/3] relative">
              <div
                :class="`absolute inset-0 bg-gradient-to-br ${drama.gradient}`"
              ></div>

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

              <!-- Badge -->
              <div
                v-if="drama.new"
                class="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded"
              >
                NEW
              </div>

              <!-- Rating -->
              <div
                class="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1"
              >
                <svg
                  class="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                {{ drama.rating }}
              </div>

              <!-- Country Tag -->
              <div
                class="absolute bottom-2 left-2 bg-white/20 backdrop-blur text-white text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {{ drama.country }}
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="mt-2 px-1">
            <h3
              class="text-white font-semibold text-sm truncate group-hover:text-pink-400 transition-colors"
            >
              {{ drama.title }}
            </h3>
            <p class="text-gray-400 text-xs mt-0.5">{{ drama.genre }}</p>
            <p class="text-gray-500 text-xs mt-0.5">
              {{ drama.episodes }} Episodes
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
