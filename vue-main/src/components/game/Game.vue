<script setup>
import PhaserContainer from '@/components/game/PhaserContainer.vue'
</script>

<template>
  <Suspense>
    <PhaserContainer />

    <template #fallback>
      <div class="placeholder">
        Downloading ...
      </div>
    </template>
  </Suspense>
</template>

<style scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
