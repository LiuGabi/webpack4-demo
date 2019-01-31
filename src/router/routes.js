import Layout from '@/page/layout/index';

/** 首页 **/
import Home from '@/page/home/index';

/** 登录 **/
import Login from '@/page/account/index';
import ErrorPage from '@/page/404/index';

const config = [{
    path: '/',
    component: Layout,
    children: [{
        path: '/',
        name: 'home',
        meta: {
            isAuth: true,
            title: 'DEMO系统！ - DEMO',
            pageTitle: '欢迎来到DEMO系统！'
        },
        component: Home
    }]
}, {
	path: '/login',
	name: 'login',
    meta: {
        isAuth: false,
        title: '登录 - DEMO',
        pageTitle: '登录'
    },
    component: Login
}, {
	path: '*',
    meta: {
        isAuth: false,
        title: '404 - DEMO',
        pageTitle: '404'
    },
    component: ErrorPage
}];

export default config;