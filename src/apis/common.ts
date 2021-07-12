import request from 'utils/request'

/**
 * @description 公共api类
 */
 class CommonService {
  static post(url: string, data: object = {}){
    return request(url, {
      method: 'post',
      data: data,
      responseType: 'json'
    })
  }

  static get(url: string, params: object = {}) {
    return request(url, {
      method: 'get',
      params: params
    })
  }
}
export default CommonService