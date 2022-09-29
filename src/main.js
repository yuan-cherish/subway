import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'iview-mpvue/dist/components/grid/style/css'
import 'iview-mpvue/dist/components/grid-item/style/css'
import 'iview-mpvue/dist/components/grid-icon/style/css'
import 'iview-mpvue/dist/components/grid-label/style/css'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import Vant,{Lazyload} from 'vant';
import 'vant/lib/index.css';
import progressive from 'progressive-image/dist/vue'; // 渐进式
import 'progressive-image/dist/index.css';//样式
import VueDragscroll from 'vue-dragscroll';
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload);
Vue.use(VueDragscroll)
Vue.use(progressive, {
    removePreview: true,
    scale: true
})

Vue.use(Vant);
Vue.use(Lazyload);


Vue.config.productionTip = false

Vue.prototype.$axios = axios;

// Vue.component('tree-table', TreeTable)

Vue.use(iView);
// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start();
//   next();
// });

// router.afterEach(() => {
//   iView.LoadingBar.finish();
// });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
