<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
const { loginWithRedirect, user, isAuthenticated } = useAuth0()

const router = useRouter()

onMounted(() => {
  if (user.value != undefined) router.push('/dashboard')
})

const login = () => {
  loginWithRedirect({
    authorizationParams: {
      redirect_uri: 'http://localhost:5173/dashboard',
    },
  })
}
</script>

<template>
  <div>
    <div id="main">
      <div id="logo">
        <img src="@/assets/expensiva_logo.svg" />
      </div>
      <div id="content">
        <div id="modal" class="modal">
          <h1>Welcome back!</h1>
          <button @click="login">Log in</button>
          <pre v-if="isAuthenticated">
            <code>{{ user }}</code>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 8rem 1fr;
}

#logo {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90%;
    max-width: 15rem;
  }
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#modal {
  width: 95%;
  max-width: 30rem;
}
</style>
