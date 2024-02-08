import React from 'react';
import Login from '@/components/Login/index.jsx';
import './index.scss'
const Index = () => {
    return (
        <div className={'me_container'}>
           <div className='me_login'>
               <Login login_title_index={1}/>
           </div>
        </div>
    );
};

export default Index;