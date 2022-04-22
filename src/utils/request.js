/**
 * 拦截器
 */
import router from "@/router";
import axios from "axios"
//导入element
import { ElMessage } from 'element-plus'
//创建axios,赋值个给service
const service = axios.create();

// 添加请求拦截器
service.interceptors.request.use(config => {
  //发送请求之前
  if (window.sessionStorage.getItem("tokenStr")) {
    config.headers["Authorization"] = window.sessionStorage.getItem("tokenStr")
  }
  return config;
}, error => {
  //处理错误请求
  console.log(error)
});

// 添加响应拦截器
service.interceptors.response.use(success => {
  if (success.status && success.status == 200) {
    //判断业务逻辑是否错误
    if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
      //弹出后端返回的数据提示
      ElMessage.error({ message: success.data.msg });
    } if (success.data.msg) {
      ElMessage.error({ message: success.data.msg });
    }
  }
  //返回对象
  return success.data;
}, error => {
  if (error.response.code == 505 || error.response.code == 404)
    ElMessage.error({ message: "连接不上服务器" });
  else if (error.response.code == 403)
    ElMessage.error({ message: "联系管理员!" });
  else if (error.response.code == 401) {
    ElMessage.error({ message: "尚未登录,请登录!" });
    router.replace("/")
  } else {
    if (error.response.data.msg) {
      ElMessage.error({ message: error.response.data.msg });
    } else {
      ElMessage.error({ message: "未知错误" });
    }
  }
  return;
});
export default service;