<template>
	<section>
		<v-container>
			<v-row class="my-3">
				<v-col cols="12" md="6">
					<v-text-field
						outlined
						dense
						v-model="name"
						label="Category name"
						clearable
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-file-input
						v-model="image"
						dense
						label="Add category image"
						outlined
						show-size
					/>
				</v-col>
			</v-row>
			<v-btn
				block
				color="primary"
				height="45"
				:disabled="loading"
				:loading="loading"
				@click="setCategory"
			>
				add category
				<template v-slot:loader>
					<span class="custom-loader">
						<v-icon light>
							mdi-cached
						</v-icon>
					</span>
				</template>
			</v-btn>
			<v-card class="my-5">
				<v-card-title>
					Categories
					<v-spacer />
					<v-text-field
						v-model="search"
						outlined
						dense
						append-icon="mdi-magnify"
						placeholder="Search from categories any data"
					/>
				</v-card-title>
				<v-data-table
					:headers="headers"
					:items="items"
					:search="search"
				></v-data-table>
			</v-card>
		</v-container>
		<v-snackbar
			app
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
export default {
	data: () => ({
		name: '',
		image: null,
		loading: false,
		headers: [
			{ text: 'Name', value: 'name' },
			{ text: 'Actions', value: 'actions', align: 'end', sortable: false },
			{
				text: this.$tc('image', 2),
				value: 'image',
				align: 'center',
				sortable: false,
			},
		],
		items: [],
		search: '',
		alert: '',
		hasAlert: false,
	}),

	methods: {
		setCategory() {
			this.loading = true;
			this.$axios
				.post('/superadmin/categories', {
					name: this.name,
					image: this.image,
				})
				.then(res => {
					this.loading = false;
					this.showAlert('Successfuly created');
				})
				.catch(err => {
					this.loading = false;
					this.showAlert(err.message);
				});
		},

		showAlert(mes) {
			this.alert = mes;
			this.hasAlert = true;
		},
	},

	created() {
		this.$axios
			.get('/superadmin/categories')
			.then(res => {
				this.items = res.data.data;
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	},
};
</script>
