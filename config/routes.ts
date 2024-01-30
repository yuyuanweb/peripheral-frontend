export default [
  { path: '/', icon: 'smile', component: './Home', name: '周边展示页' },
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },

  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
      {
        icon: 'table',
        path: '/admin/peripheralInfo',
        component: './Admin/PeripheralInfo',
        name: '周边管理',
      },
      {
        icon: 'table',
        path: '/admin/applyRecords',
        component: './Admin/ApplyRecords',
        name: '周边申请管理',
      },
    ],
  },

  { path: '*', layout: false, component: './404' },
];
