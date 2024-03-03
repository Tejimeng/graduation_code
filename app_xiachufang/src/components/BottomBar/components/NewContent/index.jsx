import React, { useCallback, useState } from 'react';
import { CloseOutline } from 'antd-mobile-icons';
import { Image, Avatar, Popup } from 'antd-mobile';
import posterCover from '@/assets/Snipaste_2024-02-23_15-17-48.png';
import recipeIcon from '@/assets/recipe.svg';
import workIcon from '@/assets/work.svg';
import dietIcon from '@/assets/diet.svg';
import { useSelector } from 'react-redux';
import UploadRecipes from '@/components/BottomBar/components/UploadRecipes/index.jsx';

import './index.scss';
import Login from '@/components/LoginPage/index.jsx';

const Index = ({ setVisible }) => {
    const isLogin = useSelector(state => state.user.isLogin);
    const avatar = useSelector(state => state.user.avatar);
    // 弹窗相关
    const [newVisible, setNewVisible] = useState(false);
    const [componentIndex, setComponentIndex] = useState(0);
    // 操作
    const operations = [
        { key: 'recipe', icon: recipeIcon, title: '传食谱', onClick: () => openPopup(1) },
        { key: 'work', icon: workIcon, title: '传作品', onClick: () => openPopup(2) },
        { key: 'diet', icon: dietIcon, title: '记饮食', onClick: () => openPopup(3) }
    ];

    // 弹窗打开函数，设置组件索引并显示弹窗
    const openPopup = useCallback((index) => {
        setComponentIndex(index);
        setNewVisible(true);
    }, []);
    return (
        <div className='new_container'>
            <CloseOutline className='new_close_button' onClick={setVisible} color={'#000'} />
            {/* 条件渲染用户头像 */}
            {isLogin && (
                <Avatar
                    className={'my_avatar'}
                    src={avatar}
                    style={{ '--size': '100px', '--border-radius': '50%' }}
                />
            )}
            <Image className={'poster_cover'} src={posterCover}></Image>
            <div className='operation_container'>
                {operations.map(({ key, icon, title, onClick }) => (
                    <div key={key} className='operation_item'>
                        <div className={`icon_container icon_container_${key}`} onClick={onClick}>
                            <Image className={'operation_icon'} src={icon}></Image>
                        </div>
                        <p className='title'>{title}</p>
                    </div>
                ))}
            </div>
            {/* 中心弹窗 */}
            <Popup
                bodyStyle={{ height: '100vh', width: '100vw' }}
                visible={newVisible}
                position={'right'}
                onClose={() => setNewVisible(false)}
            >
                {isLogin ?
                    (
                        componentIndex === 1 ?
                            <UploadRecipes onClose={() => setNewVisible(false)} /> :
                            (componentIndex === 2 ?
                                    <div>222</div> :
                                    null
                            )
                    ) :
                    <Login login_title_index={0} closeButtonVisible={true} closeButtonFunc={() => setNewVisible(false)}
                           outSideHeight={550} containerTop={140} footerBottom={1} />
                }
                {/* 根据需要添加更多的组件条件渲染 */}
            </Popup>
        </div>
    );
};

export default Index;
