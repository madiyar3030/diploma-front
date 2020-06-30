import api from '@/help/api'
import Cookies from 'js-cookie'


const type = Cookies.get('easy-type');


let state = {
    chats: [],
    messages: [],

    groups: [],
    group: [],
    group_info: []
}

let mutations = {
    SET_CHATS(state, payload) {
        state.chats = payload;
    },
    SET_MESSAGES(state, payload) {
        state.messages = payload;
    },


    SET_GROUPS(state, payload) {
        state.groups = payload;
    },
    SET_GROUP(state, payload) {
        state.group = payload;
    },
    SET_GROUP_INFO(state, payload){
        state.group_info = payload;
    }
}

let actions = {
    GET_CHATS: async({commit}, payload) => {
        try{
            commit('SET_CHATS', payload);
        } catch(error){
            console.log(error)
            const response = await api.post('/' + type + '/chats', payload)
            let nodes = [];
            console.log(response)
            try {
                nodes = response.data.result;
            } catch (error) {
                console.log(error.message)
            }
            commit('SET_CHATS', nodes);
        }
    },
    GET_MESSAGES: async({commit}, payload) => {
        console.log(payload)
        try{
            commit('SET_MESSAGES', payload);
        } catch(error){
            console.log(error)
            const response = await api.post('/' + type + '/chat', payload)
            .catch(e => console.log(e.response))
            let nodes = [];
            console.log(response)
            try {
                nodes = response.data.result;
            } catch (error) {
                console.log(error.message)
            }
            commit('SET_MESSAGES', nodes);
        }
    },
    GET_GROUPS: async({commit}, payload) => {
        try{
            commit('SET_GROUPS', payload);
        }
        catch(error){
            console.log(error)
            const response = await api.post('/driver/group/getUser', payload)
            let nodes = [];
            console.log(response)
            try {
                nodes = response.data.result;
            } catch (error) {
                console.log(error.message)
            }
            commit('SET_GROUPS', nodes);
        }
        
    },
    GET_GROUP: async({commit}, payload) => {
        try{
            commit('SET_GROUP', payload);
        } catch(error){
            console.log(error)
            commit('SET_GROUP', []);
        }
    },
    GET_GROUP_INFO: async({commit}, payload) => {
        const response = await api.get('/driver/group/get/' + payload)
        let nodes = [];
        console.log(response)
        try {
            nodes = response.data.result;
        } catch (error) {
            console.log(error.message)
        }
        commit('SET_GROUP_INFO', nodes);
    },
}

export default {
    state,
    mutations,
    actions
}