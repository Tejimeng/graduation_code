import React, { useState } from 'react';
import { Avatar, Card, Image, Mask, Popup } from 'antd-mobile';
import './index.scss';
import avatar from '@/assets/9b748d06a05d08c0b943b37f37e31e7.jpg';
import { MoreOutline } from 'antd-mobile-icons';

const Index = ({card_cover,card_title,user_avatar,username}) => {
    // 反馈弹窗
    const [visiblePop, setVisiblePop] = useState(false);
    return (
        <>
            <div className={'card_container'}>
                <Card
                    className={'card_content'}
                    bodyStyle={{ padding: 0 }}
                >
                    <div className={'card_img'}><Image className={'img'} src={card_cover||avatar}></Image></div>
                    <p className='card_title'>{card_title||'难怪梅琳这么爱喝，真的好喝啊啊啊啊'}</p>
                    <div className='card_footer'>
                        <div className='user_info'>
                            <Avatar className={'user_avatar'} src={user_avatar||avatar}
                                    style={{ '--size': '25px', '--border-radius': '50%' }} />
                            <p className={'user_name'}>{username||'这是用户的名字'}</p>
                        </div>
                        <div className='operation' onClick={() => {
                            console.log(visiblePop);
                            setVisiblePop(true);
                        }}>
                            <MoreOutline fontSize={28} />
                        </div>

                    </div>
                </Card>
            </div>
            {/* 反馈弹出层 */}
            {/*<Mask color='white' style={{zIndex:99}} visible={visiblePop} onMaskClick={() => setVisiblePop(false)}>*/}
            {/*   <p>12345678</p>*/}
            {/*</Mask>*/}
            <Popup
                visible={visiblePop}
                onMaskClick={() => {
                    setVisiblePop(false);
                }}
                bodyStyle={{ height: '40vh' }}
            >
                对《{card_title||'此内容'}》反馈：
            </Popup>
        </>

    );
};

export default Index;