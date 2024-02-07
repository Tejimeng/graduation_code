// 路由表文件
import { lazy } from 'react';
//懒加载
//pages
const App = lazy(() => import('@/App.jsx'));
const Home = lazy(() => import('@/pages/home/index.jsx'));
const Classroom = lazy(() => import('@/pages/classroom/index.jsx'));

//路由表
const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'classroom',
                element: <Classroom />
            },
            {
                path: 'collection',
                element: <Classroom />
            }
        ]
    }

];
export default routes;