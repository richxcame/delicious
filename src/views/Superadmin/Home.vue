<template>
	<section>
		<v-row class="ma-5">
			<v-col cols="12" md="3" v-for="(item, i) in info" :key="i">
				<v-hover v-slot="{ hover }">
					<v-card
						class="pa-5 d-flex justify-space-around"
						:elevation="hover ? 7 : 2"
					>
						<v-icon size="50" :color="item.color">
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
				</v-hover>
			</v-col>
		</v-row>

		<v-row>
			<v-container>
				<v-sparkline
					:value="[
						25,
						11,
						20,
						5,
						20,
						12,
						4,
						34,
						23,
						21,
						45,
						56,
						67,
						32,
						45,
						56,
						54,
						34,
						34,
						45,
						71,
					]"
					:smooth="10"
					:line-width="2"
					auto-draw
					stroke-linecap="round"
					:gradient="['green', 'yellow', 'red']"
					:auto-line-width="true"
					:labels="[
						25,
						11,
						20,
						5,
						20,
						12,
						4,
						34,
						23,
						21,
						45,
						56,
						67,
						32,
						45,
						56,
						54,
						34,
						34,
						45,
						71,
					]"
				></v-sparkline>
			</v-container>
		</v-row>
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			info: [
				{
					icon: 'mdi-monitor-cellphone',
					title: 'New visits',
					color: 'cyan',
					number: 10231,
				},
				{
					icon: 'mdi-message-outline',
					title: 'Messages',
					color: 'blue darken-2',
					number: 2301,
				},
				{
					icon: 'mdi-account-outline',
					title: 'Users',
					color: 'red darken-1',
					number: 500,
				},
				{
					icon: 'mdi-cart-outline',
					title: 'Shoppings',
					color: 'cyan',
					number: 9991,
				},
			],
			headers: [
				{
					text: this.$t('shippingAddress'),
					align: 'start',
					value: 'addressId',
				},
				{ text: this.$t('timeToDeliver'), value: 'timeToDeliver' },
				{ text: this.$t('isDelivered'), value: 'isDelivered' },
				{
					text: this.$t('totalPrice'),
					align: 'center',
					value: 'totalPrice',
					sortable: true,
				},
				{
					text: this.$tc('action', 2),
					align: 'end',
					value: 'actions',
					sortable: false,
				},
			],
		};
	},
	computed: {
		...mapState(['orders']),
	},
	methods: {
		...mapActions(['fetchOrders']),
		deleteOrder(order) {
			this.$axios
				.delete(`/superadmin/orders/${order.id}`)
				.then(() => {
					this.showAlert(this.$t('successfullyDeleted'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		showAlert(mes) {
			this.alert = mes;
			this.hasAlert = true;
		},
	},
	created() {
		this.fetchOrders();
	},
};
</script>
