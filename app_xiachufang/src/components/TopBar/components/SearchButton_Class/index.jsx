import React, { useState } from 'react';
import { SearchBar } from 'antd-mobile';
import './index.scss';
import { SearchOutline } from 'antd-mobile-icons';

const Index = () => {
    const [icon, setIcon] = useState(<SearchOutline />);
    return (
        <div className={'search_container_class'}>
            <SearchBar
                className={'search_class'}
                icon={icon}
                placeholder='想学点什么？'
                style={{
                    '--border-radius': '100px',
                    '--background': '#F0F0F0',
                    '--height': ' 1.28rem',
                    '--padding-left': '0.32rem',
                    '--placeholder-color':'#A2A2A2'
                }}
            />
        </div>
    );
};

export default Index;