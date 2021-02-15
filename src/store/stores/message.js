import axios from "axios";
import {addHandler, sendMessage} from "@/util/ws";

const state = {
    messages: [],
    message: {},
    currentText: "",
};

const getters = {
    get: state => name => state[name],
};

const mutations = {
    set(state, {type, data}) {
        state[type] = data;
    },
    setMessage(state, {data}) {
        state.messages.push(data)
    },
    updateMessage(state, {idx, data}) {
        state.messages[idx] = {...state.messages[idx], ...data};
    }
};

const actions = {
    async updateAllMessages({commit}){
        await axios.get('http://192.168.1.217:8080/v1/messages').then(response => {
            commit('set',{type:"messages", data: response.data})
        });
    },
    async sendMessage(commit, payload){
        await sendMessage(payload);
    },
    listenMessages({commit, getters}){
        addHandler(data => {
            let messages = getters.get("messages");
            let elem = messages.find(el => el.id === data.id);
            if (elem == null) {
                commit('setMessage',{data: data})
            } else {
                let indexOf = messages.indexOf(elem);
                commit('updateMessage',{idx:indexOf, data: data})
            }
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}
