import React, { useState } from 'react';
import { Popup } from 'antd-mobile';
import Login from '@/components/LoginPage/index.jsx';
import { BellOutline } from 'antd-mobile-icons';
import './index.scss';
// 多功能按钮
const Index = ({ isLogin }) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            {/* 顶部 */}
            <div className='clock_container'>
                {/* 弹出层按钮 */}
                <BellOutline
                    className='clock'
                    onClick={() => {
                        setVisible(true);
                    }}
                />
                {/* 弹出层 */}
                <Popup
                    visible={visible}
                    onMaskClick={() => {
                        setVisible(false);
                    }}
                    position='right'
                    bodyStyle={{ width: '100vw' }}
                >
                    {isLogin ? (<div>消息</div>) : (
                        <Login containerTop={120} footerBottom={10} closeButtonVisible={true}
                               closeButtonFunc={() => setVisible(false)} />
                    )}
                </Popup>
            </div>

        </>
    );
};

export default Index;