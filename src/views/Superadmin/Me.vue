<template>
	<section class="fill-height d-flex align-center justify-center mt-10">
		<v-row>
			<v-col cols="12" md="6" class="d-flex justify-center">
				<v-img
					:src="me.avatar"
					max-height="400"
					max-width="400"
					style="cursor: pointer;"
					class="rounded-lg"
					@click="handleClick"
				>
					<template v-slot:placeholder>
						<v-skeleton-loader type="image" />
					</template>
					<input
						type="file"
						style="display: none;"
						ref="avatar"
						@change="handleImage"
					/>
				</v-img>
			</v-col>
			<v-col cols="12" md="6" class="d-flex align-center justify-center">
				<div style="width: 350px;">
					<h3 class="mb-5">
						<center>
							{{ me.name }}
						</center>
					</h3>

					<v-form ref="form" lazy-validation v-model="isValid">
						<v-text-field
							v-model="me.phoneNumber"
							outlined
							:label="$t('phoneNumber')"
							@keypress="onlyNumber"
							disabled
							class="rounded-lg"
						/>
						<v-text-field
							v-model="password.oldPassword"
							outlined
							:type="isOldPassword ? 'password' : 'text'"
							class="rounded-lg"
							:label="$t('password')"
						>
							<template v-slot:append>
								<v-icon @click="isOldPassword = !isOldPassword">
									{{
										isOldPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
									}}
								</v-icon>
							</template>
						</v-text-field>
						<v-text-field
							v-model="password.newPassword"
							outlined
							:type="isNewPassword ? 'password' : 'text'"
							class="rounded-lg"
							:label="$t('newPassword')"
							:rules="passwordRules"
						>
							<template v-slot:append>
								<v-icon @click="isNewPassword = !isNewPassword">
									{{
										isNewPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
									}}
								</v-icon>
							</template>
						</v-text-field>
						<v-btn block color="primary" @click="validate" class="rounded-lg">
							{{ $t('update') }}
						</v-btn>
					</v-form>
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
			isValid: true,
			phoneRules: [
				v => !!v || this.$t('phoneRequired'),
				v => (v.length === 8 && !/\D/.test(v)) || this.$t('phoneMustValid'),
			],
			passwordRules: [v => v.length >= 6 || this.$t('lessPassword', { c: 6 })],
			isOldPassword: true,
			isNewPassword: true,
			alert: '',
			hasAlert: false,
			password: {
				oldPassword: '',
				newPassword: '',
			},
		};
	},
	computed: {
		...mapState(['me']),
	},
	methods: {
		...mapActions(['fetchMe']),
		validate() {
			if (this.$refs.form.validate()) {
				this.update();
			}
		},
		onlyNumber($event) {
			let keyCode = $event.keyCode ? $event.keyCode : $event.which;
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
				$event.preventDefault();
			}
		},
		update() {
			this.$axios
				.put('/auth/changePassword', this.password)
				.then(() => {
					this.showAlert(this.$t('successfullyUpdated'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		handleClick() {
			this.$refs.avatar.click();
		},
		handleImage(e) {
			const image = e.srcElement.files[0];
			if (image) {
				this.$axios
					.put('/auth/profile', {
						avatar: image,
					})
					.then(() => {
						this.showAlert(this.$t('successfullyUpdated'));
					})
					.catch(err => {
						this.showAlert(this.showAlert(err.message));
					});
			}
		},
		showAlert(mes) {
			this.alert = mes;
			this.hasAlert = true;
		},
	},
	created() {
		this.fetchMe();
	},
};
</script>
