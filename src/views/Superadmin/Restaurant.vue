<template>
	<section>
		<v-row>
			<v-col
				cols="12"
				sm="6"
				md="4"
				lg="3"
				v-for="(image, i) in restaurant.images"
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
			<v-col cols="12" md="6">
				<v-text-field
					:label="$t('nameInTurkmen')"
					v-model="restaurant.name_tm"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-text-field
					:label="$t('nameInRussian')"
					v-model="restaurant.name_ru"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-text-field
					:label="$t('addressInTurkmen')"
					v-model="restaurant.address_tm"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-text-field
					:label="$t('addressInRussian')"
					v-model="restaurant.address_ru"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="3">
				<v-text-field
					:label="$t('rating')"
					v-model="restaurant.rating"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="3">
				<v-text-field
					:label="$t('numberOfRatings')"
					v-model="restaurant.numRatings"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="3">
				<v-text-field
					:label="$t('workingStartTime')"
					v-model="restaurant.workingStartTime"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="3">
				<v-text-field
					:label="$t('workingFinishTime')"
					v-model="restaurant.workingFinishTime"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-text-field
					:label="$t('deliveryTime')"
					v-model="restaurant.deliveryTime"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-text-field
					:label="$t('deliveryTime')"
					v-model="restaurant.shippingPrice"
					color="primary"
					outlined
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-textarea
					:label="$t('descriptionInTurkmen')"
					v-model="restaurant.description_tm"
					color="primary"
					outlined
					auto-grow
					dense
				/>
			</v-col>
			<v-col cols="12" md="6">
				<v-textarea
					:label="$t('descriptionInRussian')"
					v-model="restaurant.description_ru"
					color="primary"
					outlined
					auto-grow
					dense
				/>
			</v-col>
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
			alert: '',
			hasAlert: false,
		};
	},
	computed: {
		...mapState(['restaurant']),
	},
	methods: {
		...mapActions(['fetchRestaurant']),
		deleteImage(i) {
			const { id } = this.$route.params;
			this.$axios
				.delete(`/superadmin/restaraunts/${id}/images/${i}`)
				.then(() => {
					this.showAlert(this.$t('deletedSuccessfully'));
				})
				.catch(err => {
					this.showAlert(err.message);
				});
		},
		showAlert(mes) {
			this.alert = mes;
			this.hasAlert = true;
		},
	},
	created() {
		const id = this.$route.params.id;
		this.fetchRestaurant(id);
	},
};
</script>
