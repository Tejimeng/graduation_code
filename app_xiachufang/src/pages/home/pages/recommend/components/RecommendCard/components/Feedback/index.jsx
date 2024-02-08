import React from 'react';
import './index.scss';
import { CloseOutline } from 'antd-mobile-icons';

const Index = ({ title, username, type, onClose }) => {
    return (
        <div className={'feedback_container'}>
            <div className={'close_button'} onClick={onClose}><CloseOutline /></div>
            <div className='feedback_title'>对《{title}》反馈：</div>
            <div className={'choice_content'}>不想看这个菜谱</div>
            <div className={'choice_content'}>不想看{type || '此种类'}菜谱</div>
            <div className={'choice_content'}>不想看{type || '类型'}菜谱</div>
            <div className={'choice_content'}>不想该作者的菜谱：{username}</div>
        </div>
    );
};

export default Index;