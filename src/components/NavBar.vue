<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()

const onLogin = () => {
  loginWithRedirect({
    appState: {
      target: '/auth',
    },
  })
}
</script>

<template>
  <div>
    <button @click="onLogin">Log In</button>
  </div>
</template>

<style scoped>
div {
  text-align: right;
  height: 3rem;
  width: 100%;
  background-color: red;
}
</style>
