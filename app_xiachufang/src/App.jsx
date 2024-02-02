import { useState, useLayoutEffect } from 'react';
import { Badge, TabBar, InfiniteScroll, Mask, Switch, Popup } from 'antd-mobile';
// import { DemoBlock } from 'demos'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
    AddOutline,
    AppstoreOutline,
} from 'antd-mobile-icons';
import '@/App.scss';

function App() {
    const tabs = [
        {
            key: 'home',
            title: '首页',
            icon: <AppOutline />,
            badge: Badge.dot,
        },
        {
            key: 'todo',
            title: '待办',
            icon: <UnorderedListOutline />,
            badge: '5',
        },
        {
            key: 'new',
            // title: '新增',
            icon: <AddOutline className="newIcon" fontSize={48} onClick={() => setNewVisible(true)} />,
            badge: '5',
        },
        {
            key: 'message',
            title: '消息',
            icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
            badge: '99+',
        },
        {
            key: 'personalCenter',
            title: '我的',
            icon: <UserOutline />,
        },
    ];
    // 受控组件时采用
    // const [activeKey, setActiveKey] = useState('todo');

    // const [data, setData] = useState([]);
    const [hasMore] = useState(true);
    async function loadMore() {
        // const append = await mockRequest()
        // setData(val => [...val, ...append])
        // setHasMore(append.length > 0)
        console.log('正在加载更多！');
    }
    // 页面的黑白主题
    const [enableDarkMode, setEnableDarkMode] = useState(true);
    useLayoutEffect(() => {
        document.documentElement.setAttribute(
            'data-prefers-color-scheme',
            enableDarkMode ? 'dark' : 'light',
        );
    }, [enableDarkMode]);
    // 新增按钮的弹出蒙层
    const [newVisible, setNewVisible] = useState(false);
    // 多功能按钮
    const [visible3, setVisible3] = useState(false);
    return (
        <>
            {/* 顶部 */}
            <div className="topBar">
                {/* 弹出层按钮 */}
                <AppstoreOutline
                    className="more_func"
                    onClick={() => {
                        setVisible3(true);
                    }}
                />
                {/* 搜索框 */}
            </div>
            {/* 中间 组件渲染区域 */}
            <div className="middleBar">
                <div>Dark Mode</div>
                <Switch
                    checked={enableDarkMode}
                    onChange={(v) => {
                        setEnableDarkMode(v);
                    }}
                />
                <div className="content_div"></div>
                <div className="content_div"></div>
                <div className="content_div"></div>
                <div className="content_div"></div>
                <div className="content_div"></div>
                <div className="content_div"></div>
            </div>
            {/* 底部 */}
            <div className="bottomBar">
                <TabBar className="tab-bar">
                    {tabs.map((item) => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
            {/* 其他不影响布局的区域 */}
            {/* 弹出层 */}
            <Popup
                visible={visible3}
                onMaskClick={() => {
                    setVisible3(false);
                }}
                position="left"
                bodyStyle={{ width: '60vw' }}
            >
                左侧弹出层的内容
            </Popup>

            {/* 新增蒙层 */}
            <Mask color="white" visible={newVisible} onMaskClick={() => setNewVisible(false)}>
                <div>内容</div>
            </Mask>
            {/* 滚动刷新 */}
            {/* <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        threshold={150}
      /> */}
        </>
    );
}

export default App;
