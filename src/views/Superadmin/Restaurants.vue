<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field v-model="name" outlined dense label="Restaraunt Name" />
				</v-col>
				<v-col cols="12" md="6">
					<v-file-input
						v-model="image"
						outlined
						dense
						label="Add images to restaraunt"
						accept="image/*"
						show-size
					/>
				</v-col>
			</v-row>
			<v-btn color="primary" block height="45" @click="setRestaraunt">
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
				<template v-slot:[`item.actions`]="{ item }">
					<div>
						<v-btn icon class="mx-1" @click="updateRestaurant(item)">
							<v-icon color="primary">
								mdi-pencil
							</v-icon>
						</v-btn>
						<v-btn @click="deleteCategory(item)" icon class="mx-1">
							<v-icon color="red darken-2">
								mdi-delete
							</v-icon>
						</v-btn>
					</div>
				</template>
			</v-data-table>
		</v-container>
		<v-snackbar
			absolute
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
			name: '',
			image: null,
			images: [],
			dialog: false,
			dialogDelete: false,
			headers: [
				{ text: this.$tc('image', 2), sortable: false, value: 'images' },
				{ text: this.$t('nameInTurkmen'), value: 'name_tm' },
				{
					text: this.$t('deliveryTime'),
					value: 'deliveryTime',
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
			alert: '',
			hasAlert: false,
			search: '',
		};
	},
	watch: {
		image(img) {
			if (img) {
				this.images.push(img);
			}
		},
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
	},
	computed: {
		...mapState(['restaurants']),
	},
	methods: {
		...mapActions(['fetchRestaurants']),
		setRestaraunt() {
			this.$axios
				.post('/superadmin/restaraunts', {
					name: this.name,
					images: this.images,
				})
				.then(res => {
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
		editItem(item) {
			this.dialog = true;
			this.$axios
				.put(`/superadmin/restaraunts/${item.id}`, item)
				.then(res => {
					this.showAlert('Succesfully updated');
					this.dialog = false;
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		deleteRestaraunt({ id }) {
			this.$axios
				.delete(`/superadmin/restaraunts/${id}`)
				.then(res => {
					this.showAlert('Successfully deleted');
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		close() {
			this.dialog = false;
		},
		closeDelete() {
			this.dialogDelete = false;
		},
		showAlert(msg) {
			this.alert = msg;
			this.hasAlert = true;
		},
		updateRestaurant(item) {
			this.$router.push(`/superadmin/restaurants/${item.id}`);
		},
		deleteRestaurant(item) {
			this.$axios
				.delete(`/superadmin/restaraunts/${item.id}`)
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
