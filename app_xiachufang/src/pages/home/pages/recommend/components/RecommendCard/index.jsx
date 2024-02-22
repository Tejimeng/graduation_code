import React, { useState } from 'react';
import { Avatar, Card, Image, Mask, Popup } from 'antd-mobile';
import Feedback from '@/pages/home/pages/recommend/components/RecommendCard/components/Feedback/index.jsx';
import './index.scss';
import avatar from '@/assets/9b748d06a05d08c0b943b37f37e31e7.jpg';
import { MoreOutline } from 'antd-mobile-icons';
import RecommendDetails from '@/pages/home/pages/recommend/components/RecommendDetails/index.jsx';

const Index = ({ card_cover, card_title, user_avatar, username }) => {
    const [visiblePop, setVisiblePop] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    return (
        <>
            <div className={'card_container'}>
                <Card
                    className={'card_content'}
                    bodyStyle={{ padding: 0 }}
                >
                    <div onClick={() => setDetailVisible(true)} className={'card_img'}>
                        <Image className={'img'} src={card_cover || avatar}></Image>
                    </div>
                    <p onClick={() => setDetailVisible(true)}
                       className='card_title'>{card_title || '难怪梅琳这么爱喝，真的好喝啊啊啊啊'}</p>
                    <div className='card_footer'>
                        {/*记得添加点击跳转用户的信息页面*/}
                        <div className='user_info'>
                            <Avatar className={'user_avatar'} src={user_avatar || avatar}
                                    style={{ '--size': '25px', '--border-radius': '50%' }} />
                            <p className={'user_name'}>{username || '这是用户的名字'}</p>
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
            {/*detail弹出层*/}
            <Popup visible={detailVisible}>
                {/* 内容可滚动*/}
                <RecommendDetails back={() => setDetailVisible(false)} />
            </Popup>
            {/* 反馈弹出层 */}
            {/*<Mask color='white' style={{zIndex:99}} visible={visiblePop} onMaskClick={() => setVisiblePop(false)}>*/}
            {/*   <p>12345678</p>*/}
            {/*</Mask>*/}
            <Popup
                visible={visiblePop}
                onMaskClick={() => {
                    setVisiblePop(false);
                }}
                bodyStyle={{ height: '40vh', borderRadius: '15px' }}
            >
                <Feedback onClose={() => setVisiblePop(false)} title={card_title || '难怪梅琳这么爱喝，真的好喝啊啊啊啊'}
                          username={username || '这是用户的名字'} />
            </Popup>
        </>

    );
};

export default Index;