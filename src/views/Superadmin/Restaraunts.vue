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
            label="Restaraunt Name"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-file-input
            v-model="image"
            outlined
            dense
            label="Add images to restaraunt"
            accept="image/*"
            show-size
          />
        </v-col>
      </v-row>
      <v-btn
        color="primary"
        block
        height="45"
        @click="setRestaraunt"
      >
        Add Restaraunt
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>
              mdi-cached
            </v-icon>
          </span>
        </template>
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="items"
        sort-by="rating"
        class="elevation-2 mt-15"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Restaurants</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer />
            <v-text-field
              v-model="search"
              class="mt-6"
              outlined
              dense
              append-icon="mdi-magnify"
              label="Search from restaraunts any data"
            />
            <v-dialog
              v-model="dialogDelete"
              max-width="500px"
            >
              <v-card>
                <v-card-title
                  class="text-h5"
                  style="font-family: Poppins !important;"
                >
                  Are you sure you want to delete this item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    text
                    @click="closeDelete"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="deleteRestaraunt"
                  >
                    OK
                  </v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.image>
          <div class="d-flex">
            <v-btn
              icon
              class="my-auto"
            >
              <v-icon color="primary">
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <div>
              <v-img
                src="../../assets/logo.png"
                height="75"
                width="75"
              ></v-img>
            </div>
            <v-btn
              icon
              class="my-auto"
            >
              <v-icon color="primary">
                mdi-chevron-right
              </v-icon>
            </v-btn>
          </div>
        </template>
        <template v-slot:item.rating>
          <v-rating
            readonly
            dense
            value="3"
            small
          ></v-rating>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            class="mr-2"
            @click="editItem(item)"
            color="primary"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            @click="deleteRestaraunt(item)"
            color="red darken-2"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
    <v-snackbar
      absolute
      bottom
      timeout="7000"
      color="primary"
      dark
      elevation="7"
      right
      v-model="hasAlert"
      max-width="350"
    >
      {{ alert }}
    </v-snackbar>
  </section>
</template>

<script>
  export default {
    data: () => ({
      name: '',
      image: null,
      images: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Images', sortable: false, value: 'image' },
        { text: 'Restaurant', value: 'name' },
        { text: 'Rating', value: 'rating', align: 'center' },
        { text: 'Number Ratings', value: 'numberRatings', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'end' },
      ],
      items: [],
      alert: '',
      hasAlert: false,
      search: '',
    }),

    watch: {

      image(img) {
        if (img) {
          this.images.push(img);
        }
      },

      dialog (val) {
        val || this.close()
      },

      dialogDelete (val) {
        val || this.closeDelete()
      },

    },

    methods: {

      setRestaraunt() {
        this.$axios.post('/superadmin/restaraunts', {
          name: this.name,
          images: this.images,
        })
          .then(res => {
            this.showAlert('Successfully created');
            this.reset();
          })
          .catch(err => {
            this.showAlert(err.message);
          });
      },

      reset() {
        this.name = '';
        this.image = null;
        this.images = [];
      },

      editItem (item) {
        this.dialog = true
        this.$axios.put(`/superadmin/restaraunts/${item.id}`, item)
          .then(res => {
            this.showAlert('Succesfully updated');
            this.dialog = false;
          })
          .catch(err => {
            this.showAlert(err.message);
          });
      },

      deleteRestaraunt({ id }) {
        this.$axios.delete(`/superadmin/restaraunts/${id}`)
          .then(res => {
            this.showAlert('Successfully deleted');
          })
          .catch(err => {
            this.showAlert(err.message);
          });
      },

      close () {
        this.dialog = false
      },

      closeDelete () {
        this.dialogDelete = false;
      },

      showAlert(msg) {
        this.alert = msg;
        this.hasAlert = true;
      }
      
    },
    
    created () {

      this.$axios.get('/superadmin/restaraunts')
        .then(res => {
          this.items = res.data.data;
        })
        .catch(err => {
          this.showAlert(err.message);
        });
      
    }
  }
</script>