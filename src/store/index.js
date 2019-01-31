import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Account from './account';

export default new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    modules: {
    	Account
    }
})