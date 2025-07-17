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
  axios
    .post('http://localhost:8081/receipt', {
      userId: user.value.sub,
    })
    .then((res) => {
      console.log(res)
      getReceipts()
    })
    .catch((err) => {
      console.log(err)
    })
}

const getReceipts = () => {
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

const removeReceipt = (receiptId) => {
  axios
    .delete('http://localhost:8081/receipt', {
      data: {
        userId: user.value.sub,
        receiptId,
      },
    })
    .then((res) => {
      console.log('remove', res.data.results)
      getReceipts()
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
    <table>
      <tr v-for="receipt in receipts" :key="receipt.id">
        <td :style="{ border: '1px solid black' }">
          <div>
            {{ receipt.id }} ({{ receipt.date }}) @ {{ receipt.created_at }}
            <button @click="removeReceipt(receipt.id)">X</button>
          </div>
        </td>
      </tr>
    </table>
    <button @click="addReceipt">add receipt</button>
    <button @click="getReceipts">get receipt</button>
  </div>
</template>

<style scoped>
#dashboardView {
  flex-grow: 1;
}
</style>
