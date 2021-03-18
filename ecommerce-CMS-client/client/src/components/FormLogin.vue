<template>
  <div class="container">
    <div class="row formlogin">
      <div class="col">
        <div class="row">
          <div class="col-4"></div>
          <div class="col-4 card" style="background-color: grey;padding: 15px 10px">
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
              <button type="submit" class="btn btn-secondary">Login</button>
            </form>
          </div>
          <div class="col-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLogin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
