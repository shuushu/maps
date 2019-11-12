import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerMap = [
	{ name: 'detail', path: '/detail/:poi', component: '/Detail' },
	{ name: 'subdescript', path: '/subdescript', component: '/Subdescript', children: [
			{
				path: 'recommend',
				name: 'recommend',
				component: () => import(/* webpackChunkName: "recommend" */  '@/container/Recommend.vue'),
			},
			{
				path: 'userdetail',
				name: 'userdetail',
				component: () => import(/* webpackChunkName: "recommend" */  '@/container/UserDetail.vue'),
			},
		],
	},
	{ name: 'wish', path: '/wish', component: '/Wish' },
    { name: 'reviews', path: '/reviews', component: '/ReviewList' },
    { name: 'board', path: '/board', component: '/Board', children: [
            {
                name: 'boardlist',
                path: '/board/:name',
                component: () => import(/* webpackChunkName: "components" */ '@/components/BoardList.vue'),
                props: (route: any) => ({ boardName: route.params.name }),
            },
            {
                name: 'boardDetail',
                path: '/board/:name/:id',
                component: () => import(/* webpackChunkName: "components" */ '@/components/BoardDetail.vue'),
                props: (route: any) => ({ boardName: route.params.name, detailId: route.params.id }),
            },
        ],
    },
	{ name: 'sss', path: '/sss', redirect: { name: 'subdescript' }},
    { name: 'home', path: '/home', component: '/Home' },
];

const redirectRoute = [
    { path: '/', name: 'root', redirect: { name: 'subdescript' } },
	{ path: '*', redirect: { name: 'subdescript' }},
];

const routes = [...routerMap.map((route) => {
	const { name, path, component, children, redirect } = route;
	return {
		path,
		name,
		children,
		redirect,
		component: () => import(/* webpackChunkName: "container" */  `@/container${component}`),
    }
}), ...redirectRoute];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
})

export default router
