import React from 'react';
import Login from '@/components/LoginPage/index.jsx';
import './index.scss';
import { useSelector } from 'react-redux';

const Index = () => {
    const isLogin = useSelector(state => state.user.isLogin);
    return (
        <div className={'collection_container'}>
            {isLogin ? (<div>这里是你的收藏</div>) : (<div className='collection_login'>
                <Login login_title_index={2} outSideHeight={500} containerTop={100} footerBottom={20} />
            </div>)}

        </div>
    );
};

export default Index;