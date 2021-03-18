<template>
  <div class="conatainer">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Image</th>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in products" :key="product.id">
          <td>{{index+1}}</td>
          <td><img :src="product.image_url" alt="" width="175vw" height="175vh"></td>
          <td>{{product.name}}</td>
          <td>{{product.price}}</td>
          <td>{{product.stock}}</td>
          <td><button class="btn btn-warning" @click.prevent="formEdit(product.id)">Edit</button> <button class="btn btn-danger" @click="remove(product.id)"> Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    products: Array
  },
  methods: {
    remove (id) {
      this.$store.dispatch('removeProduct', id)
    },
    formEdit (id) {
      this.$store.dispatch('formEdit', id).then(() => this.$router.push(`/editProduct/${id}`))
    }
  }
}
</script>

<style scoped>
  tr td img {
    border: 3px solid white;
  }
</style>
