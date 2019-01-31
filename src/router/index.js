import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import {isEmpty, clearLoginCache} from '@/kit/common';


/** 引入 **/
import routes from './routes.js';

const router = new VueRouter({
	strict: process.env.NODE_ENV === 'development',
	mode: 'history',
	routes,
	linkActiveClass: 'lxgs-active',
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
});

router.beforeEach((to, from, next) => {

    /** 文档 title **/
    document.title = to.meta.title;

    /** 验证身份 **/
    let isAuth = to.meta.isAuth;
    let token = localStorage.accesstoken && localStorage.accesstoken.length > 10 ? localStorage.accesstoken : false;
    
    let permissions = JSON.parse(localStorage.permissions ? localStorage.permissions : '[]');
   	let hasPermission = permissions.indexOf('AGENT_SYSTEM') > -1 || permissions.indexOf('KF_SYSTEM') > -1;

    if(isAuth) {
		
  		if (token && hasPermission) {
  			   next();           
  		} else {

          clearLoginCache();

          next({
              name: 'login',
              query: { redirect: to.fullPath }
          });
  		}

  	} else {
        	/** 已经登录则重定向登录页到首页 **/
        	if (to.name === 'login' && token && hasPermission) {
              next({name: 'home'});
      		} else {
              next();
      		}
  	}
});

export default router;