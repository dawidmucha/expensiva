<script setup>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { user } = useAuth0()
const router = useRouter()

const receipts = ref([])

const addReceipt = () => {
  console.log('addsub?', user.value.sub)
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

const getReceipts = () => {
  console.log('getsub?', user.value.sub)
  axios
    .put('http://localhost:8081/receipt', {
      userId: user.value.sub,
    })
    .then((res) => {
      console.log('ee', res.data.results)
      receipts.value = res.data.results
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(async () => {
  if (user == undefined) return router.push('/')

  getReceipts()
})
</script>

<template>
  <SideBar />
  <div id="dashboardView">
    <div>dashboard view</div>
    <h6>receipts:</h6>
    <div>{{ receipts }}</div>
    <button @click="addReceipt">add receipt</button>
    <button @click="getReceipts">get receipt</button>
  </div>
</template>

<style scoped>
#dashboardView {
  flex-grow: 1;
}
</style>
