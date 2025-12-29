<script setup>
const categories = [
  {
    name: "K-Drama",
    icon: "🇰🇷",
    count: "850+",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "C-Drama",
    icon: "🇨🇳",
    count: "720+",
    gradient: "from-red-500 to-orange-600",
  },
  {
    name: "Thai Drama",
    icon: "🇹🇭",
    count: "380+",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    name: "J-Drama",
    icon: "🇯🇵",
    count: "290+",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    name: "Movies",
    icon: "🎬",
    count: "450+",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    name: "Reality",
    icon: "📺",
    count: "120+",
    gradient: "from-emerald-500 to-teal-600",
  },
];
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold text-white mb-1">Browse Categories</h2>
          <p class="text-gray-400 text-sm">
            Explore dramas from different countries
          </p>
        </div>
        <a
          href="#"
          class="text-pink-400 hover:text-pink-300 text-sm font-medium flex items-center gap-1 transition-colors"
        >
          View All
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
        </a>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="glass rounded-xl p-4 text-center cursor-pointer card-hover group"
        >
          <div
            :class="`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`"
          >
            <span class="text-2xl">{{ category.icon }}</span>
          </div>
          <h3 class="text-white font-semibold text-sm mb-1">
            {{ category.name }}
          </h3>
          <p class="text-gray-400 text-xs">{{ category.count }} titles</p>
        </div>
      </div>
    </div>
  </section>
</template>
