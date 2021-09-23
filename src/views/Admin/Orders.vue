<template>
	<section></section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['adminOrders']),
	},
	methods: {
		...mapActions(['fetchAdminOrders']),
	},
	created() {
		this.fetchAdminOrders();
	},
};
</script>
