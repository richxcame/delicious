<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field v-model="name" outlined dense label="Name" />
					<v-file-input
						v-model="image"
						outlined
						dense
						accept="image/*"
						show-size
						label="Add image"
					/>
				</v-col>
				<v-col cols="12" md="6">
					<v-textarea
						outlined
						dense
						label="Description"
						v-model="description"
					/>
				</v-col>
			</v-row>
			<v-btn
				block
				height="45"
				color="primary"
				:disabled="isLoading"
				:loading="isLoading"
				@click="setArticle"
			>
				Add article
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
					Articles
					<v-spacer />
					<v-text-field
						v-model="search"
						placeholder="Search from articles any data"
						outlined
						dense
						append-icon="mdi-magnify"
					/>
				</v-card-title>
				<v-data-table :headers="headers" :items="items" :search="search">
					<template v-slot:[`item.active`]="{ item }">
						<v-switch
							v-model="item.active"
							@change="updateArticle(item)"
						></v-switch>
					</template>
					<template v-slot:[`item.actions`]="{ item }">
						<v-icon class="mr-2" color="primary" @click="updateArticle(item)">
							mdi-pencil
						</v-icon>
						<v-icon color="red darken-2" @click="deleteArticle(item)">
							mdi-delete
						</v-icon>
					</template>
				</v-data-table>
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
		description: '',
		image: null,
		images: [],
		headers: [
			{ text: 'Name', value: 'name' },
			{ text: 'Description', value: 'description' },
			{ text: 'images', value: 'images', align: 'center', sortable: false },
			{ text: 'Status', value: 'active', align: 'center' },
			{ text: 'Actions', value: 'actions', align: 'end', sortable: false },
		],
		items: [],
		search: '',
		isLoading: false,
		hasAlert: false,
		alert: '',
	}),

	watch: {
		image(img) {
			if (img) {
				this.images.push(img);
			}
		},
	},

	methods: {
		setArticle() {
			this.isLoading = true;
			this.$axios
				.post('/superadmin/articles', {
					name: this.name,
					description: this.description,
					images: this.images,
				})
				.then(res => {
					this.isLoading = false;
					this.reset();
					this.alert = 'Successfully created';
					this.hasAlert = true;
				})
				.catch(err => {
					this.isLoading = false;
					this.alert = err.message;
					this.hasAlert = true;
				});
		},

		updateArticle(item) {
			this.$axios
				.put(`/superadmin/articles/${item.id}`, item)
				.then(res => {
					this.alert = 'Successfully updated';
					this.hasAlert = true;
				})
				.catch(err => {
					this.alert = err.message;
					this.hasAlert = true;
				});
		},

		reset() {
			this.name = '';
			this.description = '';
			this.images = [];
			this.image = null;
		},

		deleteArticle({ id }) {
			this.$axios
				.delete(`/superadmin/articles/${id}`)
				.then(res => {
					this.$router.go();
				})
				.catch(err => {
					this.alert = err.message;
					this.hasAlert = true;
				});
		},
	},
	created() {
		this.$axios
			.get('/superadmin/articles')
			.then(res => {
				this.items = res.data.data;
				console.log(this.items);
			})
			.catch(err => {
				console.log(err);
			});
	},
};
</script>
