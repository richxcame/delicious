<template>
  <section>
    <v-row class="ma-5">
      <v-col
        cols="12"
        md="3"
        v-for="(item, i) in info"
        :key="i"
      >
        <v-card class="pa-5 d-flex justify-space-around">
          <v-icon
            size="50"
            :color="item.color"
          >
            {{ item.icon }}
          </v-icon>
          <div>
            <h3>
              <center>
                {{ item.title }}
              </center>
            </h3>
            <center>
              {{ item.number }}
            </center>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-container>
        <v-sparkline
          :value="[25, 11, 20, 5, 20, 12, 4, 34, 23, 21, 45, 56, 67, 32, 45, 56, 54, 34, 34, 45, 71]"
          :smooth="10"
          :line-width="2"
          auto-draw
          stroke-linecap="round"
          :gradient="['green', 'yellow', 'red']"
          :auto-line-width="true"
          :labels="[25, 11, 20, 5, 20, 12, 4, 34, 23, 21, 45, 56, 67, 32, 45, 56, 54, 34, 34, 45, 71]"
        ></v-sparkline>
      </v-container>
    </v-row>

    <v-row>
      <v-container>
        <v-card>
          <v-card-title>
            Orders
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              outlined
              dense
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="orderHeaders"
            :items="orderItems"
            sort-by="deliveredAt"
            :search="search"
          >
            <template v-slot:item.isDelivered="{ item }">
              <v-switch v-model="item.isDelivered"></v-switch>
              <!-- {{ item.isDelivered }} -->
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'Superadmin',
  data: () => ({
    search: '',
    orders: [],
    info: [
      { icon: 'mdi-monitor-cellphone', title: 'New visits', color: 'cyan', number: 10231 },
      { icon: 'mdi-message-outline', title: 'Messages', color: 'blue darken-2', number: 2301},
      { icon: 'mdi-account-outline', title: 'Users', color: 'red darken-1', number: 500 },
      { icon: 'mdi-cart-outline', title: 'Shoppings', color: 'cyan', number: 9991 },
    ],
    orderHeaders: [
      { text: 'Shipping Address', align: 'start', sortable: false, value: 'shippingAddress' },
      { text: 'Delivered At', value: 'deliveredAt' },
      { text: 'Delivered', value: 'isDelivered' },
      { text: 'Total Price', align: 'center', value: 'totalPrice', sortable: true },
    ],
    orderItems: [
      { shippingAddress: 'Gorogly 113, AZC', deliveredAt: '25.07.2021 21:01', isDelivered: false, totalPrice: 215 },
      { shippingAddress: 'Ataturk 1972', deliveredAt: '25.07.2021 23:01', isDelivered: false, totalPrice: 215 },
      { shippingAddress: 'Aytakow', deliveredAt: '25.07.2021 21:10', isDelivered: true, totalPrice: 215 }
    ]
  }),
  created() {
    this.$axios.get('/superadmin/orders')
      .then(res => {
        console.log(res);
        this.orders = res.data;
        console.log(this.orders);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>