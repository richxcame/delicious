<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="12" md="4">
					<v-text-field
						v-model="dish.name_tm"
						outlined
						dense
						:label="$t('nameInTurkmen')"
					/>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						v-model="dish.name_ru"
						outlined
						dense
						:label="$t('nameInRussian')"
					/>
				</v-col>
				<v-col cols="12" md="4">
					<v-file-input
						outlined
						show-size
						dense
						label="Set image"
						v-model="image"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						outlined
						v-model="dish.price"
						dense
						:label="$t('price')"
						:placeholder="'4.99'"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						outlined
						v-model="dish.discount"
						dense
						:label="$t('discount')"
						:placeholder="'4.57'"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-select
						outlined
						v-model="dish.category"
						:items="handleCategories"
						dense
						:label="$tc('category', 1)"
						:menu-props="{ bottom: true, offsetY: true }"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-select
						outlined
						v-model="dish.ingredients"
						dense
						:label="$tc('ingredient', 2)"
						:menu-props="{ bottom: true, offsetY: true }"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-textarea
						v-model="dish.description_tm"
						:label="$t('descriptionInTurkmen')"
						outlined
						dense
						auto-grow
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-textarea
						v-model="dish.description_ru"
						:label="$t('descriptionInTurkmen')"
						outlined
						dense
						auto-grow
					/>
				</v-col>
			</v-row>
			<v-btn
				block
				color="primary"
				height="45"
				:disabled="loading"
				:loading="loading"
				@click="setDish"
			>
				{{ $t('addDish') }}
				<template v-slot:loader>
					<span class="custom-loader">
						<v-icon light>
							mdi-cached
						</v-icon>
					</span>
				</template>
			</v-btn>
			<v-row class="my-5">
				<v-container>
					<v-card>
						<v-card-title>
							{{ $tc('dish', 2) }}
							<v-spacer />
							<v-text-field
								single-line
								append-icon="mdi-magnify"
								v-model="search"
								dense
								outlined
								:label="$t('search')"
								:placeholder="$t('search')"
							/>
						</v-card-title>
						<v-data-table :headers="headers" :items="dishes" :search="search">
							<template v-slot:[`item.images`]="{ item }">
								<v-img
									height="75"
									width="75"
									contain
									class="my-1"
									:src="item.image"
								>
									<template v-slot:placeholder>
										<v-skeleton-loader type="image" />
									</template>
								</v-img>
							</template>
							<template v-slot:[`item.active`]="{ item }">
								<div class="d-flex align-center justify-center">
									<v-switch v-model="item.active" class="mx-auto" disabled />
								</div>
							</template>
							<template v-slot:[`item.actions`]="{ item }">
								<div class="d-flex">
									<v-btn icon @click="edit(item)">
										<v-icon color="primary">
											mdi-pencil
										</v-icon>
									</v-btn>
									<v-btn icon>
										<v-icon color="red darken-2">
											mdi-delete
										</v-icon>
									</v-btn>
								</div>
							</template>
						</v-data-table>
					</v-card>
				</v-container>
			</v-row>
		</v-container>
		<v-snackbar
			app
			bottom
			right
			color="primary"
			dark
			elevation="7"
			timeout="7000"
			v-model="hasAlert"
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
			headers: [
				{ text: 'Images', value: 'images' },
				{ text: this.$t('nameInTurkmen'), value: 'name_tm' },
				// { text: this.$t("nameInRussian"), value: "name_ru" },
				// { text: this.$t("descriptionInTurkmen"), value: "description_tm" },
				// { text: this.$t("descriptionInRussian"), value: "description_ru" },
				{ text: 'Price', value: 'price', align: 'center' },
				{ text: 'Discount', value: 'discount', align: 'center' },
				{ text: 'View Count', value: 'viewCount', align: 'center' },
				// { text: "Liked", value: "likeCount", align: "center" },
				{ text: 'Active', value: 'active', align: 'center', sortable: false },
				{ text: 'Actions', value: 'actions', align: 'end', sortable: false },
			],
			dish: {
				name_tm: '',
				name_ru: '',
				description_tm: '',
				description_ru: '',
				images: [],
				discount: null,
			},
			items: [],
			image: null,
			name: '',
			price: '',
			description: '',
			search: '',
			loading: false,
			isActive: true,
			hasAlert: false,
			alert: '',
		};
	},
	watch: {
		image(val) {
			if (val) {
				this.dish.images.push(val);
			}
		},
	},
	computed: {
		...mapState(['categories', 'dishes']),
		handleCategories() {
			console.log(this.categories);
			return this.categories.map(category => {
				return category.name_tm;
			});
		},
	},
	methods: {
		...mapActions(['fetchDishes', 'fetchCategories']),
		setDish() {
			this.loading = true;
			this.$axios
				.post('/superadmin/dishes', {
					name: this.name,
					price: this.price,
					description: this.description,
					images: this.images,
				})
				.then(res => {
					this.showAlert('Successfully created');
					this.loading = false;
					this.reset();
				})
				.catch(err => {
					this.loading = false;
					this.showAlert(err.message);
				});
		},
		edit(dish) {
			this.$router.push(`/superadmin/dishes/${dish.id}`);
		},
		deleteDish({ id }) {
			this.$axios
				.delete(`/superadmin/dishes/${id}`)
				.then(() => {
					this.showAlert(this.$t('successfullyDeleted'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		reset() {
			this.name = '';
			this.description = '';
			this.image = null;
			this.price = '';
		},
		showAlert(msg) {
			this.alert = msg;
			this.hasAlert = true;
		},
	},
	created() {
		this.fetchDishes();
		this.fetchCategories();
	},
};
</script>
