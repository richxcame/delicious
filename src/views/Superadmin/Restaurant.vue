<template>
	<section>
		this is single Restaurant page
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {};
	},
	methods: {
		...mapActions(['fetchRestaurant']),
	},
	created() {
		const id = this.$route.params.id;
		this.fetchRestaurant(id);
	},
};
</script>
