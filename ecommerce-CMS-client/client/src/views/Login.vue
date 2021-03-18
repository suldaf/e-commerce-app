<template>
  <div class="login">
    <h2 class="mb-3">Login</h2>
    <FormLogin/>
  </div>
</template>

<script>

import FormLogin from '@/components/FormLogin.vue'

export default {
  name: 'Login',
  components: {
    FormLogin
  }
}
</script>

<style>

</style>
