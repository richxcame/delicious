<template>
	<section>
		<v-form ref="form" v-model="isValid" lazy-validation>
			<v-row class="my-7">
				<v-col cols="12" md="4">
					<v-text-field
						outlined
						dense
						v-model="user.name"
						:label="$t('name')"
						color="primary"
						required
						:rules="requiredRule"
						auto-complete="off"
					/>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						outlined
						dense
						v-model="user.phoneNumber"
						:label="$t('phoneNumber')"
						color="primary"
						required
						:rules="phoneRules"
						auto-complete="off"
					>
						<template #prepend-inner>
							<div class="mt-1">
								+993
							</div>
						</template>
					</v-text-field>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						outlined
						dense
						v-model="user.password"
						:label="$t('password')"
						color="primary"
						required
						:rules="passwordRules"
						:type="isPassword ? 'password' : 'text'"
						auto-complete="off"
					>
						<template v-slot:append>
							<v-icon @click="isPassword = !isPassword">
								{{ isPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}
							</v-icon>
						</template>
					</v-text-field>
				</v-col>
				<v-btn
					color="primary"
					block
					height="45"
					@click="validate"
					:loading="isLoading"
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
		</v-form>
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
					<div>
						<v-btn icon class="mx-1" @click="updateUser(item)">
							<v-icon color="primary">
								mdi-pencil
							</v-icon>
						</v-btn>
						<v-btn @click="deleteUser(item)" icon class="mx-1">
							<v-icon color="red darken-2">
								mdi-delete
							</v-icon>
						</v-btn>
					</div>
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
			isValid: true,
			isPassword: true,
			search: '',
			isLoading: false,
			hasAlert: false,
			alert: '',
			requiredRule: [v => !!v || this.$t('requiredField')],
			phoneRules: [
				v => !!v || this.$t('phoneRequired'),
				v => (v.length === 8 && !/\D/.test(v)) || this.$t('phoneMustValid'),
			],
			passwordRules: [
				v => !!v || this.$t('passwordRequired'),
				v => v.length >= 6 || this.$t('lessPassword', { c: 6 }),
			],
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
		updateUser(user) {
			this.$router.push(`/superadmin/users/${user.id}`);
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
		validate() {
			if (this.$refs.form.validate()) {
				this.setUser();
			}
		},
		setUser() {
			this.$axios
				.post('/auth/signup', this.user)
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
