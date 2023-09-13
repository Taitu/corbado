<template>
  <div class="user">
    <div>email: <strong>{{  user.name }}</strong></div>
    <div>id: <strong>{{  user.ID }}</strong></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>
