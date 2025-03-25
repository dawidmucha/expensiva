<script setup>
import { RouterLink } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated, user, isLoading } = useAuth0()
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="isAuthenticated">hello {{ user }}!</div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Log in</RouterLink>
    <RouterLink to="/signup">Sign up</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <RouterLink to="/shops">Shops</RouterLink>
    <RouterLink to="/categories">Categories</RouterLink>
    <RouterLink to="/statistics">Statistics</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
  </div>
</template>

<style scoped>
div {
  border: 1px solid black;
  background-color: rgba(255, 0, 0, 0.5);
  padding: 1rem;
  overflow: scroll;

  & > * {
    margin-right: 0.5rem;
  }
}
</style>
