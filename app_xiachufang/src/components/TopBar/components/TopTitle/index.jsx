import React from 'react';
import './index.scss'
const Index = ({ pathname }) => {
    const title={
        '/collection':'收藏',
        '/me':'我'
    }
    return (
        <div className={'title_container'}>
            <div className={'top_title'}>{title[pathname]}</div>
        </div>
    );
};

export default Index;