import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'
import Swal from 'sweetalert2'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    product: {}
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setProduct (state, payload) {
      state.product = payload
    },
    addProduct (state, payload) {
      state.products.push(payload)
    }
  },
  actions: {
    login (context, payload) {
      const { email, password } = payload
      axios({
        url: '/login',
        method: 'POST',
        data: {
          email,
          password
        }
      }).then(({ data }) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success Login',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(data)
        localStorage.token = data.token
        context.commit('setLogin', true)
      }).catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Invalid email or password',
          showConfirmButton: false,
          timer: 1500
        })
        // alert(err)
        console.log(err)
      })
    },
    logout (context) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Success Logout',
        showConfirmButton: false,
        timer: 1500
      })
      context.commit('setLogin', false)
      localStorage.clear()
    },
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        // console.log(data)
        context.commit('setProducts', data)
      }).catch((err) => {
        console.log(err)
      })
    },
    removeProduct (context, payload) {
      // console.log('MASUKK SININ WOOOyY')
      axios({
        url: '/products/' + payload,
        method: 'DELETE',
        headers: {
          token: localStorage.token
        }
      }).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success Deleted a Product',
          showConfirmButton: false,
          timer: 1500
        })
        return context.dispatch('fetchProducts')
      }).catch(() => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Not have an access',
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    formEdit (context, payload) {
      axios({
        url: '/products/' + payload,
        method: 'GET',
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        // console.log(data)
        context.commit('setProduct', data)
      }).catch(err => {
        console.log(err)
      })
    },
    updateProduct (context, payload) {
      // console.log(payload.name)
      axios({
        url: '/products/' + payload.id,
        method: 'PUT',
        headers: {
          token: localStorage.token
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        }
      }).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success Updated a Product',
          showConfirmButton: false,
          timer: 1500
        })
        return context.dispatch('fetchProducts')
      }).catch(err => {
        console.log(err)
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'There are Field has Still Empty, please filled!',
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    addProduct (context, payload) {
      axios({
        url: '/products',
        method: 'POST',
        headers: {
          token: localStorage.token
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: +payload.price,
          stock: +payload.stock
        }
      }).then(({ data }) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success Added a Product',
          showConfirmButton: false,
          timer: 1500
        })
        context.commit('addProduct', data.product)
      }).catch(({ response }) => {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'There are Fields that are Not Yet Suitable, please adjust!',
          showConfirmButton: false,
          timer: 2000
        })
        console.log(response.data)
      })
    }
  },
  modules: {
  }
})
