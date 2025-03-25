<script setup>
import { RouterView } from 'vue-router'
import DebugPanel from '@/components/DebugPanel.vue'
</script>

<template>
  <RouterView id="routerView" />
  <div id="debugPanel">
    <DebugPanel />
  </div>
</template>

<style scoped>
#routerView {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
}

#debugPanel {
  position: absolute;
  bottom: 4rem;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
