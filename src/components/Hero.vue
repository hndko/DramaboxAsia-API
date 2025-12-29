<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTrending } from "../composables/useDrama";

const router = useRouter();
const { data: trendingDramas, fetch } = useTrending();
const featuredDrama = ref(null);

onMounted(async () => {
  await fetch();
  if (trendingDramas.value.length > 0) {
    featuredDrama.value = trendingDramas.value[0];
  }
});

function goToWatch() {
  if (featuredDrama.value) {
    router.push({
      name: "Watch",
      params: { bookId: featuredDrama.value.bookId, episode: 1 },
    });
  }
}

function goToDetail() {
  if (featuredDrama.value) {
    router.push({
      name: "Detail",
      params: { bookId: featuredDrama.value.bookId },
    });
  }
}
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
            <span class="text-pink-300 text-sm font-medium">Streaming Now</span>
          </div>

          <h1 class="text-4xl sm:text-5xl font-bold leading-tight">
            <span class="text-white">Discover Asian</span>
            <br />
            <span class="gradient-text">Drama Magic</span>
          </h1>

          <p class="text-gray-400 text-base leading-relaxed max-w-lg">
            Stream the latest K-Dramas, C-Dramas, Thai dramas, and more.
            Experience captivating stories with HD quality.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <router-link
              to="/trending"
              class="btn-primary px-8 py-3 rounded-full text-white font-semibold flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Watch Now</span>
            </router-link>
            <router-link
              to="/search"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search Drama</span>
            </router-link>
          </div>
        </div>

        <!-- Hero Featured Drama Card -->
        <div
          class="relative lg:h-[450px] fade-in-up"
          style="animation-delay: 0.2s"
        >
          <div class="glass rounded-2xl p-4 card-hover" @click="goToDetail">
            <div
              class="relative aspect-3/4 rounded-xl overflow-hidden cursor-pointer"
            >
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
                  @click.stop="goToWatch"
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
                <div
                  v-if="featuredDrama?.rank"
                  class="flex items-center gap-2 mt-3"
                >
                  <span
                    class="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    #{{ featuredDrama.rank }} Trending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
