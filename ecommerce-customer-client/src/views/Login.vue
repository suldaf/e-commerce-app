<template>
  <div class="row">
    <div class="col-6">
      <img src="https://www.supershopping.id/wp-content/uploads/2019/01/logo.png" alt="" width="75%">
    </div>
    <div class="col-6">
      <div class="form">
        <h1>Login to your account</h1>
        <div class="row formlogin">
          <div class="col">
            <div class="row">
              <div class="col card" style="background-color: grey;padding: 15px 10px">
                <form @submit.prevent="login">
                  <div class="form-floating mb-3">
                    <div class="input-group mb-3">
                      <span class="input-group-text bg-secondary text-black-50" id="basic-addon1">Email</span>
                      <input type="email" class="form-control" placeholder="Email here...." aria-label="Email" aria-describedby="basic-addon1" v-model="email">
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <div class="input-group mb-3">
                      <span class="input-group-text bg-secondary text-black-50" id="basic-addon1">Password</span>
                      <input type="password" class="form-control" placeholder="Password here..." aria-label="Password" aria-describedby="basic-addon1" v-model="password">
                    </div>
                  </div>
                  <button type="submit" class="btn btn-secondary">Login</button> <p>Don't have an account? <a href="#" class="nav-item" @click.prevent="formRegis">Register your account here!</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then((data) => {
          console.log('haaloo')
          this.$router.push('/')
        })
        .finally(() => {
          this.email = ''
          this.password = ''
        })
    },
    formRegis () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
div.form{
  margin: 80px 10px 10px 10px;
}
div.col-6 img{
  margin: 80px 10px 10px 10px;
}
p {
  color: aliceblue;
}
p a {
  /* text-decoration: none; */
  color: #30F2F2;
}

</style>
