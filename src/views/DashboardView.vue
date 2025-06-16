<script setup>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { user, isAuthenticated, isLoading } = useAuth0()

const router = useRouter()

const getUser = async (id) => {
  await axios({
    method: 'get',
    url: `http://localhost:8081/user?id=${id}`,
  }).then((res) => {
    return res.results
  })
}

onMounted(async () => {
  if (user == undefined) return router.push('/')
})
</script>

<template>
  <SideBar />
  <div id="dashboardView">
    <div>dashboard view</div>
    <div></div>
  </div>
</template>

<style scoped>
#dashboardView {
  flex-grow: 1;
}
</style>
