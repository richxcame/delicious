<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-file-input
            :label="$t('image')"
            show-size
            v-model="image"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :label="$t('nameInTurkmen')"
            v-model="dish.name_tm"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :label="$t('nameInRussian')"
            v-model="dish.name_ru"
            outlined
            dense
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            :label="$tc('category', 2)"
            outlined
            v-model="dish.category"
            :items="categories"
            dense
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            :label="$tc('ingredient', 2)"
            outlined
            v-model="dish.ingredient"
            :items="ingredients"
            dense
            multiple
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            :label="$t('descriptionInTurkmen')"
            v-model="dish.description_tm"
            outlined
            dense
            auto-grow
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            :label="$t('descriptionInTurkmen')"
            v-model="dish.description_ru"
            outlined
            dense
            auto-grow
          />
        </v-col>
        <v-btn
          @click="update"
          color="primary"
          block
          :disabled="isLoading"
          :loading="isLoading"
        >
          {{ $t('updateDish') }}
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>
                mdi-cached
              </v-icon>
            </span>
          </template>
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
      image: null,
      isLoading: false,
      alert: '',
      hasAlert: false,
    }
  },
  watch: {
    image(file) {
      if (file) {
        this.dish.images.push(file);
      }
    },
  },
  computed: {
    ...mapState(['dish', 'categories', 'ingredients']),
  },
  methods: {
    ...mapActions(['fetchDish', 'fetchCategories', 'fetchIngredients']),
    update() {
      const id = this.$route.params;
      this.isLoading = true;
      this.$axios.post(`/superadmin/dishes/${id}`, this.dish)
        .then(() => {
          this.isLoading = false;
          this.showAlert(this.$t('successfullyUpdated'));
          this.$router.go(-1);
        })
        .catch(err => {
          this.showAlert(err.message);
        });
    },
    showAlert(mes) {
      this.isLoading = false;
      this.alert = mes;
      this.hasAlert = true;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchDish(id);
  },
}
</script>