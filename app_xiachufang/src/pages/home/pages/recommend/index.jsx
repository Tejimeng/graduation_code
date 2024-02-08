import React from 'react';
import RecommendCard from '@/pages/home/pages/recommend/components/RecommendCard/index.jsx';
import './index.scss';
import { Image } from 'antd-mobile';
import news_img from '@/assets/85d8e94171c8486e84ed593ece8125fd_851w_1280h.jpg'
import title_img from '@/assets/fdeed94fb2284bd4b76c1fb8f097c99c.jpg'
const Index = () => {
    return (
        <>
            <div className='recommend_container'>
                <div className='recommend_container_news'>
                    <Image className={'news_img'} lazy src={news_img} />
                </div>
                <div className='recommend_container_title'>
                    <Image className={'title_img'} lazy src={title_img} />
                </div>
                <div className='recommend_container_content'>
                    <RecommendCard />
                    <RecommendCard />
                    <RecommendCard />
                    <RecommendCard />
                    <RecommendCard />
                    <RecommendCard />
                    <RecommendCard />
                    <RecommendCard />
                </div>
            </div>

        </>
    );
};

export default Index;