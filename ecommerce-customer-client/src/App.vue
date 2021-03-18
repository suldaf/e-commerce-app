<template>
  <div id="app">
    <div class="navv row" >
      <div class="col-4 md-3">
        <img src="https://image.flaticon.com/icons/png/512/123/123403.png" alt="Home" width="45px" class="nav" @click.prevent="toHome" @mouseover.prevent="toHome">
      </div>
      <div class="col-4">
        <a href="" v-if="isLogin" @click.prevent="toCart" ><img src="https://icon-library.com/images/cart-icon-png-white/cart-icon-png-white-19.jpg" alt="Cart" width="10%"></a> <a href="" v-if="isLogin" @click.prevent="toHistory" ><img src="https://static.thenounproject.com/png/3201871-200.png" alt="Cart" width="7%"></a>
      </div>
      <div class="col-4">
        <a v-if="isLogin" class="btn btn-secondary" @click.prevent="logout" >Logout</a>{{ }}
        <router-link class="btn btn-secondary" to="/login" v-if="!isLogin" >Login</router-link>
      </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    toHome () {
      this.$router.push('/').catch(() => console.log('Masuk Dua Kali'))
    },
    logout () {
      this.$store.dispatch('logout').then(() => this.$router.push('/login'))
    },
    toCart () {
      this.$router.push('/cart').catch(() => console.log('Masuk Dua Kali'))
    },
    toHistory () {
      this.$router.push('/history').catch(() => console.log('Masuk Dua Kali'))
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('setLogin', true)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

div.navv {
  padding: 6px;
  background-color: grey;
  margin-bottom: 20px;
  position: fixed;
  width: 115%;
  z-index: 10;
}

.navv a {
  font-weight: bold;
  color: white;
  margin-right: 5px;
}

.navv a.router-link-exact-active {
  color: #8CFF98
}
</style>
