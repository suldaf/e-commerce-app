<template>
  <div class="card mb-3" style="">
      <div class="row g-0" v-for="cart in carts" :key="cart.id">
        <div class="col-md-4">
          <img :src="cart.Product.image_url" alt="" width="100%" height="100%">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">{{cart.Product.name}}</h2>
            <p class="card-text">@ Rp.{{cart.price}}</p>
          </div>
          <div class="card-footer">
            <button class="btn btn-info" @click.prevent="changeQty({status: 'min', id: cart.id, productId: cart.ProductId})">-</button>
            <p class="text-center">{{cart.quantity}}</p>
            <button class="btn btn-info" @click.prevent="changeQty({status: 'plus', id: cart.id, productId: cart.ProductId})">+</button>
            <button class="btn btn-outline-danger" @click.prevent="removeCart(cart.id)">Remove from cart</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    carts: Array
  },
  methods: {
    changeQty (payload) {
      this.$store.dispatch('changeQty', payload)
    },
    removeCart (id) {
      this.$store.dispatch('removeCart', id)
    }
  }
}
</script>

<style scoped>
div.card-footer button{
  margin: 0 5px 0 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
div.card-footer p{
  margin: 0 5px 0 0;
  padding-top: 8px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
div.card-footer{
  background: none;
  display: flex;
  flex-direction: row;
}
div.row{
  margin-bottom: 20px;
}
img{
  border: 2px solid black;
}
</style>
