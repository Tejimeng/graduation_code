import React from 'react';
import './index.scss';
import { LeftOutline } from 'antd-mobile-icons';
import { SafeArea } from 'antd-mobile';

const Index = ({
                   back = () => {
                   }
               }) => {
    return (
        <div className={'recipes_detail'}>
            <div className='back_recommend_container'><LeftOutline onClick={back} className={'back_recommend_button'} />
            </div>
            <div className='detail_content'>
                详细信息
            </div>
            <div>bottom</div>
            {/*开启安全区域，防止底部遮挡*/}
            <SafeArea position='bottom' />
        </div>
    );
};

export default Index;