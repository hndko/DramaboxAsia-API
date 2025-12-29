<script setup>
import { useRouter } from "vue-router";

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

function goToDetail() {
  router.push({
    name: "Detail",
    params: { bookId: props.drama.bookId },
  });
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

        <!-- Rank Badge -->
        <div
          v-if="showRank && drama.rank"
          class="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded"
        >
          #{{ drama.rank }}
        </div>

        <!-- NEW Badge -->
        <div
          v-if="showNewBadge"
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
