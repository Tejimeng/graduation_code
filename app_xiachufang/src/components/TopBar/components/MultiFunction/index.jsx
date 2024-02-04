import React, { useState } from 'react';
import { Popup } from 'antd-mobile';
import { AppstoreOutline } from 'antd-mobile-icons';
// 多功能按钮
const Index = () => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            {/* 顶部 */}
            <div className='topBar'>
                {/* 弹出层按钮 */}
                <AppstoreOutline
                    className='more_func'
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
                    position='left'
                    bodyStyle={{ width: '60vw' }}
                >
                    左侧弹出层的内容-胡皓辉
                </Popup>
            </div>

        </>
    );
};

export default Index;