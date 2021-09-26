<template>
	<section>
		{{ user }}
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['user']),
	},
	methods: {
		...mapActions(['fetchUser']),
	},
	created() {
		const { id } = this.$route.params;
		this.fetchUser(id);
	},
};
</script>
