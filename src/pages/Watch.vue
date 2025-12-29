<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStream, useDramaDetail } from "../composables/useDrama";

const props = defineProps({
  bookId: {
    type: String,
    required: true,
  },
  episode: {
    type: [String, Number],
    default: 1,
  },
});

const route = useRoute();
const router = useRouter();

const {
  streamData,
  loading: streamLoading,
  error: streamError,
  fetch: fetchStream,
} = useStream();
const { drama, loading: detailLoading, fetch: fetchDetail } = useDramaDetail();

const currentEpisode = computed(() => parseInt(props.episode) || 1);

onMounted(() => {
  fetchStream(props.bookId, currentEpisode.value);
  fetchDetail(props.bookId);
});

watch(
  () => [props.bookId, props.episode],
  ([newBookId, newEpisode]) => {
    fetchStream(newBookId, parseInt(newEpisode) || 1);
  }
);

function goToEpisode(episodeNum) {
  router.push({
    name: "Watch",
    params: {
      bookId: props.bookId,
      episode: episodeNum,
    },
  });
}

function prevEpisode() {
  if (currentEpisode.value > 1) {
    goToEpisode(currentEpisode.value - 1);
  }
}

function nextEpisode() {
  if (streamData.value && currentEpisode.value < streamData.value.allEps) {
    goToEpisode(currentEpisode.value + 1);
  }
}
</script>

<template>
  <div class="pt-20 pb-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Video Player -->
      <div class="relative rounded-2xl overflow-hidden bg-black mb-6">
        <!-- Loading -->
        <div
          v-if="streamLoading"
          class="aspect-video flex items-center justify-center"
        >
          <div class="text-center">
            <svg
              class="w-12 h-12 animate-spin text-pink-500 mx-auto mb-4"
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
            <p class="text-gray-400">Loading video...</p>
          </div>
        </div>

        <!-- Error -->
        <div
          v-else-if="streamError"
          class="aspect-video flex items-center justify-center"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-400"
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
            <h3 class="text-lg font-semibold text-white mb-2">
              Failed to Load Video
            </h3>
            <p class="text-gray-400 mb-4">{{ streamError }}</p>
            <button
              @click="fetchStream(props.bookId, currentEpisode)"
              class="btn-primary px-6 py-2 rounded-full text-white"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Video -->
        <video
          v-else-if="streamData?.chapter?.video"
          :src="streamData.chapter.video.mp4"
          :poster="streamData.chapter.cover"
          controls
          autoplay
          class="w-full aspect-video"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Episode Title & Navigation -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 class="text-xl font-bold text-white">
            {{ drama?.judul || "Loading..." }}
          </h1>
          <p class="text-gray-400">
            Episode {{ currentEpisode }} of {{ streamData?.allEps || "..." }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="prevEpisode"
            :disabled="currentEpisode <= 1"
            class="glass px-4 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </button>
          <button
            @click="nextEpisode"
            :disabled="!streamData || currentEpisode >= streamData.allEps"
            class="glass px-4 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            Next
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
          </button>
        </div>
      </div>

      <!-- Episode List -->
      <div class="glass rounded-2xl p-6">
        <h2 class="text-lg font-bold text-white mb-4">All Episodes</h2>

        <div
          v-if="detailLoading"
          class="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 gap-2"
        >
          <div
            v-for="n in 20"
            :key="n"
            class="aspect-square rounded-lg bg-white/10 animate-pulse"
          ></div>
        </div>

        <div
          v-else-if="drama?.episodes"
          class="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 gap-2"
        >
          <button
            v-for="episode in drama.episodes"
            :key="episode.episode_index"
            @click="goToEpisode(episode.episode_index + 1)"
            :class="[
              'aspect-square rounded-lg text-white font-medium text-xs transition-colors flex items-center justify-center',
              currentEpisode === episode.episode_index + 1
                ? 'bg-pink-500'
                : 'bg-white/10 hover:bg-pink-500/50',
            ]"
          >
            {{ episode.episode_label }}
          </button>
        </div>
      </div>

      <!-- Back to Detail -->
      <div class="mt-6 text-center">
        <router-link
          :to="{ name: 'Detail', params: { bookId: props.bookId } }"
          class="text-pink-400 hover:text-pink-300 font-medium inline-flex items-center gap-1"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Drama Details
        </router-link>
      </div>
    </div>
  </div>
</template>
