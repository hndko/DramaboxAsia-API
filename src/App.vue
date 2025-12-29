<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white"
  >
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
