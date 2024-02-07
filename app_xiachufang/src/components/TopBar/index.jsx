import React from 'react';
import MultiFunction from '@/components/TopBar/components/MultiFunction/index.jsx';
import SearchButton from '@/components/TopBar/components/SearchButton/index.jsx';
import ClockButton from '@/components/TopBar/components/ClockButton/index.jsx';
import './index.scss';

const Index = () => {
    return (
        <>
            <div className='top_container'>
                {/*多功能按钮*/}
                <MultiFunction />
                {/*    搜索框*/}
                <SearchButton />
                {/*    右侧闹钟*/}
                <ClockButton />
            </div>
        </>

    );
};

export default Index;