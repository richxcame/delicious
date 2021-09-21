import Vue from 'vue';
import Vuex from 'vuex';

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
		setRestaurant(state, restaraunt) {
			state.restaraunt = restaraunt;
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
				.get('/superadmin/ingredients')
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
				.get(`/superadmin/ingredients/${id}`)
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
	},
	modules: {},
});
