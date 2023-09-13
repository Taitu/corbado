<template>
  <div class="container">
    <User v-if="user" />
    <Logout />
    <Users v-if="user" />
    <div v-if="!user">
      <nuxt-link to="/login">login</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import User from '~/components/User'
import Users from '~/components/Users'
import Logout from '~/components/Logout'
export default {
  middleware: 'authenticated',
  components: {
    User,
    Users,
    Logout
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
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

<style lang="css">
.container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}
</style>
