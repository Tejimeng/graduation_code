import React, { useState } from 'react';
import { Popup } from 'antd-mobile';
import { BellOutline } from 'antd-mobile-icons';
import './index.scss';
// 多功能按钮
const Index = () => {
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
                    bodyStyle={{ width: '60vw' }}
                >
                    闹钟的内容
                </Popup>
            </div>

        </>
    );
};

export default Index;