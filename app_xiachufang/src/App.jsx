import React, { useEffect } from 'react';
import TopBar from '@/components/TopBar/index.jsx';
import BottomBar from '@/components/bottomBar/index.jsx';
import '@/App.scss';
import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
    return (
        <>
            {/*顶部*/}
            <TopBar />
            {/*路由展示区*/}
            <Outlet />
            {/*底部*/}
            <BottomBar />
        </>
    );
};

export default App;