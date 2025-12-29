<script setup>
const footerLinks = {
  explore: [
    { name: "Trending", to: "/trending" },
    { name: "Latest", to: "/latest" },
    { name: "Search", to: "/search" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
  ],
};
</script>

<template>
  <footer class="glass border-t border-white/10 mt-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-2">
          <router-link to="/" class="flex items-center space-x-2 mb-4">
            <div
              class="w-9 h-9 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4v16h16V4H4zm14 14H6V6h12v12zm-8-2l6-4-6-4v8z" />
              </svg>
            </div>
            <span class="text-lg font-bold gradient-text">DramaBox</span>
          </router-link>
          <p class="text-gray-400 text-sm mb-4 leading-relaxed">
            Your ultimate destination for Asian dramas. Stream the latest dramas
            in HD quality.
          </p>
        </div>

        <!-- Explore Links -->
        <div>
          <h4 class="text-white font-semibold text-sm mb-4">Explore</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.explore" :key="link.name">
              <router-link
                :to="link.to"
                class="text-gray-400 hover:text-pink-400 text-sm transition-colors"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h4 class="text-white font-semibold text-sm mb-4">Support</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.support" :key="link.name">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-pink-400 text-sm transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 mt-8 pt-6 text-center">
        <p class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} DramaBox Asia. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
