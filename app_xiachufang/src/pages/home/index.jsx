import React from 'react';
import HomeTab from '@/pages/home/components/HomeTab/index.jsx';
import './index.scss';
import { Outlet } from 'react-router-dom';

const Index = () => {
    return (
        <div className={'home_container'}>
            <div className='tab'>
                <HomeTab />
            </div>
            <Outlet />
        </div>
    );
};

export default Index;