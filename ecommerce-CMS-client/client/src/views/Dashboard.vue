<template>
  <div>
    <div>
      <span class="btn btn-primary">
        <router-link to="/addProduct" >AddProduct</router-link>
      </span>
    </div>
    <div>
      <Board :products="products"/>
    </div>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'

export default {
  name: 'Dashboard',
  components: {
    Board
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style scoped>
  a {
    color: white;
  }
  div span {
    margin-bottom: 7px;
  }
</style>
