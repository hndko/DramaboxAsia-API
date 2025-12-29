<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useWatchlist } from "../composables/useWatchlist";

const props = defineProps({
  drama: {
    type: Object,
    required: true,
  },
  showRank: {
    type: Boolean,
    default: false,
  },
  showNewBadge: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const { isInList, toggleList } = useWatchlist();

const inList = computed(() => isInList(props.drama.bookId));

function goToDetail() {
  router.push({
    name: "Detail",
    params: { bookId: props.drama.bookId },
  });
}

function handleToggleList(event) {
  event.stopPropagation();
  toggleList(props.drama);
}
</script>

<template>
  <div @click="goToDetail" class="group cursor-pointer">
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

        <!-- Add to List Button (Heart) -->
        <button
          @click="handleToggleList"
          class="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10"
          :class="
            inList
              ? 'bg-pink-500 text-white'
              : 'bg-black/50 backdrop-blur text-white hover:bg-pink-500'
          "
        >
          <svg
            class="w-4 h-4"
            :fill="inList ? 'currentColor' : 'none'"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <!-- Rank Badge -->
        <div
          v-if="showRank && drama.rank"
          class="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded"
        >
          #{{ drama.rank }}
        </div>

        <!-- NEW Badge -->
        <div
          v-if="showNewBadge && !drama.rank"
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
</template>
