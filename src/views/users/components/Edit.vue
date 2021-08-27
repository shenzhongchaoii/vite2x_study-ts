// 新增/编辑用户
<template>
  <div class="block">
    <el-form :model="state.addForm" status-icon :rules="formRules" ref="formRef" label-width="100px">
      <el-row>
        <el-col :span="10" :offset="7">
          <el-form-item label="用户" prop="realname">
            <el-input v-model="state.addForm.realname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="7">
          <el-form-item label="账号" prop="username">
            <el-input v-model="state.addForm.username"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="7">
          <el-form-item label="密码" prop="password">
            <el-input v-model="state.addForm.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="7">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="state.addForm.age"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="7">
          <el-form-item label="住址" prop="address">
            <el-input v-model="state.addForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CommonService from 'apis/common'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
let id: any = route.params.id || 0
id = id * 1


const state = reactive({
  addForm: {
    id: 0,
    realname: '',
    username: '',
    password: '',
    age: '',
    address: '',
    deleted: 0
  }
})

const formRules = {
  realname: [
    { required: true, message: '请输入用户名', trigger: ['change', 'blur'] }
  ],
  username: [
    { required: true, message: '请输入账号名', trigger: ['change', 'blur'] },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
  ]
}

const formRef: Ref<any> = ref(null)

const submitForm = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      let api = '/addUser'
      if (id) {
        api = '/updateUser'
      }
      const res = await CommonService.post(api, state.addForm)
      if (res) {
        ElMessage.success(res.message)
        router.go(-1)
      }
    }
  })
}

const resetForm = () => {
  formRef.value.resetFields()
}

onMounted(async () => {
  console.log('create')
  if (id) {
    const res = await CommonService.get('/getUser', { id: id })
    state.addForm = res.data
    // state.addForm.password = ''
  }
})

</script>
<style  lang="scss" scoped>
.block {
  padding: 4rem 0;
}
</style>