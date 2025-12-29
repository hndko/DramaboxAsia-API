<script setup>
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import CategorySection from "./components/CategorySection.vue";
import TrendingSection from "./components/TrendingSection.vue";
import LatestSection from "./components/LatestSection.vue";
import FeaturedDrama from "./components/FeaturedDrama.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white"
  >
    <Navbar />
    <Hero />
    <CategorySection />
    <section id="trending">
      <TrendingSection />
    </section>
    <FeaturedDrama />
    <section id="latest">
      <LatestSection />
    </section>
    <Footer />
  </div>
</template>

<style scoped></style>
