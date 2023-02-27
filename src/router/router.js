
import { createRouter, createWebHistory } from "vue-router";
import MainFile from '@/components/main-file.vue';
import CatalogFile from '@/components/catalog-file.vue';
import GoodShowFile from '@/components/good-show-file.vue';
import CartFile from '@/components/cart-file.vue';
import AdminPannelFile from '@/components/admin-pannel-file.vue';
import TestFile from '@/components/test-file.vue';



const routes = [
    {
        path: '/Main',
        component: MainFile,
        name: 'mainpage',
        props: true
    },
    {
        path: '/Catalog', 
        component: CatalogFile, 
        name: 'catalogpage', 
        props: true
    },
    {
        path: '/Good', 
        component: GoodShowFile, 
        name: 'goodpage', 
        props: true
    },    
    {
        path: '/Cart', 
        component: CartFile, 
        name: 'cartpage', 
        props: true
    },
    {
        path: '/Admin', 
        component: AdminPannelFile, 
        name: 'adminpage', 
        props: true
    },
    {
        path: '/', 
        component: TestFile, 
        name: 'testpage', 
        props: true
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
