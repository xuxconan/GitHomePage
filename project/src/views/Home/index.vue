<script setup lang="ts">
import { useHomeStore } from "@/store";

const home = useHomeStore();
</script>

<template>
  <main class="home">
    <h1>{{ home.title }}</h1>
    <p>{{ home.subtitle }}</p>
  </main>
</template>

<style scoped lang="sass">
.home
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  min-height: 100vh
  gap: 0.5rem
</style>
