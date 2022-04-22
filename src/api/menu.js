import service from "@/utils/request";

/**
 * 获取菜单
 */
export function GetMenu() {
    return service.request({
        method: "get",
        url: "/getMenu",
    })
}
