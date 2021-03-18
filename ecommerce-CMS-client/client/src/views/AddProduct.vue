<template>
  <div>
    <h2>Add Product</h2>
    <FormAdd/>
  </div>
</template>

<script>
import FormAdd from '@/components/FormAddProduct.vue'
export default {
  name: 'AddProduct',
  components: {
    FormAdd
  }
}
</script>
