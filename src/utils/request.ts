import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

interface ServiceConfig {
  baseURL: any;
  timeout: number;
  [key: string]: any
}

const serviceConfig: ServiceConfig = {
  // 在请求地址前附加baseURL
  baseURL: import.meta.env.VITE_BASE_API,
  // cross origin resource sharing 是否附加cookies
  // withCredentials: true,
  timeout: 50000
}
// 创建axios实例 http://www.axios-js.com/zh-cn/docs
const service = axios.create(serviceConfig)

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求成功处理
    config.headers.myToken = 'myToken'
    return config
  },
  (error) => {
    // 请求失败处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const res = response.data

    if (res.code !== 200) {
      ElMessage({
        type: 'error',
        message: res.message || 'Error',
        duration: 5000
      })

      if ([50008, 50012, 50014].includes(res.code)) {
        ElMessageBox.confirm('已登出，请重新登录', '确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // xxxx
        })
      }

      return Promise.reject(new Error(res.message || 'Error'));
    }
    return Promise.resolve(res)
  },

  (error) => {
    console.log(error);
    ElMessage({
      type: 'error',
      message: error.message || 'Error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
