<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="orders"
			sort-by="deliveredAt"
			:search="search"
		>
			<template v-slot:[`item.isDelivered`]="{ item }">
				<v-switch v-model="item.isDelivered" @change="updateOrder(item)" />
			</template>
			<template v-slot:[`item.totalPrice`]="{ item }">
				{{ item.totalPrice }} TMT
			</template>
			<template v-slot:[`item.timeToDeliver`]="{ item }">
				{{ item.timeToDeliver ? item.timeToDeliver : $t('urgent') }}
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<div>
					<v-btn icon class="mx-1" @click="showOrder(item)">
						<v-icon color="primary">
							mdi-eye-outline
						</v-icon>
					</v-btn>
					<v-btn @click="deleteOrder(item)" icon class="mx-1" disabled>
						<v-icon color="red darken-2">
							mdi-delete
						</v-icon>
					</v-btn>
				</div>
			</template>
		</v-data-table>
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
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			search: '',
			headers: [
				{
					text: this.$t('shippingAddress'),
					align: 'start',
					value: 'addressId',
				},
				{
					text: this.$t('name'),
					align: 'center',
					value: 'customer.name',
				},
				{
					text: this.$t('phoneNumber'),
					align: 'center',
					value: 'customer.phoneNumber',
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
			alert: '',
			hasAlert: false,
		};
	},
	computed: {
		...mapState(['orders']),
	},
	methods: {
		...mapActions(['fetchOrders']),
		updateOrder(order) {
			this.$axios
				.put(`/superadmin/orders/${order.id}`, order)
				.then(() => {
					this.showAlert(this.$t('successfullyUpdated'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		deleteOrder(order) {
			this.$axios
				.delete(`/superadmin/orders/${order.id}`)
				.then(() => {
					this.showAlert(this.$t('deletedSuccessfullyDeleted'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		showOrder(order) {
			this.$router.push(`/superadmin/orders/${order.id}`);
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
