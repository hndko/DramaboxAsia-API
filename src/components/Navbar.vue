<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Drama", href: "#drama" },
  { name: "Movies", href: "#movies" },
  { name: "K-Drama", href: "#kdrama" },
  { name: "C-Drama", href: "#cdrama" },
];
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
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
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm font-medium"
          >
            {{ link.name }}
          </a>
        </div>

        <!-- Search & Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search dramas..."
              class="bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 w-48 transition-all duration-300 focus:w-56"
            />
            <svg
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
          </div>
          <button
            class="btn-primary px-4 py-2 rounded-full text-sm font-semibold text-white"
          >
            Sign In
          </button>
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
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="text-gray-300 hover:text-pink-400 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
          >
            {{ link.name }}
          </a>
          <button
            class="btn-primary mx-4 mt-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
