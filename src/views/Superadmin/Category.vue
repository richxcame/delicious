<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="12" md="6" class="d-flex align-center justify-center">
					<div>
						<v-img
							:src="category.image"
							:height="200"
							:width="200"
							contain
							class="ma-5"
							@click="handleClick"
							style="cursor: pointer;"
						>
							<template v-slot:placeholder>
								<v-skeleton-loader type="image" />
							</template>
							<input
								type="file"
								ref="image"
								style="display: none;"
								@change="handleImage"
							/>
						</v-img>
					</div>
				</v-col>
				<v-col cols="12" md="6" class="d-flex align-center justify-center">
					<div style="width: 100%;">
						<v-text-field
							v-model="category.name_tm"
							outlined
							:label="$t('nameInTurkmen')"
						/>
						<v-text-field
							v-model="category.name_ru"
							outlined
							:label="$t('nameInRussian')"
						/>
					</div>
				</v-col>
				<v-btn @click="update" block color="primary">
					{{ $t('updateCategory') }}
				</v-btn>
			</v-row>
		</v-container>
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
			alert: '',
			hasAlert: false,
		};
	},
	computed: {
		...mapState(['category']),
	},
	methods: {
		...mapActions(['fetchCategory']),
		update() {
			this.$axios
				.put(`/superadmin/categories/${this.category.id}`, {
					name_tm: this.category.name_tm,
					name_ru: this.category.name_ru,
				})
				.then(() => {
					this.showAlert(this.$t('successfullyUpdated'));
					this.$router.go(-1);
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		showAlert(mes) {
			this.alert = mes;
			this.hasAlert = true;
		},
		handleClick() {
			this.$refs.image.click();
		},
		handleImage(e) {
			const image = e.srcElement.files[0];
			if (image) {
				this.category.image = image;
				this.$axios
					.put(`/superadmin/categories/${this.$route.params.id}`, {
						image: image,
					})
					.then(() => {
						this.showAlert(this.$t('successfullyUpdated'));
					})
					.catch(err => {
						this.showAlert(err.message);
					});
			}
		},
	},
	created() {
		const id = this.$route.params.id;
		this.fetchCategory(id);
	},
};
</script>
