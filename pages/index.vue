<template>
  <div class="profile">
    <User v-if="user" />
    <Logout />
    <div v-if="!user">
      <nuxt-link to="/login">login</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import User from '~/components/User'
import Logout from '~/components/Logout'
export default {
  middleware: 'authenticated',
  components: {
    User,
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
