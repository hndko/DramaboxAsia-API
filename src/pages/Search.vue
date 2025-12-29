<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearch } from "../composables/useDrama";
import DramaCard from "../components/DramaCard.vue";

const route = useRoute();
const router = useRouter();
const searchInput = ref("");

const { results, query, loading, totalResults, search } = useSearch();

// Initialize from URL query
onMounted(() => {
  if (route.query.q) {
    searchInput.value = route.query.q;
    search(route.query.q);
  }
});

// Watch for route query changes
watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery && newQuery !== query.value) {
      searchInput.value = newQuery;
      search(newQuery);
    }
  }
);

function handleSearch() {
  if (searchInput.value.trim()) {
    router.push({ query: { q: searchInput.value.trim() } });
    search(searchInput.value.trim());
  }
}

function handleKeydown(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
}
</script>

<template>
  <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div
            class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white">Search Dramas</h1>
            <p class="text-gray-400">Find your favorite Asian dramas</p>
          </div>
        </div>

        <!-- Search Input -->
        <div class="relative max-w-xl">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search by title..."
            @keydown="handleKeydown"
            class="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 text-lg"
          />
          <svg
            class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
          <button
            @click="handleSearch"
            class="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-4 py-2 rounded-lg text-white font-medium"
          >
            Search
          </button>
        </div>
      </div>

      <!-- Results Info -->
      <div v-if="query && !loading" class="mb-6">
        <p class="text-gray-400">
          <span v-if="totalResults > 0"
            >Found
            <span class="text-white font-semibold">{{ totalResults }}</span>
            results for "</span
          >
          <span v-else>No results for "</span>
          <span class="text-pink-400">{{ query }}</span
          >"
        </p>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <div v-for="n in 10" :key="n" class="animate-pulse">
          <div class="aspect-2/3 rounded-xl bg-white/10"></div>
          <div class="mt-2 h-4 bg-white/10 rounded w-3/4"></div>
          <div class="mt-1 h-3 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Results Grid -->
      <div
        v-else-if="results.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <DramaCard
          v-for="drama in results"
          :key="drama.bookId"
          :drama="drama"
        />
      </div>

      <!-- Empty/Initial State -->
      <div v-else class="text-center py-20">
        <div
          class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-10 h-10 text-gray-500"
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
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">
          {{ query ? "No Results Found" : "Start Searching" }}
        </h3>
        <p class="text-gray-400">
          {{
            query ? "Try different keywords" : "Enter a drama title to search"
          }}
        </p>
      </div>
    </div>
  </div>
</template>
