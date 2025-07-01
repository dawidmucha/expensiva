<script setup>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { user } = useAuth0()
const router = useRouter()

const addReceipt = () => {
  axios
    .post('http://localhost:8081/receipt', {
      userId: user.value.sub,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
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
    <button @click="addReceipt">add receipt</button>
  </div>
</template>

<style scoped>
#dashboardView {
  flex-grow: 1;
}
</style>
