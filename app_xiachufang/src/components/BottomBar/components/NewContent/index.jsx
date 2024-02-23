import React from 'react';
import { CloseOutline } from 'antd-mobile-icons';
import { Image } from 'antd-mobile';
import posterCover from '@/assets/Snipaste_2024-02-23_15-17-48.png'

const Index = ({ setVisible }) => {
    return (
        <div className='new_container'>
            <CloseOutline className='new_close_button' onClick={setVisible} color={'#999'}/>
            <Image className={'poster_cover'} src={posterCover}></Image>
        </div>
    );
};

export default Index;