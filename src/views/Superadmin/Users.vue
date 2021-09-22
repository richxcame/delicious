<template>
	<section>
		<v-container>
			<v-card>
				<v-card-title>
					{{ $tc('user', 2) }}
					<v-spacer />
					<v-text-field
						v-model="search"
						outlined
						dense
						append-icon="mdi-magnify"
						:label="$t('search')"
					/>
				</v-card-title>
				<v-data-table :headers="headers" :items="users" :search="search">
					<template v-slot:[`item.role`]="{ item }">
						<v-chip :color="chipColor(item)" dark>
							{{ item.role }}
						</v-chip>
					</template>
					<template v-slot:[`item.actions`]="{ item }">
						<v-icon color="red darken-2" @click="deleteCategory(item)">
							mdi-delete
						</v-icon>
					</template>
				</v-data-table>
			</v-card>
		</v-container>
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			headers: [
				{ text: this.$t('name'), value: 'name' },
				{ text: $t('phoneNumber'), value: 'phoneNumber' },
				{ text: $t('role'), align: 'center', value: 'role' },
				{
					text: this.$tc('action', 1),
					value: 'actions',
					align: 'end',
					sortable: false,
				},
			],
			search: '',
		};
	},
	computed: {
		...mapState(['users']),
	},
	methods: {
		...mapActions(['fetchUsers']),
		deleteUser(user) {
			this.$axios
				.delete(`/superadmin/users/${user.id}`)
				.then(() => {
					this.showAlert(this.$t('successfullyDeleted'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		reset() {
			this.name = '';
			this.image = null;
		},
		chipColor({ role }) {
			if (role == 'superadmin') {
				return 'red';
			} else if (role == 'admin') {
				return 'primary';
			} else {
				return 'success';
			}
		},
	},
	created() {
		this.fetchUsers();
	},
};
</script>
