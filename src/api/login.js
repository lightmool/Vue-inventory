import service from "@/utils/request";

/**
 * 获取验证码
 */
export function GetSms() {
    return service.request({
        method: "get",
        url: "/getsms",
        data
    })
}
/**
 * 登录接口
 */
export function Login(data) {
    return service.request({
        method: "post",
        url: "/login",
        data: data
    })
}
/**
 * 注册接口
 */