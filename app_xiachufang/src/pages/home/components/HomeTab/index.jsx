import React, { useRef, useState } from 'react';
import { Tabs, Swiper } from 'antd-mobile';
import './index.scss';
import Recommend from '@/pages/home/pages/recommend/index.jsx';
import Attention from '@/pages/home/pages/attention/index.jsx';
import classNames from 'classnames';

const Index = () => {
    const tabItems = [
        { key: 'attention', title: '关注' },
        { key: 'recommend', title: '推荐' },
        { key: 'reduce_fat', title: '减脂' },
        { key: 'shop', title: '商店' },
        { key: 'classification', title: '分类' }
    ];
    // 滑块部分
    // const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(1);
    // 暂时的渲染函数
    const content_render = (index) => {
        switch (index) {
            case 0:
                return <div className={classNames('attention_content','content')}><Attention /></div>;
            case 1:
                return <div className={classNames('recommend_content','content')}><Recommend /></div>;
        }
    };
    return (
        <>
            <div className='tab_container'>
                <div className={'tabs'}>
                    <Tabs
                        className={'tabs_info'}
                        activeKey={tabItems[activeIndex].key}
                        onChange={key => {
                            const index = tabItems.findIndex(item => item.key === key);
                            setActiveIndex(index);
                            // swiperRef.current?.swipeTo(index);
                        }}
                    >
                        {tabItems.map(item => (
                            <Tabs.Tab className={'tabs_info_item'} title={item.title} key={item.key} />
                        ))}
                    </Tabs>
                </div>
                {/*暂时使用*/}
                <div className='tab_content'>
                    {content_render(activeIndex)}
                </div>

                {/*因此组件利用flex实现滑动，存在bug，暂不使用*/}
                {/*<Swiper*/}
                {/*    className={'swiper_container'}*/}
                {/*    direction='horizontal'*/}
                {/*    indicator={() => null}*/}
                {/*    ref={swiperRef}*/}
                {/*    defaultIndex={activeIndex}*/}
                {/*    onIndexChange={index => {*/}
                {/*        setActiveIndex(index);*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Swiper.Item>*/}
                {/*        <div className={'attention_content'}><Attention/></div>*/}
                {/*    </Swiper.Item>*/}
                {/*    <Swiper.Item>*/}
                {/*        <div className={'recommend_content'}><Recommend /></div>*/}
                {/*    </Swiper.Item>*/}
                {/*    <Swiper.Item>*/}
                {/*        <div className={'content'}>减脂</div>*/}
                {/*    </Swiper.Item>*/}
                {/*    <Swiper.Item>*/}
                {/*        <div className={'content'}>商店</div>*/}
                {/*    </Swiper.Item>*/}
                {/*    <Swiper.Item>*/}
                {/*        <div className={'content'}>分类</div>*/}
                {/*    </Swiper.Item>*/}
                {/*</Swiper>*/}
            </div>
        </>
    );
};

export default Index;