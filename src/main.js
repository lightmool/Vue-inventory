import { createApp } from "vue";
//导入element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initMenu } from "./utils/menu";
router.beforeEach((to, from, next) => {
    console.log(window.sessionStorage.getItem("tokenStr"));
    if (window.sessionStorage.getItem("tokenStr")) {
        initMenu(router, store);
        next();
    } else {
        next()
    }
})

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
