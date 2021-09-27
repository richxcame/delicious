<template>
	<section>
		<v-row>
			<v-col
				cols="12"
				sm="6"
				md="4"
				lg="3"
				v-for="(image, i) in dish.images"
				:key="i"
			>
				<v-img
					class="ma-2 rounded-lg"
					:src="image"
					contain
					height="100%"
					width="100%"
					min-height="100"
				>
					<template v-slot:placeholder>
						<v-skeleton-loader type="image" />
					</template>
					<div class="fill-height d-flex justify-end">
						<v-btn @click="deleteImage(i)" icon class="ma-1">
							<v-icon color="red">mdi-delete-outline</v-icon>
						</v-btn>
					</div>
				</v-img>
			</v-col>
		</v-row>
		<v-row>
			<!-- <v-col cols="12">
				<v-file-input
					:label="$tc('image', 2)"
					show-size
					v-model="image"
					outlined
					dense
				/>
			</v-col> -->
			<v-col cols="12" md="6">
				<v-text-field
					:label="$t('nameInTurkmen')"
					v-model="dish.name_tm"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-text-field
					:label="$t('nameInRussian')"
					v-model="dish.name_ru"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-select
					:label="$tc('category', 2)"
					outlined
					:items="categories"
					dense
					:item-text="$i18n.locale === 'ru' ? 'name_ru' : 'name_tm'"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-select
					:label="$tc('ingredient', 2)"
					outlined
					:items="ingredients"
					dense
					multiple
					item-text="name"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-textarea
					:label="$t('descriptionInTurkmen')"
					v-model="dish.description_tm"
					outlined
					dense
					auto-grow
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-textarea
					:label="$t('descriptionInTurkmen')"
					v-model="dish.description_ru"
					outlined
					dense
					auto-grow
				/>
			</v-col>
			<v-btn
				@click="update"
				color="primary"
				block
				:disabled="isLoading"
				:loading="isLoading"
			>
				{{ $t('updateDish') }}
				<template v-slot:loader>
					<span class="custom-loader">
						<v-icon light>
							mdi-cached
						</v-icon>
					</span>
				</template>
			</v-btn>
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
			image: null,
			isLoading: false,
			alert: '',
			hasAlert: false,
		};
	},
	watch: {
		image(file) {
			if (file) {
				this.dish.images.push(file);
			}
		},
		id(val) {
			console.log(val);
		},
	},
	computed: {
		...mapState(['dish', 'categories', 'ingredients']),
	},
	methods: {
		...mapActions(['fetchDish', 'fetchCategories', 'fetchIngredients']),
		update() {
			const id = this.$route.params;
			this.isLoading = true;
			this.$axios
				.put(`/superadmin/dishes/${id}`, this.dish)
				.then(() => {
					this.isLoading = false;
					this.showAlert(this.$t('successfullyUpdated'));
					this.$router.go(-1);
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
		deleteImage(i) {
			this.$axios
				.delete(`/superadmin/dishes/${this.dish.id}/images/${i}`)
				.then(() => {
					this.showAlert(this.$t('deletedSuccessfully'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
	},
	created() {
		const { id } = this.$route.params;
		this.fetchDish(id);
		this.fetchCategories(id);
		this.fetchIngredients(id);
	},
};
</script>
