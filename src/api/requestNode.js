import axios from 'axios'


const service = axios.create({
  baseURL: process.env.NODE_API, 
  withCredentials: true,
  timeout: 5000 
})


service.interceptors.request.use(
  request => {
    // console.log('requestNode===========>', request)
    return request
  },
  error => {
    console.log('err' + error)
  }
)


// response 拦截器
service.interceptors.response.use(
  response => {
    // console.log('responseNode===========>',response)
      
      // console.log('service.interceptors.response ===> ok')
      return response.data
  
  },
  error => {
    console.log('err' + error) // for debug
  }
)


export default service
