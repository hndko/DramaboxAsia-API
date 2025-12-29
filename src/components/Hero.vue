<script setup>
import { ref, onMounted } from "vue";
import { useTrending } from "../composables/useDrama";

const { data: trendingDramas, fetch } = useTrending();
const featuredDrama = ref(null);

onMounted(async () => {
  await fetch();
  // Use first trending drama as featured
  if (trendingDramas.value.length > 0) {
    featuredDrama.value = trendingDramas.value[0];
  }
});
</script>

<template>
  <section class="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto relative">
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <!-- Text Content -->
        <div class="space-y-6 fade-in-up">
          <div
            class="inline-flex items-center space-x-2 bg-pink-500/20 border border-pink-500/30 rounded-full px-4 py-1.5"
          >
            <span class="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            <span class="text-pink-300 text-sm font-medium"
              >Streaming Now • 10,000+ Episodes</span
            >
          </div>

          <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
            <span class="text-white">Discover Asian</span>
            <br />
            <span class="gradient-text">Drama Magic</span>
          </h1>

          <p class="text-gray-400 text-base leading-relaxed max-w-lg">
            Stream the latest K-Dramas, C-Dramas, Thai dramas, and more.
            Experience captivating stories with HD quality and subtitles in your
            language.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="btn-primary px-8 py-3 rounded-full text-white font-semibold flex items-center justify-center space-x-2 group"
            >
              <svg
                class="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Watch Now</span>
            </button>
            <button
              class="glass px-8 py-3 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Learn More</span>
            </button>
          </div>

          <!-- Stats -->
          <div class="flex flex-wrap gap-8 pt-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-white">50K+</div>
              <div class="text-gray-400 text-sm">Active Users</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white">2,500+</div>
              <div class="text-gray-400 text-sm">Drama Series</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-white">4.9★</div>
              <div class="text-gray-400 text-sm">User Rating</div>
            </div>
          </div>
        </div>

        <!-- Hero Image / Featured Card -->
        <div
          class="relative lg:h-[450px] fade-in-up"
          style="animation-delay: 0.2s"
        >
          <div class="glass rounded-2xl p-4 card-hover">
            <div class="relative aspect-3/4 rounded-xl overflow-hidden">
              <!-- Featured Drama Cover -->
              <template v-if="featuredDrama">
                <img
                  :src="featuredDrama.cover"
                  :alt="featuredDrama.judul"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                ></div>
              </template>
              <div
                v-else
                class="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 shimmer"
              ></div>

              <!-- Content Overlay -->
              <div
                class="absolute inset-0 flex flex-col items-center justify-center p-6"
              >
                <div
                  class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-transform pulse-glow"
                >
                  <svg
                    class="w-10 h-10 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h3 class="text-white text-xl font-bold text-center">
                  {{ featuredDrama?.judul || "Loading..." }}
                </h3>
                <p class="text-white/70 text-sm mt-1">
                  {{ featuredDrama?.total_episode || "" }}
                </p>
                <div class="flex items-center gap-2 mt-3">
                  <span
                    class="bg-pink-500 text-white text-xs px-2 py-1 rounded-full"
                    >Trending</span
                  >
                  <span
                    class="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                    >Drama</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Cards -->
          <div
            class="absolute -bottom-4 -left-4 glass rounded-xl p-3 flex items-center space-x-3 card-hover hidden lg:flex"
          >
            <div
              class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <div>
              <div class="text-white text-sm font-semibold">#1 Trending</div>
              <div class="text-gray-400 text-xs">This Week</div>
            </div>
          </div>

          <div
            class="absolute -top-4 -right-4 glass rounded-xl p-3 card-hover hidden lg:flex"
          >
            <div class="flex items-center space-x-2">
              <div class="flex -space-x-2">
                <div
                  class="w-7 h-7 rounded-full bg-pink-500 border-2 border-slate-900"
                ></div>
                <div
                  class="w-7 h-7 rounded-full bg-purple-500 border-2 border-slate-900"
                ></div>
                <div
                  class="w-7 h-7 rounded-full bg-indigo-500 border-2 border-slate-900"
                ></div>
              </div>
              <span class="text-gray-300 text-xs">+2.5K watching</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
