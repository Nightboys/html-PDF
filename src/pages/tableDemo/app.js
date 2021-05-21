import Vue from 'vue';
import App from './app.vue';
import FastClick from 'fastclick';
import Loading from '@/components/uiLoading';
import {
  http
} from '@/utils/http';
import 'normalize.css';
import '@/styles/reset.css'
import '@/utils/filter'

// import vconsole from 'vconsole'
// new vconsole()

Vue.config.productionTip = false
Vue.use(Loading);
Vue.use(http);

FastClick.attach(document.body);

new Vue({
  el: '#app',
  render: h => h(App),
});
