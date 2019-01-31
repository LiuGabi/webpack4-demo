import Vue from 'vue';
import router from './router/';
import store from './store/';

import network from './network';

import filter from './kit/filter';
Vue.use(filter);

import "./static/css/index.less";

import ElementUI from 'element-ui';
Vue.use(ElementUI);

Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.productionTip = process.env.NODE_ENV === 'development';

/** 挂载 Vue 到 #app 元素 **/
new Vue({
	el: '#app',
    store,
    router
});