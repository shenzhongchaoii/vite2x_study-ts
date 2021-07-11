const mockList = [
  {
    id: 1,
    pid: 0,
    path: '/',
    redirect: '/home',
    url: '/src/layouts/index.vue',
    // component: () => import('/src/layouts/index.vue'),
    name: '/',
    meta: { title: '导航', icon: 'el-icon-guide' },
    children: [
      {
        id: 2,
        pid: 1,
        path: '/home',
        url: '/src/views/home.vue',
        // component: () => import('/src/views/home.vue'),
        name: 'home',
        meta: { title: '首页', icon: 'el-icon-s-home' },
        hidden: true,
        children: [
          {
            id: 3,
            pid: 2,
            path: ':id',
            url: '/src/views/detail.vue',
            // component: () => import('/src/views/detail.vue'),
            name: 'detail',
            hidden: true,
            meta: { title: '详情', icon: 'el-icon-s-home', activeMenu: '/home' }
          }
        ]
      }
    ]
  },
  {
    id: 10,
    pid: 0,
    path: '/users',
    redirect: '/users/list',
    url: '/src/layouts/index.vue',
    name: 'users',
    meta: { title: '用户管理', icon: 'el-icon-user-solid' },
    children: [
      {
        id: 11,
        pid: 10,
        path: 'list',
        url: '/src/views/users/index.vue',
        name: 'userList',
        meta: { title: '用户列表', icon: 'el-icon-document' }
      },
      {
        id: 12,
        pid: 10,
        path: 'create',
        url: '/src/views/users/components/Edit.vue',
        name: 'userCreate',
        hidden: true,
        meta: { title: '新增用户', activeMenu: '/users/list' }
      },
      {
        id: 13,
        pid: 10,
        path: 'edit/:id(\\d+)',
        url: '/src/views/users/components/Edit.vue',
        name: 'userEdit',
        hidden: true,
        meta: { title: '编辑用户', activeMenu: '/users/list' }
      }
    ]
  }
]


export default [
  {
    url: '/api/getMenus',
    type: 'get',
    response: () => ({
      code: 200,
      message: '成功',
      data: mockList
      // code: 500,
      // message: 'error'
    })
  }
]