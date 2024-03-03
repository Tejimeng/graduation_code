import React from 'react';
import './index.scss';
import { CloseOutline } from 'antd-mobile-icons';

const Index = ({ onClose }) => {
    return <div className={'upload_recipesF'}>
        <CloseOutline className='new_close_button' onClick={onClose} color={'#000'} />
        新增表单
    </div>;
};

export default Index;
