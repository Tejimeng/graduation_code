import React, { useState } from 'react';
import { Popup } from 'antd-mobile';
import { AppstoreOutline } from 'antd-mobile-icons';
import Login from '@/components/LoginPage/index.jsx';
import './index.scss';
// 多功能按钮
const Index = ({ accessKey }) => {
    // 获取登录状态
    const [visible, setVisible] = useState(false);
    return (
        <>
            {/* 顶部 */}
            <div className='multi_container'>
                {/* 弹出层按钮 */}
                <AppstoreOutline
                    className='more_func'
                    onClick={() => setVisible(true)}
                />
                {/* 弹出层 */}
                <Popup
                    visible={visible}
                    onMaskClick={() => setVisible(false)}
                    position='left'
                    bodyStyle={{ width: accessKey ? '60vw' : '100vw' }}
                >
                    {accessKey ? (<div>左侧弹出层的内容-胡皓辉</div>) :
                        <Login containerTop={120} footerBottom={10} closeButtonVisible={true}
                               closeButtonFunc={() => setVisible(false)} />
                    }
                </Popup>
            </div>

        </>
    );
};

export default Index;