// 用户列表
<template>
  <div>
    <el-row>
      <el-form inline :model="state.queryForm" class="demo-form-inline">
        <el-form-item label="用户:">
          <el-select size="mini" v-model="state.queryForm.id" clearable placeholder="请选择用户" filterable>
            <el-option
              v-for="item in state.userOptions"
              :key="item.id"
              :label="item.realname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini"  type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleAdd">新增用户</el-button>
        </el-form-item>
      </el-form>
      
    </el-row>
    <el-table
      v-loading="state.loading"
      :data="state.userList"
      stripe
      style="width:100%;margin-top:10px"
      border
    >
      <el-table-column
        prop="id"
        label="ID"
        width="60"
      />
      <el-table-column
        prop="realname"
        label="姓名"
        min-width="180"
      />
      <el-table-column
        prop="username"
        label="账号"
        width="180"
      />
      <el-table-column
        prop="age"
        label="年龄"
        min-width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
        min-width="360"
      />
      <el-table-column
        prop="deleted"
        label="逻辑删除"
        min-width="60"
      />
      <el-table-column
        label="操作"
        min-width="120"
        fixed="right"
        align="center"
      >
        <template #default="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="text"
            style="color:red"
            @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-bind="state.pagination"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import setComponetName from 'mixins/setComponetName'
export default setComponetName(location.hash)
</script>
<script lang="ts" setup>
import { reactive, ref, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import CommonService from 'apis/common'

const router = useRouter()

const userOptions : any = []
const state = reactive({
  loading: false,

  queryForm: {
    id: ''
  },
  userOptions: userOptions,

  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 0
  },

  userList: []
})

const getUserOptions = async () => {
  const res = await CommonService.get('/getUserOptions')
  state.userOptions = res.data
}

const getUserList = () => {
  state.loading = true
  setTimeout(async () => {
    try {
      const params: {
        currentPage: number,
        pageSize: number,
        [key:string]: string | number
      } = {
        currentPage: state.pagination.currentPage,
        pageSize: state.pagination.pageSize,
        ...state.queryForm
      }
      delete params.id
      
      const res = await CommonService.get('/getUsers', params)
      state.userList = res.data
      state.pagination.total = res.total
    } catch (error) {

    } finally {
      state.loading = false
    }
  }, 400)
}
// ----
const handleSizeChange = (val: number) => {
  console.log('handleSizeChange', val)
  state.pagination.pageSize = val
  getUserList()
}

const handleCurrentChange = (val: number) => {
  console.log('handleCurrentChange', val)
  state.pagination.currentPage = val
  getUserList()
}
// ----
const handleSearch = () => {
  console.log(state.queryForm)
  console.log('搜索用户')
   state.pagination.currentPage = 1
  getUserList()
}

const handleAdd = () => {
  console.log('新增用户')
  // router.push({ name: 'userCreate' })
  router.push({ path: '/users/create' })
}

const handleEdit = (id: number) => {
  console.log('编辑用户')
  router.push({ name: 'userEdit', params: { id: id } })
}

const handleDelete = async (id: number) => {
  console.log('删除用户')
  const res = await CommonService.post('/deleteUser', { id: id })

  if (res) {
    ElMessage.success(res.message)
    getUserList()
  }
}

onMounted(() => {
  console.log('user list onMounted')
  getUserOptions()
  getUserList()
})

onActivated(() => {
  console.log('onActivated')
  getUserOptions()
  getUserList()
})
</script>

<style lang="scss" scoped>

</style>