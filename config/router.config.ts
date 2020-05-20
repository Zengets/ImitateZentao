export default [
  {
    path: '/login',
    component: '@/pages/User/Login',
  },
  {
    path: '/fogot',
    component: '@/pages/User/Fogot',
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home', //系统首页
        component: '@/pages/Homepage/index',
      },
    ],
  },
];
