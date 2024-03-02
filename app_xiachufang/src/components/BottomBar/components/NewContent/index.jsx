import React from 'react';
import { CloseOutline } from 'antd-mobile-icons';
import { Image, Avatar } from 'antd-mobile';
import posterCover from '@/assets/Snipaste_2024-02-23_15-17-48.png';
import recipeIcon from '@/assets/recipe.svg';
import workIcon from '@/assets/work.svg';
import dietIcon from '@/assets/diet.svg';
import { useSelector } from 'react-redux';
import './index.scss';
const Index = ({ setVisible }) => {
    const avatar = useSelector((state) => state.user.avatar);
    // 食谱
    const recipeFun = () => {
        console.log(1);
    };
    // 作品
    // 饮食
    return (
        <div className="new_container">
            <CloseOutline className="new_close_button" onClick={setVisible} color={'#999'} />
            {avatar && (
                <Avatar
                    className={'my_avatar'}
                    src={avatar}
                    style={{ '--size': '100px', '--border-radius': '50%' }}
                />
            )}

            <Image className={'poster_cover'} src={posterCover}></Image>
            <div className="operation_container">
                <div className="operation_item">
                    <div className="icon_container icon_container_recipe" onClick={recipeFun}>
                        <Image className={'operation_icon'} src={recipeIcon}></Image>
                    </div>
                    <p className="title">传食谱</p>
                </div>
                <div className="operation_item">
                    <div className="icon_container icon_container_work" onClick={recipeFun}>
                        <Image className={'operation_icon'} src={workIcon}></Image>
                    </div>
                    <p className="title">传作品</p>
                </div>
                <div className="operation_item">
                    <div className="icon_container icon_container_diet" onClick={recipeFun}>
                        <Image className={'operation_icon'} src={dietIcon}></Image>
                    </div>
                    <p className="title">记饮食</p>
                </div>
            </div>
        </div>
    );
};

export default Index;
