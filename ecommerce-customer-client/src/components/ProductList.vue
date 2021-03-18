<template>
  <div class="flex" style="max-height: 100vh;">
    <div class="card" style="width: 18rem; min-height: 100%; display:flex" v-for="product in products" :key="product.id" >
      <img :src="product.image_url" class="card-img-top card" alt="product" width="25%" height="50%">
      <div class="card-body" style="">
        <h5 class="card-title">{{product.name}}</h5>
        <p>Rp.{{product.price}}</p>
        <p>Stock: ({{product.stock}} item's)</p>
      </div>
      <div class="card-footer">
        <a href="#" class="btn btn-primary text-light" @click.prevent="addCart(product.id)">Add to Cart</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array
  },
  components: {
  },
  name: 'Cartlist',
  methods: {
    addCart (id) {
      if (localStorage.token) {
        this.$store.dispatch('addCart', id)
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.flex{
  display: flex;
  flex-wrap: wrap;
}
div.card{
  margin: 80px 10px 10px 10px;
  border: 2.5px solid #53D8FB;
}
div.card img{
  border: 2px dotted #00BFB2;
}
</style>
