export default async function ({ store, $axios, redirect }) {
  if (typeof window !== 'undefined') {
    const session = new window.Corbado.Session(process.env.corbadoProjectId)

    if (window.localStorage.getItem('cboSessionToken')) {
      try {
        const headers = {
          Authorization: `Bearer ${window.localStorage.getItem('cboSessionToken')}`
        }
        const { data, httpStatusCode } = await $axios.$get('https://pro-2542215768619450009.frontendapi.corbado.io/v1/me', { headers })
        if (httpStatusCode === 200) {
          store.commit('SET_USER', { user: data, session })
        } else {
          store.commit('RESET')
          redirect('/')
        }
      } catch (error) {
        console.log(error)
        redirect('/')
      }
    } else {
      store.commit('RESET')
      redirect('/login')
    }
  }
}
