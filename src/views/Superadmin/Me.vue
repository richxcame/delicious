<template>
  <section class="fill-height d-flex align-center justify-center">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center"
        >
          <v-img
            src="../../assets/admin.jpg"
            max-height="400"
            max-width="400"
          >

          </v-img>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex align-center justify-center"
        >
          <div style="width: 350px;">
            <h3 class="mb-5">
              <center>
                DATLY
              </center>
            </h3>

            <v-text-field
              type="number"
              min="1"
              v-model="phoneNumber"
              outlined
              prepend-inner-icon="mdi-cellphone"
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="password"
              outlined
              prepend-inner-icon="mdi-key-outline"
            ></v-text-field>
            <v-btn
              block
              color="primary"
              @click="update"
            >
              Update
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    phoneNumber: 863777777,
    password: 'test123',
  }),
  methods: {
    update () {
      this.$axios.post('/superadmin/me', {
        phoneNumber: this.phoneNumber,
        password: this.password,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
</script>