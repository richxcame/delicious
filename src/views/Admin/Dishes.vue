<template>
  <section>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="name"
            outlined
            dense
            label="Name"
          />
          <v-text-field
            outlined
            v-model="price"
            dense
            label="Price"
          />
          <v-file-input
            outlined
            show-size
            dense
            label="Set image"
            v-model="image"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-textarea
            v-model="description"
            label="Description"
            outlined
            dense
            auto-grow
          />
        </v-col>
      </v-row>
      <v-btn
        block
        color="primary"
        height="45"
        :disabled="loading"
        :loading="loading"
        @click="setDish"
      >
        add dish
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>
              mdi-cached
            </v-icon>
          </span>
        </template>
      </v-btn>
    <v-row class="my-5">
      <v-container>
        <v-card>
          <v-card-title>
            Dishes
            <v-spacer />
            <v-text-field
              single-line
              append-icon="mdi-magnify"
              v-model="search"
              dense
              outlined
              placeholder="Search from dishes table"
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                color="primary"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                color="red darken-2"
                @click="deleteDish(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-row>
    </v-container>
    <v-snackbar
      app
      bottom
      right
      color="primary"
      dark
      elevation="7"
      timeout="7000"
      v-model="hasAlert"
    >
      {{ alert }}
    </v-snackbar>
  </section>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description', },
      { text: 'Active', value: 'active', align: 'center', sortable: false },
      { text: 'Price', value: 'price', align: 'center' },
      { text: 'Images', value: 'images', align: 'center' },
      { text: 'View Count', value: 'viewCount', align: 'center' },
      { text: 'Liked', value: 'likeCount', align: 'center' },
      { text: 'Discount', value: 'discount', align: 'center' },
      { text: 'Actions', value: 'actions', align: 'end', sortable: false }
    ],
    items: [],
    image: null,
    name: '',
    price: '',
    description: '',
    images: [],
    search: '',
    loading: false,
    isActive: true,
    hasAlert: false,
    alert: '',
  }),

  watch: {

    image(val) {
      if (val) {
        this.images.push(val);
      }
      console.log(val);
    }

  },

  methods: {
    
    setDish() {
      this.loading = true;
      this.$axios.post('/superadmin/dishes', {
        name: this.name,
        price: this.price,
        description: this.description,
        images: this.images
      })
        .then(res => {
          this.showAlert('Successfully created');
          this.loading = false;
          this.reset();
        })
        .catch(err => {
          this.loading = false;
          this.showAlert(err.message);
        });
    },

    deleteDish({ id }) {
      this.$axios.delete(`/superadmin/dishes/${id}`)
        .then(res => {
          this.showAlert('Successfully deleted')
        })
        .catch(err => {
          this.showAlert(err.message)
        });
    },

    reset() {
      this.name = '';
      this.description = '';
      this.image = null;
      this.price = '';
    },

    showAlert(msg) {
      this.alert = msg;
      this.hasAlert = true;
    }

  },
  created() {

    this.$axios.get('/superadmin/dishes')
      .then(res => {
        console.log(res);
        this.items = res.data.data;
      })
      .catch(err => {
        console.log(err);
        this.showAlert(err.message);
      });
      
  }
}
</script>