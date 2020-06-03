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
        routes: [
          { path: '/index/project', redirect: '/index/project/allpro' },
          {
            name: '所有项目',
            path: '/index/project/allpro',
            component: '@/pages/Project/Allpro',
          },
          {
            name: '团队',
            path: '/index/project/team',
            component: '@/pages/Project/Team',
          },
        ],
      },
      {
        name: '任务',
        path: '/index/mission',
        routes: [
          { path: '/index/mission', redirect: '/index/mission/overview' },
          {
            name: '任务总览',
            path: '/index/mission/overview',
            component: '@/pages/Mission/Index',
          },
          {
            name: '任务下达',
            path: '/index/mission/start',
            component: '@/pages/Mission/MissionStart',
          },
          {
            name: '任务分配',
            path: '/index/mission/assign',
            component: '@/pages/Mission/MissionAssign',
          },
          {
            name: '任务开发',
            path: '/index/mission/develop',
            component: '@/pages/Mission/MissionDevelop',
          },
          {
            name: '任务测试',
            path: '/index/mission/test',
            component: '@/pages/Mission/MissionTest',
          },
          {
            name: '任务验收',
            path: '/index/mission/check',
            component: '@/pages/Mission/MissionCheck',
          },
        ],
      },
      {
        name: '测试',
        path: '/index/test',
        routes: [
          { path: '/index/test', redirect: '/index/test/bugs' },
          {
            name: 'Bug',
            path: '/index/test/bugs',
            component: '@/pages/Test/Bugs',
          },
          {
            name: '用例',
            path: '/index/test/demos',
            component: '@/pages/Test/Demos',
          },
        ],
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
          {
            name: '数据字典',
            path: '/index/setting/datadictionary',
            component: '@/pages/Setting/Datadictionary',
          },
        ],
      },
    ],
  },
];
