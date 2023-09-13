<template>
  <button @click="onLogout">logout</button>
</template>

<script>
export default {
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
      if (localStorage.getItem('cboSessionToken')) {
        window.localStorage.removeItem('cboSessionToken')
      }
    }
  }
}
</script>
