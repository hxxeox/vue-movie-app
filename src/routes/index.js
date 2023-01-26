import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
    // Hash, Histort
    // Hash mode
    // https://google.com/#/search 처럼 앞에 #키워드를 붙여서 페이지에 접근하는 모드
    // 특정페이지에서 새로고침을 했을때 페이지를 찾을 수 없다 라는 페이지를 방지한다.
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top:0 }
    },
    // routes는 pages 구분하는 옵션
    routes: [
        {
            // https://google.com/
            path:'/', // (/)경로를 의미
            component: Home
        },
        {
            // Movie
            path:'/movie/:id', 
            component: Movie
        },
        {   // about 컴포넌트 
            path:'/about',
            component: About
        },
        {   // 404 NotFound
            path:'/:pathMatch(.*)',
            component: NotFound
        }
    ]
})