import React from 'react';
import MultiFunction from '@/components/TopBar/components/MultiFunction/index.jsx';
import SearchButton_Recipes from '@/components/TopBar/components/SearchButton_Recipes/index.jsx';
import SearchButton_Class from '@/components/TopBar/components/SearchButton_Class/index.jsx';
import ClockButton from '@/components/TopBar/components/ClockButton/index.jsx';
import TopTitle from '@/components/TopBar/components/TopTitle/index.jsx';
import './index.scss';
import { useLocation } from 'react-router-dom';

const Index = () => {
    // 路由参数
    const location = useLocation();
    const { pathname } = location;
    return (
        <>
            <div className='top_container'>
                {/*多功能按钮*/}
                <MultiFunction />
                {/*    食谱搜索框*/}
                {pathname === '/home' && <SearchButton_Recipes />}
                {/*课堂搜索框*/}
                {pathname === '/classroom' && <SearchButton_Class />}
                {/*页面标题*/}
                {(pathname === '/collection'||pathname ==='/me') && <TopTitle pathname={pathname} />}
                {/*    右侧闹钟*/}
                {pathname === '/home' && <ClockButton />}
            </div>
        </>

    );
};

export default Index;