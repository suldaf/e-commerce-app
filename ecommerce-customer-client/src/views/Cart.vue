<template>
  <div>
    <div class="row">
      <div class="col-8">
        <CartList :carts="carts"/>
        <img src="https://images.thefepi.com/file/empty-cart.png" alt="" width="100%" height="100%" v-show="!total">
      </div>
      <div class="col-4">
        <div class="card" v-show="total">
          <div class="card-body">
            <h1>Total Price</h1>
            <h1>Rp.{{total}}</h1>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline-success" v-show="total" @click.prevent="checkout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from '@/components/CartList.vue'
export default {
  name: 'Cart',
  components: {
    CartList
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    total () {
      return this.$store.state.totalPrice
    }
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
    if (!localStorage.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
div.card {
  margin: 80px 10px 10px 10px;
  border: 2.5px solid #53D8FB;
  background-color: #7CC6FE;
}
div.card-footer {
  background: none;
}
</style>
