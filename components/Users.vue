<template>
  <div class="users">
    <Loader v-if="loading"/>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Name</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody v-if="users && users.length > 0">
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.ID }}</td>
          <td>{{ user.emails[0].email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.created }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="users && users.length > 0" class="load-more">
      <div>{{ users.length }} out of {{ totalItems }}</div>
      <button v-if="totalPages !== page" @click="loadMore">load more</button>
    </div>
  </div>
</template>

<script>
const PAGE_SIZE = 3
export default {
  data () {
    return {
      loading: false,
      users: null,
      page: null,
      totalPages: null,
      totalItems: null
    }
  },
  computed: {
    reqHeaders () {
      return {
        Authorization: `Bearer ${window.localStorage.getItem('cboSessionToken')}`
      }
    }
  },
  mounted () {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers () {
      this.loading = true
      try {
        const { httpStatusCode, data } = await this.$axios.$get(`${process.env.apiUrl}/users?pageSize=${PAGE_SIZE}`, { headers: this.reqHeaders })
        this.loading = false
        if (httpStatusCode === 200) {
          this.users = data.users
          this.page = data.paging.page
          this.totalItems = data.paging.totalItems
          this.totalPages = data.paging.totalPages
        }
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    async loadMore () {
      this.loading = true
      try {
        const { httpStatusCode, data } = await this.$axios.$get(`${process.env.apiUrl}/users?pageSize=${PAGE_SIZE}&page=${this.page + 1}`, { headers: this.reqHeaders })
        this.loading = false
        if (httpStatusCode === 200) {
          this.users = [
            ...this.users,
            ...data.users
          ]
          this.page = data.paging.page
          this.totalItems = data.paging.totalItems
          this.totalPages = data.paging.totalPages
        }
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="css" scoped>
.users {
  margin-top: 15px;
}
table {
  width: 100%;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 5px;
}
.load-more {
  text-align: center;
  margin: 15px 0;
}
</style>
