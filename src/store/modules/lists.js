import api from '@/help/api'
import Cookies from 'js-cookie'

let state = {
    transports: [],           //Услуги спец
    transports2: [],
    transport_types: [],
    materials: [],
    material_types: [],
    count_types: [],
    cities: [],
    options: [],
    regions: [],
    api_token: [],
}

let mutations = {
    SET_TRANSPORTS(state, payload){
        state.transports = payload;
    },
    SET_TRANSPORTS2(state, payload){
        state.transports2 = payload;
    },
    SET_TRANSPORT_TYPES(state, payload){
        state.transport_types = payload;
    },
    SET_MATERIALS(state, payload){
        state.materials = payload;
    },
    SET_MATERIAL_TYPES(state, payload){
        state.material_types = payload;
    },
    SET_COUNT_TYPES(state, payload){
        state.count_types = payload;
    },
    SET_CITIES(state, payload){
        state.cities = payload;
    },
    SET_OPTIONS(state, payload){
        state.options = payload;
    },
    SET_REGIONS(state, payload){
        state.regions = payload;
    },
    SET_API_TOKEN(state, payload){
        state.api_token = payload;
    },

}

let actions = {
    GET_TRANSPORTS: async({commit}) => {
        const response = await api.get('/get/transports/service_orders')
        let nodes = [];
        try {
            console.log(response)
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_TRANSPORTS', nodes)
    },
    GET_TRANSPORTS2: async({commit}) => {
        const response = await api.get('/get/transports/shipping_orders')
        let nodes = [];
        try {
            console.log(response)
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_TRANSPORTS2', nodes)
    },
    GET_TRANSPORT_TYPES: async({commit}) => {
        const response = await api.get('/get/transport/1')
        let nodes = [];
        try {
            console.log(response)
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_TRANSPORT_TYPES', nodes)
    },
    GET_MATERIALS: async({commit}) => {
        const response = await api.get('/get/materials')
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_MATERIALS', nodes)
    },
    GET_MATERIAL_TYPES: async({commit}) => {
        const response = await api.get('/get/material/1')
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_MATERIAL_TYPES', nodes)
    },
    GET_COUNT_TYPES: async({commit}) => {
        const response = await api.get('/get/count_types')
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_COUNT_TYPES', nodes)
    },
    GET_CITIES: async({commit}) => {
        const response = await api.get('/get/cities/1')
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_CITIES', nodes)
    },
    GET_OPTIONS: async({commit}) => {
        const response = await api.get('/get/options')
        let nodes = [];
        try {
            nodes = response.data
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_OPTIONS', nodes)
    },
    GET_REGIONS: async({commit}) => {
        const response = await api.get('/get/regions')
        console.log(response)
        let nodes = [];
        try {
            nodes = response.data.result
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_REGIONS', nodes)
    },
    GET_API_TOKEN: async({commit}, payload) => {
        const response = await api.post('/' + Cookies.get('easy-type') + '/login', {
            token: payload
        })
        .catch(e => console.log(e.response))

        let nodes = [];
        try {
            nodes = response.data.result
            console.log(nodes)
        } catch (error) {
            console.log(nodes)
            console.log(error.message)
        }
        commit('SET_API_TOKEN', nodes)
    },
}

export default {
    state,
    mutations,
    actions
}