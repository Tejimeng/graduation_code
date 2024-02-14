import React from 'react';
import Login from '@/components/LoginPage/index.jsx';
import './index.scss'
const Index = () => {
    return (
        <div className={'me_container'}>
           <div className='me_login'>
               <Login  outSideHeight={500} containerTop={100} footerBottom={20}/>
           </div>
        </div>
    );
};

export default Index;