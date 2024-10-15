import axios from 'axios'
const state = {
    categories: []
}
const getters = {
    getcategories: state => state.categories
}
const mutations = {
    SET_categories(state, categories) {
        state.categories = categories
    }
}
const actions = {
    async handleGetcategories({ commit }) {
        try {
            const res = await axios.get('products/categories');
            commit('SET_categories', res.data)
        } catch (error) {
        } finally {
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}