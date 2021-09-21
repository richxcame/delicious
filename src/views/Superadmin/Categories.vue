<template>
	<section>
		<v-container>
			<v-row class="mt-3">
				<v-col cols="12" md="4">
					<v-text-field
						outlined
						dense
						v-model="category.name_tm"
						:label="$t('nameInTurkmen')"
						clearable
					/>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						outlined
						dense
						v-model="category.name_ru"
						:label="$t('nameInRussian')"
						clearable
					/>
				</v-col>
				<v-col cols="12" md="4">
					<v-file-input
						v-model="category.image"
						dense
						:label="$t('categoryImage')"
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
				class="mb-10"
			>
				{{ $t('addCategory') }}
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
					{{ $tc('category', 2) }}
					<v-spacer />
					<v-text-field
						v-model="search"
						outlined
						dense
						append-icon="mdi-magnify"
						placeholder="Search from categories any data"
					/>
				</v-card-title>
				<v-data-table :headers="headers" :items="categories" :search="search">
					<template v-slot:[`item.image`]="{ item }">
						<div>
							<v-img
								:src="item.image"
								contain
								height="80"
								width="80"
								class="ma-1"
							>
								<template v-slot:placeholder>
									<v-skeleton-loader type="image" />
								</template>
							</v-img>
						</div>
					</template>
					<template v-slot:[`item.dishCount`]="{ item }">
						<span class="success--text">{{ item.dishCount.active }}</span>
						:
						<span class="red--text">{{ item.dishCount.inActive }}</span>
					</template>
					<template v-slot:[`item.actions`]="{ item }">
						<div>
							<v-btn icon class="mx-1" @click="updateCategory(item)">
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
			</v-card>
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
			category: {
				name_tm: '',
				name_ru: '',
				image: null,
			},
			headers: [
				{ text: this.$t('image'), value: 'image', sortable: false },
				{ text: this.$t('nameInTurkmen'), value: 'name_tm' },
				{ text: this.$t('nameInRussian'), value: 'name_ru' },
				{ text: this.$t('dishCount'), value: 'dishCount', align: 'center' },
				{
					text: this.$tc('action', 2),
					value: 'actions',
					align: 'end',
					sortable: false,
				},
			],
			items: [],
			search: '',
			loading: false,
			alert: '',
			hasAlert: false,
		};
	},
	computed: {
		...mapState(['categories']),
	},
	methods: {
		...mapActions(['fetchCategories']),
		setCategory() {
			this.loading = true;
			this.$axios
				.post('/superadmin/categories', this.category)
				.then(res => {
					this.showAlert(this.$t('successfullyCreated'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		updateCategory(category) {
			this.$router.push(`/superadmin/categories/${category.id}`);
		},
		deleteCategory(category) {
			this.$axios
				.delete(`/superadmin/categories/${category.id}`)
				.then(() => {
					this.showAlert(this.$t('successfullyDeleted'));
					this.fetchCategories();
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		showAlert(mes) {
			this.loading = false;
			this.alert = mes;
			this.hasAlert = true;
		},
	},
	created() {
		this.fetchCategories();
	},
};
</script>
