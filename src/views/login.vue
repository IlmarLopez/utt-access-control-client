<template>
  <section class="login">
    <div class="row">
      <div class="col-xl-12">
        <div class="portlet">
          <div class="portlet__body">
            <div class="mt-3 mb-2 d-flex justify-content-center">
              <img src="" width="150" height="72" alt="" />
            </div>
            <h4 class="portlet__head-title">Sign in</h4>
            <form class="mb-4" @submit.prevent="onLogin">
              <div class="form-group">
                <label for="inputUsername">Username</label>
                <input id="inputUsername" v-model="username" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label for="inputPassword">Password</label>
                <input id="inputPassword" v-model="password" type="password" class="form-control" />
              </div>
              <transition name="fade">
                <div v-if="status === 'error'" class="form-group">
                  <small class="text-danger is-error">
                    * Please check your username and password. Fields are case sensitive.
                  </small>
                </div>
              </transition>
              <div class="w-100 d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null,
    };
  },
  computed: {
    ...mapGetters({
      status: 'auth/authStatus',
      user: 'auth/authenticatedUser',
    }),
  },
  methods: {
    onLogin() {
      const { username, password } = this;
      this.login({ username, password }).then(() => {
        this.$router.push({ path: '/' });
      });
    },
    ...mapActions({
      login: 'auth/AUTH_REQUEST',
    }),
  },
};
</script>

<style lang="sass" scoped>
.login
  min-height: inherit
  display: flex
  justify-content: center
  align-items: center
  form
    width: 350px
    .is-error
      line-height: 1
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0
</style>
