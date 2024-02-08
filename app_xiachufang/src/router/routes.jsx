// 路由表文件
import { lazy } from 'react';
//懒加载
//pages
const App = lazy(() => import('@/App.jsx'));
const Home = lazy(() => import('@/pages/home/index.jsx'));
const Classroom = lazy(() => import('@/pages/classroom/index.jsx'));
const Collection =lazy(()=>import('@/pages/collection/index.jsx'))
const Me =lazy(()=>import('@/pages/me/index.jsx'))
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
                element: <Collection />
            },
            {
                path: 'me',
                element: <Me />
            }
        ]
    }

];
export default routes;