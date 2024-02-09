import React from 'react';
import './index.scss';
import Login from '@/components/LoginPage/index.jsx';

const Index = () => {
    return (
        <div className={'attention_container'}>
            <Login login_title_index={0}/>
        </div>
    );
};

export default Index;