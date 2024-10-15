import axios from 'axios'
const state = {
    products: [],
    product: "",
    filter: null,
    loading: false
}
const getters = {
    getProducts: state => state.products,
    getProduct: state => state.product,
    getLoading: state => state.loading,
}
const mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_PRODUCT(state, product) {
        state.product = product
    },
    setFilter(state, filter) {
        state.filter = { ...filter };
    },
}
const actions = {
    async handleGetproducts({ commit }) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.get('products?limit=21', { params: { ...state.filter } });
            commit('SET_PRODUCTS', res.data)
        } catch (error) {
        } finally {
            commit('SET_LOADING', false);
        }
    },
    async handleAddproduct({commit}, payload){
        try {
            const res = await axios.post('products', payload);
            commit('SET_PRODUCTS', res.data)
        } catch (error) { 
            
        }
        finally {
            commit('SET_LOADING', false);
        }
    },
    async Getproduct({ commit }, id) {
        commit('SET_LOADING', true);
        try {
            const res = await axios.get(`products/${id}`);
            commit("SET_PRODUCT", res.data);
        } catch (error) { }
        finally {
            commit('SET_LOADING', false);
        }
    },
    async editproduct({ commit }, { productID, payload }) {
        try {
            const res = await axios.put(`products/${productID}`, payload)
        }
        catch (error) {
        }
        finally{
            commit('SET_LOADING', false);
        }
    },
    async Deleteproduct({ commit }, SelectproductID) {
        try {
            const res = await axios.delete(`products/${SelectproductID}`)
            const Updatedproduct = state.products.filter(product => product.id !== SelectproductID);
            commit("SET_PRODUCTS", Updatedproduct);
        }
        catch (error) {
            commit('SET_LOADING', false);
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