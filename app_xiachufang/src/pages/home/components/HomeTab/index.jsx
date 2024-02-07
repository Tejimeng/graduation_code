import React, { useRef, useState } from 'react';
import { Tabs, Swiper } from 'antd-mobile';
import './index.scss';

const Index = () => {
    const tabItems = [
        { key: 'fruits', title: '水果' },
        { key: 'vegetables', title: '蔬菜' },
        { key: 'animals', title: '动物' }
    ];
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(1);
    return (
        <>
            <div className='tab_container'>
                <Tabs
                    activeKey={tabItems[activeIndex].key}
                    onChange={key => {
                        const index = tabItems.findIndex(item => item.key === key);
                        setActiveIndex(index);
                        swiperRef.current?.swipeTo(index);
                    }}
                >
                    {tabItems.map(item => (
                        <Tabs.Tab title={item.title} key={item.key} />
                    ))}
                </Tabs>
                <Swiper
                    className={'swiper_container'}
                    direction='horizontal'
                    loop
                    indicator={() => null}
                    ref={swiperRef}
                    defaultIndex={activeIndex}
                    onIndexChange={index => {
                        setActiveIndex(index);
                    }}
                >
                    <Swiper.Item>
                        <div className={'content'}>菠萝</div>
                    </Swiper.Item>
                    <Swiper.Item>
                        <div className={'content'}>西红柿</div>
                    </Swiper.Item>
                    <Swiper.Item>
                        <div className={'content'}>蚂蚁</div>
                    </Swiper.Item>
                </Swiper>
            </div>
        </>
    );
};

export default Index;