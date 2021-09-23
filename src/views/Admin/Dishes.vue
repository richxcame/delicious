<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="dish.name_tm"
						outlined
						dense
						:label="$t('nameInTurkmen')"
					/>
					<!-- <v-text-field outlined v-model="price" dense label="Price" /> -->
					<!-- <v-file-input
						outlined
						show-size
						dense
						label="Set image"
						v-model="image"
					/> -->
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="dish.name_ru"
						outlined
						dense
						:label="$t('nameInRussian')"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="image"
						outlined
						dense
						:label="$t('addImages')"
						show-size
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
						:label="$t('descriptionInRussian')"
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
				:disabled="isLoading"
				:loading="isLoading"
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
								:placeholder="$t('searchAnyDataFromDishes')"
							/>
						</v-card-title>
						<v-data-table :headers="headers" :items="items" :search="search">
							<template v-slot:[`item.actions`]="{ item }">
								<v-icon small class="mr-2" color="primary">
									mdi-pencil
								</v-icon>
								<v-icon small color="red darken-2" @click="deleteDish(item)">
									mdi-delete
								</v-icon>
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
export default {
	data() {
		return {
			headers: [
				{ text: this.$t('nameInTurkmen'), value: 'name_tm' },
				{ text: this.$t('nameInRussian'), value: 'name_ru' },
				{ text: 'Price', value: 'price', align: 'center' },
				{ text: 'View Count', value: 'viewCount', align: 'center' },
				{ text: 'Liked', value: 'likeCount', align: 'center' },
				{ text: 'Discount', value: 'discount', align: 'center' },
				{ text: 'Actions', value: 'actions', align: 'end', sortable: false },
			],
			image: null,
			name: '',
			price: '',
			description: '',
			image: null,
			search: '',
			isLoading: false,
			isActive: true,
			hasAlert: false,
			alert: '',
			dish: {
				name_tm: '',
				name_ru: '',
				description_tm: '',
				description_ru: '',
				images: [],
			},
		};
	},
	watch: {
		image(file) {
			if (file) {
				this.dish.images.push(file);
			}
		},
	},
	methods: {
		setDish() {
			this.isLoading = true;
			this.$axios
				.post('/superadmin/dishes', this.dish)
				.then(() => {
					this.showAlert(this.$t('successfullyCreated'));
					this.reset();
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		deleteDish({ id }) {
			this.$axios
				.delete(`/superadmin/dishes/${id}`)
				.then(() => {
					this.showAlert(this.$t('deletedSuccessfully'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		reset() {
			this.dish.name_tm = '';
			this.dish.name_ru = '';
			this.dish.images = [];
			this.dish.description_tm = '';
			this.dish.description_ru = '';
		},
		showAlert(msg) {
			this.isLoading = false;
			this.alert = msg;
			this.hasAlert = true;
		},
	},
	created() {},
};
</script>
