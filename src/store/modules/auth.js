import axios from 'axios'
const state = {
    token: null,
    authentication: false,
}
const getters = {
    getToken: (state) => state.token,
    getAuthMessage: (state) => state.message,
    getAuthentication: (state) => state.authentication,
}
const mutations = {
    SET_DATA_TOKEN(state, token) {
        state.token = token
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token} `
    },
    SET_AUTHENTICATION(state, authentication) {
        state.authentication = authentication;
    },
    SET_CLEAR_DATA() {
        localStorage.removeItem('token')
        location.reload()
    }
}
const actions = {
    async handleLogin({ commit }, PAYLOAD) {
        try {
            const res = await axios.post('auth/login', PAYLOAD);
            commit('SET_DATA_TOKEN', res.data.token)
            commit('SET_AUTHENTICATION', true);
            localStorage.setItem('authentication', true)
        } catch (error) {
            commit('SET_AUTHENTICATION', false);
        }
        finally {
        }
    },
    async handlelogout({ commit }) {
        commit('SET_CLEAR_DATA'),
            localStorage.removeItem('token');
            localStorage.removeItem('authentication');
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}