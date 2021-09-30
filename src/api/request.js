import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000 
})

/*
service.interceptors.request.use(
  // config => {
  //   // console.log('service.interceptors.request = ', store.getters.token);
  //   // console.log('request gettoken()= ', getToken());    
  //   // if (store.getters.token) {
  //   //   // config.headers.Authorization =`Bearer ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
  //   //   config.headers.Authorization = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  //   // }
  // //  return config
  // },
  // error => {
  //   // Do something with request error
  //   console.log(error) // for debug
  //   Promise.reject(error)
  // }
  )
*/

// response 拦截器
service.interceptors.response.use(
  response => {
    // console.log(response.data)
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
  }
)

export default service
