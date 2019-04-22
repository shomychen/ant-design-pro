export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{ path: '/user', component: './Welcome' }],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/welcome' },
      // dashboard
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/other',
        name: 'other',
        icon: 'smile',
        component: './other',
      },
      {
        path: 'https://github.com/umijs/umi-blocks/tree/master/ant-design-pro',
        name: 'more-blocks',
        icon: 'block',
      },
    ],
  },
]
