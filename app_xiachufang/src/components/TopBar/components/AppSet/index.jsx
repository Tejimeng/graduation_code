import React from 'react';
import './index.scss';
import img_1 from '@/assets/liulan.svg';
import img_2 from '@/assets/caogao.svg';
import img_3 from '@/assets/chuangzuo.svg';
import img_4 from '@/assets/cailan.svg';
import img_5 from '@/assets/wodeke.svg';
import img_6 from '@/assets/dingdan.svg';
import img_7 from '@/assets/gouwu.svg';
import img_8 from '@/assets/qianbao.svg';
import img_9 from '@/assets/chufang.svg';
import img_10 from '@/assets/faxian.svg';
import img_11 from '@/assets/shezhi.svg';
import img_12 from '@/assets/tuichu.svg';
import { Image, Modal, Toast } from 'antd-mobile';
import { clearAccessKey } from '@/store/modules/user.js';
import { useDispatch } from 'react-redux';

const Index = ({ onClose }) => {
    const dispatch = useDispatch();
    const setItems = [
        {
            imgSrc: img_1, text: '浏览历史', clickFunc: () => {
            }
        },
        {
            imgSrc: img_2, text: '草稿箱', clickFunc: () => {
            }
        },
        {
            imgSrc: img_3, text: '创作中心', clickFunc: () => {
            }
        },
        {
            imgSrc: img_4, text: '菜篮子', clickFunc: () => {
            }
        },
        {},// 占位
        {
            imgSrc: img_5, text: '我的课程', clickFunc: () => {
            }
        },
        {
            imgSrc: img_6, text: '订单', clickFunc: () => {
            }
        },
        {
            imgSrc: img_7, text: '购物车', clickFunc: () => {
            }
        },
        {
            imgSrc: img_8, text: '钱包', clickFunc: () => {
            }
        }, {}, {
            imgSrc: img_9, text: '厨房用具', clickFunc: () => {
            }
        }, {
            imgSrc: img_10, text: '发现好友', clickFunc: () => {
            }
        },
        {
            imgSrc: img_11, text: '设置', clickFunc: () => {
            }
        },
        {},// 占位
        , {
            imgSrc: img_12, text: '退出登录', clickFunc: async () => {
                const result = await Modal.confirm({
                    content: '确认退出登录吗？'
                });
                if (result) {
                    onClose();
                    Toast.show({
                        content: '已退出登录',
                        duration: 1000,
                        maskClickable: false,
                        afterClose: async () => {
                            await dispatch(clearAccessKey());
                        }
                    });
                }
            }
        }
    ];

    return (
        <div className={'app_set_container'}>
            {setItems.map((item, index) => (
                <div className='set_item' key={index} onClick={item.clickFunc}>
                    {item.imgSrc && <>
                        <Image className={'item_icon'} src={item.imgSrc}></Image>
                        <p className='item_text'>{item.text}</p></>}
                </div>
            ))}
        </div>
    );
};

export default Index;

