import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/superadmin',
		component: () => import('../views/Superadmin/Layout.vue'),
		children: [
			{ path: '', component: () => import('../views/Superadmin/Home.vue') },
			{
				path: 'orders',
				component: () => import('../views/Superadmin/Orders.vue'),
			},
			{
				path: 'orders/:id',
				component: () => import('../views/Superadmin/Order.vue'),
			},
			{
				path: 'restaurants',
				component: () => import('../views/Superadmin/Restaurants.vue'),
			},
			{
				path: 'restaurants/:id',
				component: () => import('../views/Superadmin/Restaurant.vue'),
			},
			{
				path: 'dishes',
				component: () => import('../views/Superadmin/Dishes.vue'),
			},
			{
				path: 'dishes/:id',
				component: () => import('../views/Superadmin/Dish.vue'),
			},
			{
				path: 'users',
				component: () => import('../views/Superadmin/Users.vue'),
			},
			{
				path: 'categories',
				component: () => import('../views/Superadmin/Categories.vue'),
			},
			{
				path: 'categories/:id',
				component: () => import('../views/Superadmin/Category.vue'),
			},
			{
				path: 'articles',
				component: () => import('../views/Superadmin/Articles.vue'),
			},
			{ path: 'me', component: () => import('../views/Superadmin/Me.vue') },
		],
	},
	{
		path: '/admin',
		component: () => import('../views/Admin/Layout.vue'),
		children: [
			{ path: '', component: () => import('../views/Admin/Home.vue') },
			{ path: 'orders', component: () => import('../views/Admin/Orders.vue') },
			{
				path: 'orders/:id',
				component: () => import('../views/Admin/Order.vue'),
			},
			{ path: 'dishes', component: () => import('../views/Admin/Dishes.vue') },
			{
				path: 'dishes/:id',
				component: () => import('../views/Admin/Dishe.vue'),
			},
			{
				path: 'categories',
				component: () => import('../views/Admin/Categories.vue'),
			},
		],
	},
	{
		path: '*',
		component: NotFound,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
