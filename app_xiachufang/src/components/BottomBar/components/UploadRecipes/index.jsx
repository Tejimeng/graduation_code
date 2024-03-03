import React from 'react';
import './index.scss';
import { CloseOutline } from 'antd-mobile-icons';

const Index = ({ onClose }) => {
    return <div className={'upload_recipes'}>
        <CloseOutline className='new_close_button' onClick={onClose} color={'#000'} />
        <div>新增表单</div>
    </div>;
};

export default Index;
