<script setup>
import SideBar from '@/components/SideBar.vue'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { user } = useAuth0()

const router = useRouter()

onMounted(() => {
  if (user.value == undefined) router.push('/login')
})
</script>

<template>
  <SideBar />
  <div id="dashboardView">dashboard view</div>
</template>

<style scoped>
#dashboardView {
  flex-grow: 1;
}
</style>
