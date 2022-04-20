/**
 * 拦截器
 */
import axios from "axios"

//创建axios,赋值个给service
const service = axios.create();

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    //发送请求之前
    return config;
  }, function (error) {
    //处理错误请求
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 处理响应请求
    return response;
  }, function (error) {
    // 处理错误请求
    return Promise.reject(error);
  });
  service.request({
      method:"post",
      url:"/user/12345",
      data:{
          username:"12312",
          password:"123123"
      }
  })
  export default service;