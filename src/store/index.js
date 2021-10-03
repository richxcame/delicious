import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		categories: [],
		category: {},
		dishes: [],
		dish: {},
		ingredients: [],
		ingredient: {},
		restaurants: [],
		restaurant: {},
		articles: [],
		article: {},
		users: [],
		user: {},
		orders: [],
		order: {},
		restaurantOrders: [],
		restaurantOrder: {},
		me: {},
		totalUsers: 0,
	},
	mutations: {
		setCategories(state, categories) {
			state.categories = categories;
		},
		setCategory(state, category) {
			state.category = category;
		},
		setDishes(state, dishes) {
			state.dishes = dishes;
		},
		setDish(state, dish) {
			state.dish = dish;
		},
		setIngredients(state, ingredients) {
			state.ingredients = ingredients;
		},
		setIngredient(state, ingredient) {
			state.ingredient = ingredient;
		},
		setRestaurants(state, restaurants) {
			state.restaurants = restaurants;
		},
		setRestaurant(state, restaurant) {
			state.restaurant = restaurant;
		},
		setArticles(state, articles) {
			state.articles = articles;
		},
		setArticle(state, article) {
			state.article = article;
		},
		setUsers(state, users) {
			state.users = users;
		},
		setUser(state, user) {
			state.user = user;
		},
		setOrders(state, orders) {
			state.orders = orders;
		},
		setOrder(state, order) {
			state.order = order;
		},
		setRestaurantOrders(state, restaurantOrders) {
			state.restaurantOrders = restaurantOrders;
		},
		setRestaurantOrder(state, restaurantOrder) {
			state.restaurantOrder = restaurantOrder;
		},
		setMe(state, me) {
			state.me = me;
		},
		SET_TOTAL_USER_NUMBER(state, totalUsers) {
			state.totalUsers = totalUsers;
		},
	},
	actions: {
		fetchCategories({ commit }) {
			axios
				.get('/superadmin/categories')
				.then(res => {
					commit('setCategories', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchCategory({ commit }, id) {
			axios
				.get(`/superadmin/categories/${id}`)
				.then(res => {
					commit('setCategory', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchDishes({ commit }) {
			axios
				.get('/superadmin/dishes')
				.then(res => {
					commit('setDishes', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchDish({ commit }, id) {
			axios
				.get(`/superadmin/dishes/${id}`)
				.then(res => {
					commit('setDish', res.data.data);
					return res;
				})
				.catch(err => {
					return err;
				});
		},
		fetchIngredients({ commit }) {
			axios
				.get('/superadmin/ingridients')
				.then(res => {
					commit('setIngredients', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchIngredient({ commit }, id) {
			axios
				.get(`/superadmin/ingridients/${id}`)
				.then(res => {
					commit('setIngredient', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchRestaurants({ commit }) {
			axios
				.get('/superadmin/restaraunts')
				.then(res => {
					commit('setRestaurants', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchRestaurant({ commit }, id) {
			axios
				.get(`/superadmin/restaraunts/${id}`)
				.then(res => {
					commit('setRestaurant', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchArticles({ commit }) {
			axios
				.get(`/superadmin/articles`)
				.then(res => {
					commit('setArticles', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchArticle({ commit }, id) {
			axios
				.get(`/superadmin/articles/${id}`)
				.then(res => {
					commit('setArticle', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchUsers({ commit }, { limit, offset }) {
			axios
				.get(`/superadmin/users?offset=${offset}&limit=${limit}`)
				.then(res => {
					commit('SET_TOTAL_USER_NUMBER', res.data.result);
					commit('setUsers', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchUser({ commit }, id) {
			axios
				.get(`/superadmin/users/${id}`)
				.then(res => {
					commit('setUser', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchOrders({ commit }) {
			axios
				.get(`/superadmin/orders`)
				.then(res => {
					commit('setOrders', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchOrder({ commit }, id) {
			axios
				.get(`/superadmin/orders/${id}`)
				.then(res => {
					commit('setOrder', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchRestaurantOrders({ commit }) {
			axios
				.get('/admin/orders')
				.then(res => {
					commit('setRestaurantOrders', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchRestaurantOrder({ commit }, id) {
			axios
				.get(`/admin/orders/${id}`)
				.then(res => {
					commit('setRestaurantOrder', res.data.data);
					return res.data.data;
				})
				.catch(err => {
					return err;
				});
		},
		fetchMe({ commit }) {
			axios
				.get('/auth/profile')
				.then(res => {
					commit('setMe', res.data.data);
				})
				.catch(err => {
					return err;
				});
		},
	},
	plugins: [createPersistedState()],
	modules: {},
});
