import Vue from "vue";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


createApp(App).use(router, moment).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
