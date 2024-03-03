import React, { useEffect, useState } from 'react';
import { TabBar, Mask } from 'antd-mobile';
import {
    AppOutline,
    VideoOutline,
    StarOutline,
    UserOutline,
    AddOutline,
    StarFill
} from 'antd-mobile-icons';
import './index.scss';
import {
    useLocation,
    useNavigate
} from 'react-router-dom';
import NewContent from '@/components/BottomBar/components/NewContent/index.jsx';
const Index = () => {
    // 路由参数
    const location = useLocation();
    const navigation = useNavigate();
    const { pathname } = location;
    // 默认路由
    const [activeKey, setActiveKey] = useState('home');
    // 路由跳转
    useEffect(() => {
        // 初次进入
        if (pathname === '/') {
            navigation(activeKey);
        }
    }, []);
    const setRouteActive = (path) => {
        // 新增作为组件弹出，无需跳转
        if (path === 'new') return;
        setActiveKey(path);
        navigation(path);
    };
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />
        },
        {
            key: 'classroom',
            title: '课堂',
            icon: <VideoOutline />
        },
        {
            key: 'new',
            icon: <AddOutline className='newIcon' fontSize={42} onClick={() => setMaskVisible(true)} />
        },
        {
            key: 'collection',
            title: '收藏',
            icon: active => active ? <StarFill /> : <StarOutline />
        },
        {
            key: 'me',
            title: '我',
            icon: <UserOutline />
        }
    ];
    // 新增按钮的弹出蒙层
    const [maskVisible, setMaskVisible] = useState(false);
    return (
        <>
            <div className='bottomBar'>
                <TabBar className='tab-bar' safeArea={true} activeKey={pathname.replace(/^\/+/, '')}
                        onChange={value => setRouteActive(value)}>
                    {tabs.map((item) => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
            {/* 新增蒙层 */}
            <Mask color='white' visible={maskVisible} opacity={1}>
                <NewContent setVisible={() => setMaskVisible(false)} />
            </Mask>
        </>
    );
};

export default Index;