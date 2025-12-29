<script setup>
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDramaDetail } from "../composables/useDrama";

const props = defineProps({
  bookId: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const { drama, loading, error, fetch } = useDramaDetail();

onMounted(() => {
  fetch(props.bookId);
});

watch(
  () => props.bookId,
  (newId) => {
    fetch(newId);
  }
);

function goToWatch(episodeIndex) {
  router.push({
    name: "Watch",
    params: {
      bookId: props.bookId,
      episode: episodeIndex + 1,
    },
  });
}
</script>

<template>
  <div class="pt-20 pb-16">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="animate-pulse">
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="aspect-2/3 bg-white/10 rounded-xl"></div>
          <div class="lg:col-span-2 space-y-4">
            <div class="h-8 bg-white/10 rounded w-3/4"></div>
            <div class="h-4 bg-white/10 rounded w-1/2"></div>
            <div class="h-32 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20"
    >
      <div
        class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <svg
          class="w-10 h-10 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-white mb-2">
        Failed to Load Drama
      </h3>
      <p class="text-gray-400 mb-4">{{ error }}</p>
      <button
        @click="fetch(props.bookId)"
        class="btn-primary px-6 py-2 rounded-full text-white"
      >
        Try Again
      </button>
    </div>

    <!-- Content -->
    <div v-else-if="drama" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Banner -->
      <div class="relative rounded-2xl overflow-hidden mb-8">
        <div class="absolute inset-0">
          <img
            :src="drama.cover"
            :alt="drama.judul"
            class="w-full h-full object-cover blur-2xl opacity-30"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
          ></div>
        </div>

        <div class="relative grid lg:grid-cols-3 gap-8 p-6 lg:p-10">
          <!-- Cover -->
          <div class="mx-auto lg:mx-0">
            <div
              class="relative w-48 lg:w-full max-w-xs rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                :src="drama.cover"
                :alt="drama.judul"
                class="w-full aspect-2/3 object-cover"
              />
            </div>
          </div>

          <!-- Info -->
          <div
            class="lg:col-span-2 flex flex-col justify-center text-center lg:text-left"
          >
            <h1 class="text-3xl lg:text-4xl font-bold text-white mb-3">
              {{ drama.judul }}
            </h1>

            <div
              class="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4 text-sm"
            >
              <span class="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full">
                {{ drama.total_episode }}
              </span>
              <span class="flex items-center gap-1 text-yellow-400">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                {{ drama.likes }}
              </span>
            </div>

            <p class="text-gray-300 leading-relaxed mb-6">
              {{ drama.deskripsi }}
            </p>

            <div class="flex flex-wrap justify-center lg:justify-start gap-3">
              <button
                @click="goToWatch(0)"
                class="btn-primary px-8 py-3 rounded-full text-white font-semibold flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Episode 1
              </button>
              <button
                class="glass px-6 py-3 rounded-full text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
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

      <!-- Episodes -->
      <div class="glass rounded-2xl p-6">
        <h2 class="text-xl font-bold text-white mb-4">
          Episodes ({{ drama.jumlah_episode_tersedia }})
        </h2>

        <div
          class="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2"
        >
          <button
            v-for="episode in drama.episodes"
            :key="episode.episode_index"
            @click="goToWatch(episode.episode_index)"
            class="aspect-square rounded-lg bg-white/10 hover:bg-pink-500 text-white font-medium text-sm transition-colors flex items-center justify-center"
          >
            {{ episode.episode_label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
