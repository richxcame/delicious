<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="restaurant.name_tm"
						outlined
						dense
						:label="$t('nameInTurkmen')"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="restaurant.name_ru"
						outlined
						dense
						:label="$t('nameInRussian')"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="restaurant.address_tm"
						outlined
						dense
						:label="$t('addressInTurkmen')"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-text-field
						v-model="restaurant.address_ru"
						outlined
						dense
						:label="$t('addressInRussian')"
					/>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field
						v-model="restaurant.shippingPrice"
						outlined
						dense
						:label="$t('shippingPrice')"
					/>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field
						v-model="restaurant.delivieryTime"
						outlined
						dense
						:label="$t('deliveryTime')"
					/>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field
						v-model="restaurant.workingStartTime"
						outlined
						dense
						:label="$t('workingStartTime')"
					/>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field
						v-model="restaurant.workingFinishTime"
						outlined
						dense
						:label="$t('workingFinishTime')"
					/>
				</v-col>
				<v-col cols="12">
					<v-file-input
						v-model="image"
						outlined
						dense
						:label="$t('addImages')"
						accept="image/*"
						show-size
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-textarea
						v-model="restaurant.description_tm"
						outlined
						dense
						:label="$t('descriptionInTurkmen')"
						auto-grow
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-textarea
						v-model="restaurant.description_ru"
						outlined
						dense
						:label="$t('descriptionInRussian')"
						auto-grow
					/>
				</v-col>
			</v-row>
			<v-btn
				color="primary"
				block
				height="45"
				@click="setRestaraunt"
				:loading="isLoading"
				:disabled="isLoading"
			>
				{{ $t('addRestaurant') }}
				<template v-slot:loader>
					<span class="custom-loader">
						<v-icon light>
							mdi-cached
						</v-icon>
					</span>
				</template>
			</v-btn>
			<v-data-table
				:headers="headers"
				:items="restaurants"
				class="elevation-2 mt-15"
				:search="search"
			>
				<template v-slot:top>
					<v-toolbar flat>
						<v-toolbar-title>{{ $tc('restaurant', 2) }}</v-toolbar-title>
						<v-divider class="mx-4" inset vertical></v-divider>
						<v-spacer />
						<v-text-field
							v-model="search"
							class="mt-6"
							outlined
							dense
							append-icon="mdi-magnify"
							label="Search from restaraunts any data"
						/>
					</v-toolbar>
				</template>
				<template v-slot:[`item.images`]="{ item }">
					<v-img :src="item.images[0]" height="100" width="100" class="ma-2">
						<template v-slot:placeholder>
							<v-skeleton-loader type="image" />
						</template>
					</v-img>
				</template>
				<template v-slot:[`item.shippingPrice`]="{ item }">
					{{ item.shippingPrice }} TMT
				</template>
				<template v-slot:[`item.actions`]="{ item }">
					<div>
						<v-btn icon class="mx-1" @click="updateRestaurant(item)">
							<v-icon color="primary">
								mdi-pencil
							</v-icon>
						</v-btn>
						<v-btn @click="deleteRestaurant(item)" icon class="mx-1">
							<v-icon color="red darken-2">
								mdi-delete
							</v-icon>
						</v-btn>
					</div>
				</template>
			</v-data-table>
		</v-container>
		<v-snackbar
			bottom
			timeout="7000"
			color="primary"
			dark
			elevation="7"
			right
			v-model="hasAlert"
			max-width="350"
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
			restaurant: {
				name_tm: '',
				name_ru: '',
				images: [],
				description_tm: '',
				description_ru: '',
				shippingPrice: '',
				workingStartTime: '',
				workingFinishTime: '',
			},
			name: '',
			image: null,
			headers: [
				{ text: this.$tc('image', 2), sortable: false, value: 'images' },
				{ text: this.$t('nameInTurkmen'), value: 'name_tm' },
				{
					text: this.$t('deliveryTime'),
					value: 'deliveryTime',
					align: 'center',
				},
				{
					text: this.$t('shippingPrice'),
					value: 'shippingPrice',
					align: 'center',
				},
				{
					text: this.$tc('action', 2),
					value: 'actions',
					sortable: false,
					align: 'end',
				},
			],
			items: [],
			search: '',
			isLoading: false,
			alert: '',
			hasAlert: false,
		};
	},
	watch: {
		image(img) {
			if (img) {
				this.restaurant.images.push(img);
			}
		},
	},
	computed: {
		...mapState(['restaurants']),
	},
	methods: {
		...mapActions(['fetchRestaurants']),
		setRestaraunt() {
			this.isLoading = true;
			this.$axios
				.post('/superadmin/restaraunts', this.restaurant)
				.then(() => {
					this.showAlert('Successfully created');
					this.reset();
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		reset() {
			this.name = '';
			this.image = null;
			this.images = [];
		},
		deleteRestaraunt({ id }) {
			this.$axios
				.delete(`/superadmin/restaraunts/${id}`)
				.then(() => {
					this.showAlert('Successfully deleted');
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
		updateRestaurant(restaurant) {
			this.$router.push(`/superadmin/restaurants/${restaurant.id}`);
		},
		deleteRestaurant(restaurant) {
			this.$axios
				.delete(`/superadmin/restaraunts/${restaurant.id}`)
				.then(() => {
					this.showAlert(this.$t('successfullyDeleted'));
					this.fetchCategories();
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
	},
	created() {
		this.fetchRestaurants();
	},
};
</script>
