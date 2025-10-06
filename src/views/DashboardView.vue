<script setup>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { user } = useAuth0()
const router = useRouter()

const receipts = ref([])
const selectedReceipt = ref(null)

const userShops = ref([])

const addReceipt = () => {
  axios
    .post('http://localhost:8081/receipt', {
      userId: user.value.sub,
    })
    .then((res) => {
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
      getReceipts()
    })
    .catch((err) => {
      console.log(err)
    })
}

const getUserShops = () => {
  axios
    .put('http://localhost:8081/shops', {
      userId: user.value.sub,
    })
    .then((res) => {
      userShops.value = res.data.results[0]
    })
    .catch((err) => {
      console.log(err)
    })
}

const selectReceipt = (receiptId) => {
  getUserShops()
  selectedReceipt.value = receiptId
}

const onReceiptEditSave = (e, receiptId) => {
  axios
    .patch('http://localhost:8081/receipt', {
      receiptId,
      shopId: e.target[0].value,
      date: e.target[1].value,
    })
    .then((res) => {
      selectedReceipt.value = null
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
    <h3>receipts: (selected {{ selectedReceipt }})</h3>

    <table>
      <tr v-for="receipt in receipts" :key="receipt.id">
        <td v-if="receipt.id === selectedReceipt" :style="{ border: '1px solid black' }">
          <form v-on:submit.prevent="(e) => onReceiptEditSave(e, receipt.id)">
            <label for="shop">shop:</label>
            <select name="shop" id="shop">
              <option v-for="userShop in userShops" :key="userShop.id" :value="userShop.shop_id">
                {{ userShop.name }}
              </option>
            </select>

            <label for="date">date:</label>
            <input type="date" id="date" name="date" />

            <input type="submit" value="save" />
          </form>
        </td>
        <td v-else :style="{ border: '1px solid black' }">
          <div>
            {{ receipt.id }} ({{ receipt.date }}) | {{ receipt.shop_id }}
            <button @click="removeReceipt(receipt.id)">X</button>
            <button @click="selectReceipt(receipt.id)">edit</button>
          </div>
        </td>
      </tr>
    </table>

    <button @click="addReceipt">add receipt</button>
    <button @click="getReceipts">get receipt</button>
    <button @click="getUserShops">get shops</button>
  </div>
</template>

<style scoped>
#dashboardView {
  flex-grow: 1;
}
</style>
