export default [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: '@/pages/User/Login',
  },
  {
    path: '/fogot',
    component: '@/pages/User/Fogot',
  },
  {
    path: '/index',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/index', redirect: '/index/home' },
      {
        name: '首页',
        path: '/index/home',
        component: '@/pages/Homepage/index',
      },
      {
        name: '产品',
        path: '/index/product',
        component: '@/pages/Product/Index',
      },
      {
        name: '项目',
        path: '/index/project',
        component: '@/pages/Project/Index',
      },
      {
        name: '任务',
        path: '/index/mission',
        component: '@/pages/Mission/Index',
      },
      {
        name: '测试',
        path: '/index/test',
        component: '@/pages/Test/Index',
      },
      {
        name: '设置',
        path: '/index/setting',
        routes: [
          { path: '/index/setting', redirect: '/index/setting/department' },
          {
            name: '部门管理',
            path: '/index/setting/department',
            component: '@/pages/Setting/Department',
          },
          {
            name: '角色管理',
            path: '/index/setting/charactor',
            component: '@/pages/Setting/Charactor',
          },
          {
            name: '用户管理',
            path: '/index/setting/setuser',
            component: '@/pages/Setting/SetUser',
          },
        ],
      },
    ],
  },
];
