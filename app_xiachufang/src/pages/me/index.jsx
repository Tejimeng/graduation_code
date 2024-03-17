import React from 'react';
import Login from '@/components/LoginPage/index.jsx';
import './index.scss';
import { useSelector } from 'react-redux';

const Index = () => {
    const isLogin = useSelector(state => state.user.isLogin);
    return (
        <div className={'me_container'}>
            {isLogin ? (<div>这里是你的个人信息</div>) : (<div className='me_login'>
                <Login outSideHeight={500} containerTop={100} footerBottom={20} />
            </div>)}

        </div>
    );
};

export default Index;