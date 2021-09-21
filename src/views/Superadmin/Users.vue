<template>
  <section>
    <v-container>
        <v-card>
          <v-card-title>
            {{ $t('user') }}
            <v-spacer />
            <v-text-field
              v-model="search"
              outlined
              dense
              append-icon="mdi-magnify"
              :label="$t('search')"
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
          >
            <template v-slot:item.role="{ item }">
              <v-chip
                :color="chipColor(item)"
                dark
              >
                {{ item.role }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                color="red darken-2"
                @click="deleteCategory(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Phone Number', value: 'phoneNumber' },
      { text: 'Role', align: 'center', value: 'role' },
      { text: 'Action', align: 'end', sortable: false, value: 'actions' }
    ],
    items: [],
    search: '',
    name: '',
    image: '',
  }),
  
  methods: {
    
    deleteCategory({ id }) {
      this.$axios.delete(`/superadmin/users/${id}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    reset() {
      this.name = '';
      this.image = null;
    },

    chipColor({ role }) {
      if (role == 'superadmin') {
        return 'red'
      } else if ( role == 'admin' ) {
        return 'primary'
      } else {
        return 'success'
      }
    }

  },

  created() {
    // TODO: delete
    console.log(this.$t);

    this.$axios.get('/superadmin/users')
      .then(res => {
        console.log(res);
        this.items = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
      
  }
}
</script>