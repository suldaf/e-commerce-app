<template>
  <div class="home">
    <ProductList :products="products"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'
export default {
  name: 'Home',
  components: {
    ProductList
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
  }
}
</script>

<style scoped>
div.home{
  display: flex;
}

</style>
