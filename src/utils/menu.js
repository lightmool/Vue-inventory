import { GetMenu } from "@/api/menu"

export const initMenu = (router, store) => {
    if (store.state.rotes.length > 0) {
        return;
    }
    console.log(GetMenu());
    GetMenu().then(data => {

        if (data) {
            //格式化好的Router
            const fmtRoutes = formatRoutes(data)
            //将数据添加到router
            router.addRoutes(fmtRoutes);
            //将数据存入vuex
            store.component("initRoutes", fmtRoutes)
        }
    })
}
export function formatRoutes(routes) {
    const fmtRoutes = [];
    routes.forEach(element => {
        const router = {
            path,
            component,
            name,
            iconCls,
            children,
        };
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        const fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            component(resoLve) {
                require(["../views/" + component + ".vue"], resoLve)
            }
        }
        fmtRoutes.push(fmRouter)
    });
    return fmtRoutes;
}