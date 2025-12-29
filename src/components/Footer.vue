<script setup>
const footerLinks = {
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookie Settings", href: "#" },
  ],
  explore: [
    { name: "K-Drama", href: "#" },
    { name: "C-Drama", href: "#" },
    { name: "Thai Drama", href: "#" },
    { name: "Movies", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "Twitter",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    name: "YouTube",
    icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];
</script>

<template>
  <footer class="glass border-t border-white/10 mt-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
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
          </div>
          <p class="text-gray-400 text-sm mb-4 leading-relaxed">
            Your ultimate destination for Asian dramas. Stream K-Drama, C-Drama,
            Thai drama, and more in HD quality.
          </p>

          <!-- Social Links -->
          <div class="flex space-x-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              href="#"
              class="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors group"
            >
              <svg
                class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path :d="social.icon" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white font-semibold text-sm mb-4">Company</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.company" :key="link.name">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-pink-400 text-sm transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

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

        <div>
          <h4 class="text-white font-semibold text-sm mb-4">Explore</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.explore" :key="link.name">
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
      <div
        class="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-gray-500 text-sm">
          © 2024 DramaBox Asia. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <span class="text-gray-500 text-xs">Available on:</span>
          <div class="flex gap-2">
            <div class="glass px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                />
              </svg>
              <span class="text-gray-400 text-xs">iOS</span>
            </div>
            <div class="glass px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.523 15.34l-.022-.02c-.41-.294-.77-.84-.77-1.37 0-.53.28-1.02.69-1.32l-.001-.001 1.59-1.11c.51-.361.83-.95.83-1.59 0-1.1-.89-2-1.99-2h-11.7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h11.7c1.1 0 1.99-.9 1.99-2 0-.64-.32-1.23-.85-1.59l-1.47-1z"
                />
              </svg>
              <span class="text-gray-400 text-xs">Android</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
