import api from '@/help/api'

let state = {
    lists: [],
    order: [],
    offers: [],
    client: [],
    driver: [],
    active: []
}

let mutations = {
    SET_LISTS(state, payload){
        state.lists = payload;
    },
    SET_ORDER(state, payload){
        state.order = payload;
    },
    SET_OFFERS(state, payload){
        state.offers = payload;
    },
    SET_CLIENT(state, payload){
        state.client = payload;
    },
    SET_DRIVER(state, payload){
        state.driver = payload;
    },
    SET_ACTIVE(state, payload){
        state.active = payload;
    },

}

let actions = {
    GET_LISTS: async({commit}, payload) => {
        const response = await api.post('/order/list', payload)
        .catch(e => console.log(e.response))
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
            nodes = [];
        }
        commit('SET_LISTS', nodes)
    },
    GET_ORDER: async({commit}, payload) => {
        let url = '';
        const response = await api.get('/order/' + payload.type + '/get/' + payload.id)
        .catch(e => console.log(e.response))
        let nodes = [];
        try {
            nodes = response.data.result
            console.log(nodes)
        } catch (error) {
            console.log(nodes)
            console.log(error.message)
        }
        commit('SET_ORDER', nodes)
    },
    GET_OFFERS: async({commit}, payload) => {
        let url = '';

        const response = await api.get('/order/' + payload.type + '/offers/' + payload.id, payload)
        .catch(e => console.log(e.response))
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
            nodes = [];
        }
        commit('SET_OFFERS', nodes)
    },
    GET_CLIENT: async({commit}, payload) => {
        const response = await api.get('/get/client/' + payload)
        .catch(e => console.log(e.response))
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
            nodes = [];
        }
        commit('SET_CLIENT', nodes)
    },
    GET_DRIVER: async({commit}, payload) => {
        const response = await api.get('/get/driver/' + payload)
        .catch(e => console.log(e.response))
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
            nodes = [];
        }
        commit('SET_DRIVER', nodes)
    },
    GET_ACTIVE: async({commit}, payload) => {
        const response = await api.post('/order/active/' + payload.type, payload)
        .catch(e => console.log(e.response))
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
            nodes = [];
        }
        commit('SET_ACTIVE', nodes)
    },

}

export default {
    state,
    mutations,
    actions
}