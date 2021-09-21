import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    category: {},
    dishes: [],
    dish: {},
    ingredients: [],
    ingredient: {},
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
  },
  actions: {
    fetchCategories({ commit }) {
      axios.get('/superadmin/categories')
        .then(res => {
          commit('setCategories', res.data.data);
          return res.data.data;
        })
        .catch(err => {
          commit('setCategories', []);
          return err;
        });
    },
    fetchCategory({ commit }, id) {
      axios.get(`/superadmin/categories/${id}`)
        .then(res => {
          commit('setCategory', res.data.data)
          return res.data.data;
        })
        .catch(err => {
          commit('category', {});
          return err;
        });
    },
    fetchDishes({ commit }) {
      axios.get('/superadmin/dishes')
        .then(res => {
          commit('setDishes', res.data.data);
          return res.data.data;
        })
        .catch(err => {
          commit('setDishes', []);
          return err;
        });
    },
    fetchDish({ commit }, id) {
      axios.get(`/superadmin/dishes/${id}`)
        .then(res => {
          commit('setDish', res.data.data);
          return res;
        })
        .catch(err => {
          return err;
        });
    },
    fetchIngredients({ commit }) {
      axios.get('/superadmin/ingredients')
        .then(res => {
          commit('setIngredients', res.data.data)
          return res.data.data;
        })
        .catch(err => {
          commit('setIngredients', []);
          return err;
        })
    },
    fetchIngredient({ commit }, id) {
      axios.get(`/superadmin/ingredients/${id}`)
        .then(res => {
          commit('setIngredient', res.data.data);
          return res.data.data;
        })
        .catch(err => {
          commit('setIngredient', {})
          return err;
        });
    },
  },
  modules: {
  }
})
