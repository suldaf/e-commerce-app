import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    carts: [],
    totalPrice: 0,
    recentCart: []
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setTotalPrice (state, payload) {
      state.totalPrice = payload
    },
    setRecent (state, payload) {
      state.recentCart = payload
    }
  },
  actions: {
    login (context, payload) {
      const { email, password } = payload
      return axios({
        url: 'login',
        method: 'POST',
        data: {
          email, password
        }
      }).then(({ data }) => {
        localStorage.token = data.token
        context.commit('setLogin', true)
      })
    },
    regis (context, payload) {
      const { email, password } = payload
      return axios({
        url: 'register',
        method: 'POST',
        data: {
          email, password
        }
      }).then(({ data }) => {
        context.dispatch('login', { email, password })
      })
    },
    logout (context) {
      localStorage.clear()
      context.commit('setLogin', false)
    },
    fetchProduct (context) {
      axios({
        url: 'products',
        method: 'GET'
      }).then(({ data }) => {
        context.commit('setProducts', data)
      }).catch(err => {
        console.log(err)
      })
    },
    addCart (context, payload) {
      const ProductId = +payload
      axios({
        url: 'carts',
        method: 'POST',
        data: {
          ProductId
        },
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        console.log(data)
        context.dispatch('fetchCart')
      }).catch(err => {
        console.log(err)
      })
    },
    fetchCart (context) {
      axios({
        url: 'carts',
        method: 'GET',
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        let total = 0
        data.forEach(el => {
          total += el.quantity * el.price
        })
        console.log(data)
        context.commit('setTotalPrice', total)
        context.commit('setCarts', data)
      }).catch(err => {
        console.log(err)
      })
    },
    changeQty (context, payload) {
      const { status, id, productId } = payload
      axios({
        url: 'carts/' + id,
        method: 'PATCH',
        headers: {
          token: localStorage.token
        },
        data: {
          status,
          productId
        }
      }).then(() => {
        context.dispatch('fetchCart')
      }).catch(err => {
        console.log(err)
      })
    },
    removeCart (context, id) {
      axios({
        url: 'carts/' + id,
        method: 'DELETE',
        headers: {
          token: localStorage.token
        }
      }).then(() => {
        context.dispatch('fetchCart')
      }).catch(err => {
        console.log(err)
      })
    },
    checkout (context) {
      axios({
        url: 'carts',
        method: 'PUT',
        headers: {
          token: localStorage.token
        }
      }).then(() => {
        context.dispatch('fetchCart')
      }).catch(err => {
        console.log(err)
      })
    },
    fetchRecentCart (context) {
      axios({
        url: 'carts/history',
        method: 'GET',
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        context.commit('setRecent', data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
