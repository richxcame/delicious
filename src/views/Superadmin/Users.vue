<template>
	<section>
		<v-row class="my-7">
			<v-col cols="12" md="4">
				<v-text-field outlined dense v-model="user.name" :label="$t('name')" />
			</v-col>
			<v-col cols="12" md="4">
				<v-text-field
					outlined
					dense
					v-model="user.name"
					:label="$t('phoneNumber')"
				/>
			</v-col>
			<v-col cols="12" md="4">
				<v-text-field
					outlined
					dense
					v-model="user.password"
					:label="$t('password')"
				/>
			</v-col>
			<v-btn
				color="primary"
				block
				height="45"
				@click="setUser"
				:loading="isLoading"
				:disabled="isLoading"
			>
				{{ $t('addUser') }}
				<template v-slot:loader>
					<span class="custom-loader">
						<v-icon light>
							mdi-cached
						</v-icon>
					</span>
				</template>
			</v-btn>
		</v-row>
		<v-card class="my-5">
			<v-card-title>
				{{ $tc('user', 2) }}
				<v-spacer />
				<v-text-field
					v-model="search"
					outlined
					dense
					append-icon="mdi-magnify"
					:label="$t('searchAnyDataFromUsers')"
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
			user: {
				name: '',
				phoneNumber: '',
				password: '',
			},
			headers: [
				{ text: this.$t('name'), value: 'name' },
				{ text: this.$t('phoneNumber'), value: 'phoneNumber' },
				{ text: this.$t('role'), align: 'center', value: 'role' },
				{
					text: this.$tc('action', 1),
					value: 'actions',
					align: 'end',
					sortable: false,
				},
			],
			search: '',
			isLoading: false,
			hasAlert: false,
			alert: '',
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
		setUser() {
			this.$axios
				.post('/superadmin/users', this.user)
				.then(() => {
					this.showAlert(this.$t('successfullyCreated'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		showAlert(mes) {
			this.isLoading = false;
			this.alert = mes;
			this.hasAlert = true;
		},
	},
	created() {
		this.fetchUsers();
	},
};
</script>
