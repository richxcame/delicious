<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="category.name_tm"
            outlined
            :label="$t('nameInTurkmen')"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="category.name_ru"
            outlined
            :label="$t('nameInRussian')"
          />
        </v-col>
        <v-col cols="12">
          <v-file-input
            v-model="category.image"
            outlined
            :label="$t('updateImage')"
          />
        </v-col>
        <v-btn
          @click="update(category)"
          block
          color="primary"
        >
          {{ $t('updateCategory') }}
        </v-btn>
      </v-row>
    </v-container>
    <v-snackbar
      app
      absolute
      bottom
      right
      timeout="4000"
      color="primary"
      dark
      elevation="7"
      v-model="hasAlert"
      max-width="400"
    >
      {{ alert }}
    </v-snackbar>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      alert: '',
      loading: false,
      hasAlert: false,
    }
  },
  computed: {
    ...mapState(['category']),
  },
  methods: {
    ...mapActions(['fetchCategory']),
    update(category) {
      this.$axios.put(`/superadmin/categories/${category.id}`, category)
        .then(() => {
          this.dialog = false;
          this.showAlert(this.$t('successfullyUpdated'));
          this.$router.go(-1);
        })
        .catch(err => {
          this.showAlert(err.message);
        });
    },
    showAlert(mes) {
      this.loading = false;
      this.alert = mes;
      this.hasAlert = true;
    },
  },
  created() {
    const id = this.$route.params.id
    this.fetchCategory(id);
  },
}
</script>