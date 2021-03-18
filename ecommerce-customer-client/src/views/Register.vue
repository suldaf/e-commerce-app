<template>
  <div class="container">
    <div class="row">
        <div class="col-6">
          <div class="form">
            <h1>Register your Account</h1>
            <div class="row formlogin">
              <div class="col">
                <div class="row">
                  <div class="col card" style="background-color: grey;padding: 15px 10px">
                    <form @submit.prevent="regis">
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
                      <button type="submit" class="btn btn-secondary">Register</button> <p>Already have an account? <a href="#" class="nav-item" @click.prevent="formLogin">Login here!</a></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <img src="https://cdn3.iconfinder.com/data/icons/privacy-security/24/icon-privacy-and-security-open-lock-512.png" alt="" width="50%">
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
    regis () {
      this.$store.dispatch('regis', { email: this.email, password: this.password }).then(() => this.$router.push('/')).finally(() => {
        this.email = ''
        this.password = ''
      })
    },
    formLogin () {
      this.$router.push('/login')
    }
  }
}

</script>
<style scoped>
div.form {
  margin: 80px 10px 10px 10px;
}
div.col-6 img {
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
