<template>
  <v-app>    
    <v-main class="fill-height d-flex align-center justify-center">
      <v-container class="fill-height d-flex align-center">
        <v-row no-gutters>
          <v-col
            cols="12"
            md="6"
            order-md="1"
            class="d-flex align-center justify-center justify-md-start my-2"
          >
            <v-img
              max-height="350"
              max-width="350"
              src="../assets/mobile-login.svg"
              contain
            >
              <template v-slot:placeholder>
                <v-skeleton-loader type="image"/>
              </template>
            </v-img>
          </v-col>
          <v-col
            cols="12"
            md="6"
            order-md="0"
            class="d-flex align-center justify-center my-2"
          >
            <div style="min-width: 400px;">
              <v-text-field
                outlined
                color="#6C63FF"
                :label="$t('phoneNumber')"
                class="rounded-xl"
                v-model="user.phoneNumber"
              />
              <v-text-field
                outlined
                class="rounded-xl"
                color="#6C63FF"
                :label="$t('password')"
                v-model="user.password"
              />
              <v-btn
                class="rounded-xl"
                block
                color="#6C63FF"
                dark
                elevation="7"
                @click="login"
              >
                {{ $t('login') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      user: {
        phoneNumber: '',
        password: '',
      },
    }
  },
  computed: {
    getCurrentLocale() {
      return this.$i18n.locale;
    },
    getLocales() {
      this.$i18n.availableLocales.forEach(lang => {
        if ( lang !== this.$i18n.locale ) {
          return lang
        }
      });
    },
  },
  methods: {
    login() {
      this.$axios.post('/auth/login', this.user)
      .then(res => {
        console.log(res.data);
        this.$cookies.set('token', res.data.token);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
}
</script>