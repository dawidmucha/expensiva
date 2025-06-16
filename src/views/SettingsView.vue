<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

import SideBar from '@/components/SideBar.vue'

const { user } = useAuth0()
const router = useRouter()
const { logout } = useAuth0()

onMounted(() => {
  if (user.value == undefined) router.push('/')
})
</script>

<template>
  <SideBar />
  <div>settings view</div>
  <button @click="logout({ logoutParams: { returnTo: window?.location.origin } })">Log out</button>
</template>
