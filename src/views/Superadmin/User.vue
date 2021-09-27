<template>
	<section>
		<v-row>
			<v-col cols="12" md="6" class="d-flex align-center justify-center">
				<div>
					<v-img :src="user.image" :max-height="350" :max-width="350">
						<template v-slot:placeholder>
							<v-skeleton-loader type="image" />
						</template>
					</v-img>
				</div>
			</v-col>
			<v-col cols="12" md="6" class="d-flex align-center justify-center">
				<div>
					<div class="text-h6 text-md-h5 font-weight-bold text-center mb-5">
						{{ user.name }}
					</div>
					<div class="text-center">
						{{ user.phoneNumber }}
					</div>
					<div>
						<v-select
							outlined
							dense
							class="my-3"
							color="primary"
							:items="roles"
							v-model="user.role"
							@change="changeRole"
						/>
					</div>
				</div>
			</v-col>
		</v-row>
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
			roles: ['user', 'admin'],
			alert: '',
			hasAlert: false,
		};
	},
	computed: {
		...mapState(['user']),
	},
	methods: {
		...mapActions(['fetchUser']),
		changeRole() {
			let role = '';
			if (this.role === this.$t('admin')) {
				role = 'admin';
			} else {
				role = 'user';
			}
			this.$axios
				.put(`/superadmin/users/${this.$route.params.id}`, {
					role,
				})
				.then(() => {
					this.showAlert(this.$t('successfullyUpdated'));
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
		const { id } = this.$route.params;
		this.fetchUser(id);
	},
};
</script>
