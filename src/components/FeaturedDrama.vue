<script setup>
const featuredDrama = {
  title: "Lovely Runner",
  description:
    "A heartwarming time-travel romance where a devoted fan goes back in time to save her favorite idol from a tragic accident. Will love transcend time and fate?",
  genre: ["Romance", "Fantasy", "Time-Travel"],
  rating: 9.4,
  year: 2024,
  episodes: 16,
  starring: ["Byeon Woo-seok", "Kim Hye-yoon"],
};
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Featured Banner -->
      <div class="glass rounded-2xl overflow-hidden">
        <div class="grid lg:grid-cols-2 gap-0">
          <!-- Image Side -->
          <div class="relative h-64 lg:h-auto">
            <div
              class="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700"
            ></div>

            <!-- Decorative Elements -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center space-y-3">
                <div
                  class="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform pulse-glow"
                >
                  <svg
                    class="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p class="text-white/80 text-sm">Watch Trailer</p>
              </div>
            </div>

            <!-- Editor's Pick Badge -->
            <div
              class="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              Editor's Pick
            </div>
          </div>

          <!-- Content Side -->
          <div class="p-6 lg:p-8 flex flex-col justify-center">
            <div class="space-y-4">
              <div class="flex items-center gap-2 flex-wrap">
                <span
                  v-for="genre in featuredDrama.genre"
                  :key="genre"
                  class="bg-pink-500/20 text-pink-300 text-xs font-medium px-3 py-1 rounded-full border border-pink-500/30"
                >
                  {{ genre }}
                </span>
              </div>

              <h2 class="text-2xl lg:text-3xl font-bold text-white">
                {{ featuredDrama.title }}
              </h2>

              <p class="text-gray-400 text-sm leading-relaxed">
                {{ featuredDrama.description }}
              </p>

              <!-- Meta Info -->
              <div class="flex flex-wrap items-center gap-4 text-sm">
                <div class="flex items-center gap-1.5 text-yellow-400">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                  <span class="font-bold">{{ featuredDrama.rating }}</span>
                </div>
                <span class="text-gray-500">•</span>
                <span class="text-gray-400">{{ featuredDrama.year }}</span>
                <span class="text-gray-500">•</span>
                <span class="text-gray-400"
                  >{{ featuredDrama.episodes }} Episodes</span
                >
              </div>

              <!-- Cast -->
              <div class="flex items-center gap-3">
                <span class="text-gray-500 text-sm">Starring:</span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="star in featuredDrama.starring"
                    :key="star"
                    class="text-white text-sm"
                  >
                    {{ star }}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-wrap gap-3 pt-2">
                <button
                  class="btn-primary px-6 py-2.5 rounded-full text-white font-semibold flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Now
                </button>
                <button
                  class="glass px-6 py-2.5 rounded-full text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
