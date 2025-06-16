<script setup>
import axios from 'axios'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { user, isAuthenticated, isLoading } = useAuth0()
const router = useRouter()

const getUser = async (id) => {
  const user_ = await axios({
    method: 'get',
    url: `http://localhost:8081/user?id=${id}`,
  }).then((res) => {
    return res.data.results
  })
  return user_
}

const setUser = async (id) => {
  const user_ = await axios({
    method: 'post',
    url: `http://localhost:8081/user?id=${id}`,
  }).then((res) => {
    return res.data.results
  })
  return user_
}

onMounted(async () => {
  //after loading check if user already exists in database, if not; create one
  const interval = setInterval(async () => {
    if (!isLoading.value) {
      clearInterval(interval)
      const u = await getUser(user.value.sub)
      console.log(u)
      if (u.length === 0) await setUser(user.value.sub)
      router.push('/dashboard')
    }
  }, 100)
})
</script>

<template>
  <div>
    <h1>authenticating...</h1>
    <h2>isLoading? {{ isLoading }}</h2>
    <h2>isAuthenticated? {{ isAuthenticated }}</h2>
  </div>
</template>
