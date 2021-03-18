<template>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4 card" style="background-color: grey;padding: 15px 10px">
        <form @submit.prevent="addProduct">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" placeholder="e.g. Shoes" v-model="product.name">
          </div>
          <div class="mb-3">
            <label class="form-label">Image URL</label>
            <input type="text" class="form-control" placeholder="Please input a Image Url here" v-model="product.image_url">
          </div>
          <div class="mb-3">
            <label class="form-label">Price</label>
            <input type="number" class="form-control" placeholder="0" v-model="product.price">
            <label class="form-label">Stock</label>
            <input type="number" class="form-control" placeholder="0" v-model="product.stock">
          </div>
          <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </div>
      <div class="col-4"></div>
    </div>
</template>

<script>
export default {
  name: 'FormAddProduct',
  data () {
    return {
      product: {
        name: '',
        image_url: '',
        price: 0,
        stock: 0
      }
    }
  },
  methods: {
    addProduct () {
      this.$store.dispatch('addProduct', this.product).then(() => this.$router.push('/dashboard'))
    }
  }
}
</script>

<style scoped>
  label {
    font-size: 22px;
    color: white;
  }
</style>
