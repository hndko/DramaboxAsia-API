import { createRouter, createWebHistory } from "vue-router";

// Pages
import Home from "../pages/Home.vue";
import Trending from "../pages/Trending.vue";
import Latest from "../pages/Latest.vue";
import Search from "../pages/Search.vue";
import Detail from "../pages/Detail.vue";
import Watch from "../pages/Watch.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/trending",
    name: "Trending",
    component: Trending,
  },
  {
    path: "/latest",
    name: "Latest",
    component: Latest,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/drama/:bookId",
    name: "Detail",
    component: Detail,
    props: true,
  },
  {
    path: "/watch/:bookId/:episode?",
    name: "Watch",
    component: Watch,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
