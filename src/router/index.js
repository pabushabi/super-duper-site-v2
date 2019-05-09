'use strict';
import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/login";
import shadowswall from "@/components/shadowswall";
import signup from "@/components/signup";
import profile from "@/components/profile";
Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', name: 'shadowswall', component: shadowswall },
        { path: '/signin', name: 'signin', component: login },
        { path: '/signup', name: 'signup', component: signup },
        { path: '/profile', name: 'profile', component: profile }
    ]
})
