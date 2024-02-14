import React from 'react';
import Login from '@/components/LoginPage/index.jsx';
import './index.scss'
const Index = () => {
    return (
        <div className={'collection_container'}>
            <div className='collection_login'>
                <Login login_title_index={2} outSideHeight={500} containerTop={100} footerBottom={20}/>
            </div>
        </div>
    );
};

export default Index;