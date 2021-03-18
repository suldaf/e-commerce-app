<template>
  <div id="app" class="container">
    <div id="nav" v-if="isLogin">
      <router-link class="btn btn-secondary" to="/" >Home</router-link> <router-link class="btn btn-secondary" to="/dashboard">Dashboard</router-link> <button class="btn btn-secondary" @click.prevent="logout" >Logout</button>
    </div>
    <div class="navv" v-if="!isLogin">
      <router-link class="btn btn-secondary" to="/login" >Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/login').catch(() => console.log('MASUK DUA KALI BOSS'))
    } else {
      this.$store.commit('setLogin', true)
      this.$router.push('/').catch(() => console.log('MASUK DUA KALI BOSS'))
    }
  }
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: steelblue;
}

div.navv {
  padding: 30px;
}

.navv a {
  font-weight: bold;
  color: white;
}

.navv a.router-link-exact-active {
  color: steelblue;
}

button {
  font-weight: bold;
  color: white;
}

</style>
