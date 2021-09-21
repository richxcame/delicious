<template>
	<v-app>
		<v-app-bar app elevate-on-scroll color="primary" dark clipped-left>
			<v-btn icon @click="mini = !mini" dark>
				<v-icon color="white">
					{{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
				</v-icon>
			</v-btn>
			<v-toolbar-title>
				DATLY
			</v-toolbar-title>
			<v-spacer />
			<router-link to="/superadmin/me">
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
			<v-container>
				<router-view :key="$route.fullPath" />
			</v-container>
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
	data: () => ({
		drawer: false,
		mini: true,
		links: [
			{ icon: 'mdi-home-outline', to: '/superadmin/', name: 'Home' },
			{
				icon: 'mdi-home-group',
				to: '/superadmin/restaraunts',
				name: 'Restaraunts',
			},
			{ icon: 'mdi-food', to: '/superadmin/dishes', name: 'Dishes' },
			{
				icon: 'mdi-animation-outline',
				to: '/superadmin/categories',
				name: 'Categories',
			},
			{ icon: 'mdi-carrot', to: '/superadmin/articles', name: 'Articles' },
			{
				icon: 'mdi-account-group-outline',
				to: '/superadmin/users',
				name: 'Users',
			},
			{ icon: 'mdi-account-circle-outline', to: '/superadmin/me', name: 'Me' },
		],
	}),
};
</script>
