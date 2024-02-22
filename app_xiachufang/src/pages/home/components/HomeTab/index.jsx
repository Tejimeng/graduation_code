import React, { useRef, useState } from 'react';
import { Tabs, Swiper, NoticeBar } from 'antd-mobile';
import './index.scss';
import Recommend from '@/pages/home/pages/recommend/index.jsx';
import Attention from '@/pages/home/pages/attention/index.jsx';
import ReduceFat from '@/pages/home/pages/reduce_fat/index.jsx';
import Shop from '@/pages/home/pages/shop/index.jsx';
import Classification from '@/pages/home/pages/classification/index.jsx';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const Index = () => {
    const accessKey = useSelector(state => state.user.accessKey);
    // 告示
    const [notice, setNotice] = useState('此应用为下厨房Alpha版，仅开放部分功能，更多功能正在开发中，尽情期待~~~');
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
                return <div className={classNames('attention_content', 'content')}><Attention accessKey={accessKey}/></div>;
            case 1:
                return <div className={classNames('recommend_content', 'content')}><Recommend /></div>;
            case 2:
                return <div className={classNames('reduce_fat_content', 'content')}><ReduceFat /></div>;
            case 3:
                return <div className={classNames('shop_content', 'content')}><Shop /></div>;
            case 4:
                return <div className={classNames('classification_content', 'content')}><Classification /></div>;
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
                <div className={'announcement'}>
                    <NoticeBar className={'announcement_content'} content={notice} color='alert' />
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