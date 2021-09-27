<template>
	<v-app>
		<v-main class="fill-height d-flex align-center justify-center">
			<v-container class="fill-height d-flex align-center">
				<v-row no-gutters>
					<v-col
						cols="12"
						md="6"
						order-md="1"
						class="d-flex align-center justify-center justify-md-start my-2"
					>
						<v-img
							max-height="350"
							max-width="350"
							src="../assets/mobile-login.svg"
							contain
						>
							<template v-slot:placeholder>
								<v-skeleton-loader type="image" />
							</template>
						</v-img>
					</v-col>
					<v-col
						cols="12"
						md="6"
						order-md="0"
						class="d-flex align-center justify-center my-2"
					>
						<div style="min-width: 400px;">
							<v-text-field
								outlined
								color="#6C63FF"
								:label="$t('phoneNumber')"
								class="rounded-lg"
								v-model="user.phoneNumber"
							/>
							<v-text-field
								outlined
								class="rounded-lg"
								color="#6C63FF"
								:label="$t('password')"
								v-model="user.password"
								:type="isPassword ? 'password' : 'text'"
								autocomplete="off"
								@keypress.enter="login"
							>
								<template v-slot:append>
									<v-icon @click="isPassword = !isPassword">
										{{ isPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}
									</v-icon>
								</template>
							</v-text-field>
							<v-btn
								class="rounded-lg"
								block
								color="#6C63FF"
								dark
								elevation="7"
								@click="login"
							>
								{{ $t('login') }}
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			user: {
				phoneNumber: '',
				password: '',
			},
			isPassword: true,
		};
	},
	computed: {
		getCurrentLocale() {
			return this.$i18n.locale;
		},
		getLocales() {
			this.$i18n.availableLocales.forEach(lang => {
				if (lang !== this.$i18n.locale) {
					return lang;
				}
			});
		},
	},
	methods: {
		login() {
			this.$axios
				.post('/auth/login', this.user)
				.then(res => {
					this.$cookies.set('token', res.data.token);
					if (res.data.data.role === 'superadmin') {
						this.$router.push('/superadmin');
					} else if (res.data.data.role === 'admin') {
						this.$router.push('/admin');
					} else {
						this.$router.push('/');
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
};
</script>
