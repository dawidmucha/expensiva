import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useAuthIdStore = defineStore('auth-id', () => {
  const authId = ref(null)

  const getAuthId = computed(() => authId)

  function setAuthId(id) {
    authId.value = id
  }

  return { authId, getAuthId, setAuthId }
})
