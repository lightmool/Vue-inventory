import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login/index.vue"
import Home from "@/views/Home/index.vue"
import Test1 from "@/views/Home/Test1.vue"
import Test2 from "@/views/Home/Test2.vue"
const routes = [
  {
    path: "/",
    redirect: "login",
  }, {
    path: "/login",
    name: "Login",
    component: Login,
  }, {
    path: '/home',
    name: '导航二',
    component: Home,
    children: [
      {
        path: '/test1',
        name: '选项一',
        component: Test1
      },
      {
        path: '/test2',
        name: '选项二',
        component: Test2
      }
    ]
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
