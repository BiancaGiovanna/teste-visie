import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import ListaPessoas from "./components/Home/ListaPessoas.vue";
import AdicionarPessoas from "./components/Adcionar/AdicionarPessoa.vue";
import EditarPessoa from "./components/Editar/EditarPessoa.vue";
import axios from "axios";
import urlAPI from "./utils/urlAPI";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: "/", component: ListaPessoas },
  { path: "/adicionar", component: AdicionarPessoas },
  {
    path: "/editar/:id",
    name: "editar",
    component: EditarPessoa,
    beforeEnter: (to, from, next) => {
      const id = to.params.id;
      axios
        .get(`${urlAPI}/pessoa/${id}`)
        .then((response) => {
          to.params.pessoa = response.data;
          next();
        })
        .catch((error) => {
          console.error("Erro ao carregar os detalhes da pessoa:", error);
          next(false);
        });
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
