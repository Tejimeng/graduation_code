import React from 'react';
import Login from '@/components/Login/index.jsx';
import './index.scss'
const Index = () => {
    return (
        <div className={'collection_container'}>
            <div className='collection_login'>
                <Login login_title_index={2}/>
            </div>
        </div>
    );
};

export default Index;