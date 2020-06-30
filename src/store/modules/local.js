import Cookies from 'js-cookie'
let state = {
    auth: false,
    token: false,
    type: false
}

let mutations = {
    SET_AUTH(state, payload) {
        state.auth = payload;
    },
    SET_TOKEN(state, payload) {
        state.token = payload;
    },
    SET_TYPE(state, payload) {
        state.type = payload;
    }
}

let actions = {
    GET_AUTH: async({commit}, payload) => {
        if(payload) commit('SET_AUTH', payload)
        else {
            let auth = Cookies.get('easy-auth')
            let token = Cookies.get('easy-token')
            if(auth && token) commit('SET_AUTH', true)
            else commit('SET_AUTH', false)
        }
    },
    GET_TOKEN: async({commit}, payload) => {
        if(payload) commit('SET_TOKEN', payload)
        else {
            let token = Cookies.get('easy-token')
            if(token) commit('SET_TOKEN', token)
            else commit('SET_TOKEN', false)
        }
    },
    GET_TYPE: async({commit}, payload) => {
        if(payload) commit('SET_TYPE', payload)
        else {
            let type = Cookies.get('easy-type')
            if(type) commit('SET_TYPE', type)
            else commit('SET_TYPE', false)
        }
    },
}

export default {
    state,
    mutations,
    actions
}