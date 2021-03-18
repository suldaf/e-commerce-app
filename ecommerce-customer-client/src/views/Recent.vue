<template>
  <div class="row">
    <div class="col-10">
      <div class="card mb-3" style="">
        <div class="form">
          <h1>History Transaction</h1>
          <div class="row g-0" v-for="cart in recentCart" :key="cart.id">
            <div class="col-md-4">
              <img :src="cart.Product.image_url" alt="" width="100%" height="100%">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h1 class="card-title">{{cart.Product.name}}</h1>
                <p class="card-text">Rp. {{cart.price}} X {{cart.quantity}}</p>
              </div>
              <div class="card-footer">
                <p class="text-center">Total: Rp. {{cart.price * cart.quantity}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script>
export default {
  computed: {
    recentCart () {
      return this.$store.state.recentCart
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.dispatch('fetchRecentCart')
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
div.form {
  margin-top: 50px;
  padding-top: 40px;
  background-color: #AFECE7;
}
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
