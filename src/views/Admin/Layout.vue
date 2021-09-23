<template>
	<v-app>
		<v-app-bar app elevate-on-scroll color="primary" dark clipped-left>
			<v-btn icon @click="mini = !mini" dark>
				<v-icon color="white">
					{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
				</v-icon>
			</v-btn>
			<v-toolbar-title>
				{{ companyName }}
			</v-toolbar-title>
			<v-spacer />
			<router-link to="/admin/me">
				<v-avatar>
					<v-img src="../../assets/admin.jpg" height="50" width="50"></v-img>
				</v-avatar>
			</router-link>
		</v-app-bar>

		<v-navigation-drawer
			app
			v-model="drawer"
			:mini-variant="mini"
			permanent
			clipped
		>
			<v-list dense>
				<v-list-item
					v-for="(link, i) in links"
					:key="i"
					link
					exact
					:to="link.to"
				>
					<v-list-item-icon>
						<v-icon color="primary">
							{{ link.icon }}
						</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							{{ link.name }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>

		<v-footer app inset>
			<v-spacer />
			Made with
			<v-icon color="red darken-1" class="mx-1">
				mdi-heart
			</v-icon>
			by <span class="font-italic mx-1">xCame</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			mini: true,
			links: [
				{ icon: 'mdi-home-outline', to: '/admin', name: this.$t('home') },
				{
					icon: 'mdi-food-apple-outline',
					to: '/admin/dishes',
					name: this.$tc('dish', 2),
				},
				{
					icon: 'mdi-animation-outline',
					to: '/admin/categories',
					name: this.$tc('category', 2),
				},
			],
		};
	},
	computed: {
		companyName() {
			return process.env.VUE_APP_COMPANY_NAME;
		},
	},
};
</script>
