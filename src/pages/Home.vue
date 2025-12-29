<script setup>
import Hero from "../components/Hero.vue";
import TrendingSection from "../components/TrendingSection.vue";
import LatestSection from "../components/LatestSection.vue";
import FeaturedDrama from "../components/FeaturedDrama.vue";
</script>

<template>
  <div>
    <Hero />
    <TrendingSection :limit="6" />
    <FeaturedDrama />
    <LatestSection :limit="12" />
  </div>
</template>
