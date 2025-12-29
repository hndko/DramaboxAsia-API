<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSearch } from "../composables/useDrama";

const router = useRouter();
const isMenuOpen = ref(false);
const showSearchResults = ref(false);

const { results, query, loading, totalResults, debouncedSearch, clearSearch } =
  useSearch();

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Trending", to: "/trending" },
  { name: "Latest", to: "/latest" },
  { name: "Search", to: "/search" },
];

function handleSearchInput(event) {
  const value = event.target.value;
  debouncedSearch(value);
  showSearchResults.value = value.length > 0;
}

function handleSearchFocus() {
  if (query.value.length > 0) {
    showSearchResults.value = true;
  }
}

function handleClickOutside() {
  showSearchResults.value = false;
}

function goToSearch() {
  showSearchResults.value = false;
  router.push({ name: "Search", query: { q: query.value } });
}

function goToDetail(bookId) {
  showSearchResults.value = false;
  clearSearch();
  router.push({ name: "Detail", params: { bookId } });
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div
            class="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center pulse-glow"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4v16h16V4H4zm14 14H6V6h12v12zm-8-2l6-4-6-4v8z" />
            </svg>
          </div>
          <span class="text-xl font-bold gradient-text">DramaBox</span>
          <span
            class="text-xs text-pink-400 font-medium bg-pink-500/20 px-2 py-0.5 rounded-full"
            >ASIA</span
          >
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm font-medium"
            active-class="text-pink-400"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- Search & Actions -->
        <div class="hidden md:flex items-center space-x-4 relative">
          <div class="relative">
            <input
              type="text"
              placeholder="Search dramas..."
              :value="query"
              @input="handleSearchInput"
              @focus="handleSearchFocus"
              @keydown.enter="goToSearch"
              class="bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 w-48 transition-all duration-300 focus:w-64"
            />
            <svg
              v-if="!loading"
              class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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
            <svg
              v-else
              class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 animate-spin"
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

            <!-- Search Results Dropdown -->
            <div
              v-if="showSearchResults && query.length > 0"
              class="absolute top-full left-0 mt-2 glass rounded-xl overflow-hidden shadow-2xl max-h-96 overflow-y-auto w-80"
            >
              <div v-if="loading" class="p-4 text-center">
                <p class="text-gray-400 text-sm">Searching...</p>
              </div>

              <div v-else-if="results.length === 0" class="p-4 text-center">
                <p class="text-gray-400 text-sm">No results found</p>
              </div>

              <div v-else>
                <div class="p-2 border-b border-white/10">
                  <p class="text-gray-400 text-xs">
                    {{ totalResults }} results
                  </p>
                </div>
                <div
                  v-for="drama in results.slice(0, 6)"
                  :key="drama.bookId"
                  class="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition-colors"
                  @click="goToDetail(drama.bookId)"
                >
                  <img
                    :src="drama.cover"
                    :alt="drama.judul"
                    class="w-10 h-14 object-cover rounded"
                    loading="lazy"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="text-white text-sm font-medium truncate">
                      {{ drama.judul }}
                    </h4>
                    <p class="text-gray-400 text-xs">
                      {{ drama.total_episode }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="results.length > 6"
                  class="p-3 border-t border-white/10 text-center"
                >
                  <button
                    @click="goToSearch"
                    class="text-pink-400 text-sm hover:text-pink-300"
                  >
                    View all {{ totalResults }} results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-gray-300 hover:text-white"
        >
          <svg
            v-if="!isMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMenuOpen" class="md:hidden pb-4">
        <div class="flex flex-col space-y-2">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="text-gray-300 hover:text-pink-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
            @click="isMenuOpen = false"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <!-- Click outside overlay -->
  <div
    v-if="showSearchResults"
    class="fixed inset-0 z-40"
    @click="handleClickOutside"
  ></div>
</template>
