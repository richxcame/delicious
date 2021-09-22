<template>
	<section>
		<v-simple-table>
			<template v-slot:default>
				<tbody>
					<tr>
						<td>{{ $t('timeToDeliver') }}</td>
						<td>{{ order.deliveredAt ? order.deliveredAt : $t('urgent') }}</td>
					</tr>
					<tr>
						<td>{{ $t('timeToDeliver') }}</td>
						<td>{{ order.timeToDeliver }}</td>
					</tr>
					<tr>
						<td>{{ $t('customerName') }}</td>
						<td>{{ order.customer.name }}</td>
					</tr>
					<tr>
						<td>{{ $t('phoneNumber') }}</td>
						<td>{{ order.customer.phoneNumber }}</td>
					</tr>
					<tr>
						<td>{{ $t('isActive') }}</td>
						<td>
							<v-switch value="order.active" />
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<div class="text-h6 text-center font-weight-bold my-3">
			{{ $tc('dish', 2) }}
		</div>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th>{{ $t('nameInTurkmen') }}</th>
						<th>{{ $t('nameInRussian') }}</th>
						<th>{{ $tc('restaurant', 1) }}</th>
						<th>{{ $t('singlePrice') }}</th>
						<th>{{ $t('quantity') }}</th>
						<th>{{ $t('totalPrice') }}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(dish, i) in order.orderDishes" :key="i">
						<td>{{ dish.dish.name_tm }}</td>
						<td>{{ dish.dish.name_ru }}</td>
						<td>{{ dish.dish.restaurantId }}</td>
						<td>
							<span
								:class="
									dish.dish.discount ? 'text-decoration-line-through mx-1' : ''
								"
							>
								{{ dish.dish.price }}
							</span>
							<span
								v-if="dish.dish.discount"
								class="font-weight-bold text-body-1 ml-2"
							>
								{{ dish.dish.discount }}
							</span>
							<span class="mx-1">TMT</span>
						</td>
						<td>
							{{ dish.quantity }}
						</td>
						<td>{{ dish.totalPrice }} TMT</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['order']),
	},
	methods: {
		...mapActions(['fetchOrder']),
	},
	created() {
		const id = this.$route.params.id;
		this.fetchOrder(id);
	},
};
</script>
