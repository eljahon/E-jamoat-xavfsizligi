<template>
  <div class="login-wrap">
    <div class="login-content">
      <validation-observer v-slot="{handleSubmit}" ref="loginFormObs" tag="div" class="login-form-wrap">
        <form @submit.prevent="handleSubmit(submit)" class="login-form">
          <div class="login-logo">
            <img src="../../assets/images/logo.png" alt="">
          </div>
          <div>
            <custom-input-text
              label="Email"
              name="email"
              v-model="user.email"
              rules="required|email">
              <template #prepend-inner>
                <div class="pt-1 pr-1">
                  <v-icon>fas fa-at</v-icon>
                </div>
              </template>
            </custom-input-text>
          </div>
          <div>
            <custom-input-text
              label="Пароль"
              name="password"
              v-model="user.password"
              type="password"
              rules="required"
            >
              <template #prepend-inner>
                <div class="pt-1 pr-1">
                  <v-icon>fas fa-lock</v-icon>
                </div>
              </template>
            </custom-input-text>
          </div>
          <div>
            <v-btn large width="100%" :loading="loading" type="submit" color="primary">Войти</v-btn>
          </div>
        </form>
      </validation-observer>
    </div>
    <div class="login-bg"></div>
  </div>
</template>

<script>
    import TokenService from "@/utils/TokenService";

    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                loading: false,
            }
        },
        methods: {
            async submit() {
                try {
                    this.loading = true
                    await this.$store.dispatch('login', this.user)
                    await this.$router.push({name: 'dashboard'})
                } catch (e) {
                    this.$setResponseError({error: e})
                    this.$setFormError({error: e, obs: this.$refs.loginFormObs})
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>