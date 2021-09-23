
import { format } from 'url'
import { readFile, writeFile } from '../src/utils/file'
const path = require('path')

const filePath = path.join(__dirname, './user/data.json')

let completeList = [] // 完整数据
let mockList = [] // 过滤数据
// 读取一下数据
readFile(filePath).then(res=>{
  completeList = JSON.parse(res).sort((a, b) => {
    return b.id-a.id
  })
    
  mockList = completeList.filter(item=>item.deleted===0)
})

const findEligibleUsers = (key, value, list) => {
  return list.filter(
    (item) => item[key] == value
  )
}

export default [
  {
    url: '/api/login',
    type: 'post',
    response: function (config) {
      const loginForm = config.body
      const str = encodeURIComponent(`username=${loginForm.username}123&password=${loginForm.password}123`)
      
      return {
        code: 200,
        message: '成功',
        data: {
          authorization: str
        }
      }
    }
  },
  {
    url: '/api/getUser',
    type: 'get',
    response: (config) => {
      const { id } = config.query
      const users = findEligibleUsers('id', id, mockList)
      
      return {
        code: 200,
        message: '成功',
        data: users[0]
      }
    }
  },
  {
    url: '/api/getUserOptions',
    type: 'get',
    response: () => {
      let data = []
      mockList.forEach(item => {
        data.push({
          id: item.id,
          realname: item.realname
        })
      })

      return {
        code: 200,
        message: '成功',
        data
      }
    }
  },
  {
    url: '/api/getUsers',
    type: 'get',
    response: (config) => {
      // 从查询参数中获取分页、过滤关键词等参数
      const { currentPage, pageSize, id } = config.query

      // 分页
      let data = mockList.filter((item, index) => {
        let conditon = index < pageSize * currentPage && index >= pageSize * (currentPage - 1)
        if (id) {
          conditon = conditon &&  item.id == id
        }
        return conditon
      })

      return {
        code: 200,
        message: '成功',
        data,
        total: mockList.length,
      }
    }
  },
  {
    url: '/api/addUser',
    type: 'post',
    response: (config) => {
      const form = config.body
      form.id = completeList[0].id + 1
      completeList.unshift(form)
      writeFile(filePath, JSON.stringify(completeList, null, 2))
      mockList = completeList.filter(item=>item.deleted===0)

      return {
        code: 200,
        message: '新增成功',
        data: form
      }
    }
  },
  {
    url: '/api/updateUser',
    type: 'post',
    response: (config) => {
      const form = config.body
      const users = findEligibleUsers('id', form.id, completeList)
      completeList[completeList.indexOf(users[0])] = form
      writeFile(filePath, JSON.stringify(completeList, null, 2))
      mockList = completeList.filter(item=>item.deleted===0)

      return {
        code: 200,
        message: '编辑成功',
        data: form
      }
    }
  },
  {
    url: '/api/deleteUser',
    type: 'post',
    response: (config) => {
      // 查询id匹配的用户
      const { id } = config.body

      const users = findEligibleUsers('id', id, completeList)
      completeList[completeList.indexOf(users[0])].deleted = 1
      writeFile(filePath, JSON.stringify(completeList, null, 2))

      // 更新数据
      completeList.splice(completeList.indexOf(users[0]), 1)
      mockList = completeList.filter(item=>item.deleted===0)

      return {
        code: 200,
        message: '删除成功！',
        data: id
      }
    }
  }
]