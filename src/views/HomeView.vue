<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

import NavBar from '@/components/NavBar.vue'

const { user } = useAuth0()

const router = useRouter()

onMounted(() => {
  if (user.value != undefined) {
    router.push('/dashboard')
  }
})
</script>

<template>
  <div>
    <div id="homeViewContainer">
      <NavBar />
      <div id="homeView">home view</div>
    </div>
  </div>
</template>

<style scoped>
#homeViewContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#homeView {
  flex-grow: 1;
  background-color: yellow;
}
</style>
