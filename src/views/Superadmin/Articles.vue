<template>
	<section>
		<v-row>
			<v-col cols="12" md="4">
				<v-text-field
					v-model="article.name_tm"
					outlined
					dense
					:label="$t('nameInTurkmen')"
				/>
			</v-col>
			<v-col cols="12" md="4">
				<v-text-field
					v-model="article.name_ru"
					outlined
					dense
					:label="$t('nameInRussian')"
				/>
			</v-col>
			<v-col cols="12" md="4">
				<v-file-input
					v-model="image"
					outlined
					dense
					accept="image/*"
					show-size
					:label="$t('addImage')"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-textarea
					outlined
					dense
					auto-grow
					:label="$t('descriptionInTurkmen')"
					v-model="article.description_tm"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-textarea
					outlined
					dense
					auto-grow
					:label="$t('descriptionInRussian')"
					v-model="article.description_ru"
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
			{{ $t('addArticle') }}
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
				{{ $tc('article') }}
				<v-spacer />
				<v-text-field
					v-model="search"
					:placeholder="$t('searchAnyDataFromArticles')"
					outlined
					dense
					append-icon="mdi-magnify"
				/>
			</v-card-title>
			<v-data-table :headers="headers" :items="articles" :search="search">
				<template v-slot:[`item.images`]="{ item }">
					<v-img
						height="100"
						width="100"
						contain
						:src="item.image"
						class="rounded-lg ma-1"
					>
						<v-skeleton-loader type="image" />
					</v-img>
				</template>
				<template v-slot:[`item.active`]="{ item }">
					<v-switch v-model="item.active" @change="updateArticle(item)" />
				</template>
				<template v-slot:[`item.actions`]="{ item }">
					<v-icon class="mr-2" color="primary" @click="showArticle(item)">
						mdi-pencil
					</v-icon>
					<v-icon color="red darken-2" @click="deleteArticle(item)">
						mdi-delete
					</v-icon>
				</template>
			</v-data-table>
		</v-card>
		<v-snackbar
			app
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
			article: {
				name_tm: '',
				name_ru: '',
				description_tm: '',
				description_ru: '',
				images: [],
			},
			headers: [
				{
					text: this.$tc('images', 1),
					value: 'images',
					sortable: false,
				},
				{ text: this.$t('nameInTurkmen'), value: 'name_tm' },
				{ text: this.$t('descriptionInTurkmen'), value: 'description_tm' },
				{ text: this.$t('status'), value: 'active', align: 'center' },
				{
					text: this.$tc('action', 2),
					value: 'actions',
					align: 'end',
					sortable: false,
				},
			],
			image: null,
			search: '',
			isLoading: false,
			hasAlert: false,
			alert: '',
		};
	},
	watch: {
		image(img) {
			if (img) {
				this.article.images.push(img);
			}
		},
	},
	computed: {
		...mapState(['articles']),
	},
	methods: {
		...mapActions(['fetchArticles']),
		setArticle() {
			this.isLoading = true;
			this.$axios
				.post('/superadmin/articles', this.article)
				.then(() => {
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
		reset() {
			this.article.name_tm = '';
			this.article.name_ru = '';
			this.article.images = [];
			this.article.description_tm = '';
			this.article.description_ru = '';
		},
		updateArticle(article) {
			this.$axios
				.put(`/superadmin/articles/${article.id}`, article)
				.then(() => {
					this.showAlert(this.$t('updatedSuccessfully'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		deleteArticle(article) {
			this.$axios
				.delete(`/superadmin/articles/${article.id}`)
				.then(() => {
					this.showAlert(this.$t('successfullyDeleted'));
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
		showArticle(article) {
			this.$router.push(`/superadmin/articles/${article.id}`);
		},
	},
	created() {
		this.fetchArticles();
	},
};
</script>
