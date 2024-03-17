import React from 'react';
import './index.scss';
import Login from '@/components/LoginPage/index.jsx';

const Index = ({ isLogin }) => {
    return (
        <div className={'attention_container'}>
            {isLogin ? (<div>这里是你的关注列表</div>) : (
                <Login login_title_index={0} outSideHeight={450} footerBottom={20} containerTop={75} />)}

        </div>
    );
};

export default Index;