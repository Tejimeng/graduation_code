import React, { useEffect, useState } from 'react';
import './index.scss';
import { DownFill, LeftOutline } from 'antd-mobile-icons';
import { Button, Input, Toast } from 'antd-mobile';

const Index = ({ onClose }) => {
    const [phone, setPhone] = useState('');
    const changeArea = () => {
        Toast.show({
            content: '暂只支持中国大陆用户'
        });
    };
    // 手机正则
    const chinesePhoneNumberRegex = /^1[3456789]\d{9}$/;
    const collect = () => {
        Toast.show({
            content: phone
        });
    };
    // 顶部显示手机验证码，添加验证码输入框
    return (
        <div className={'phone_container'}>
            <div className='back'><LeftOutline className={'back_button'} onClick={onClose} /></div>
            <div className='verification '>
                <div className='verification_title'>手机验证码登录</div>
                <div className='verification_body'>
                    <div className='phone_area' onClick={changeArea}>+{86}&nbsp;<DownFill /></div>
                    <Input
                        clearable
                        type={'number'}
                        className={'verification_input'}
                        placeholder='请输入手机号码'
                        value={phone}
                        onChange={value => {
                            setPhone(value);
                        }}
                    />
                </div>
                <Button disabled={!chinesePhoneNumberRegex.test(phone)}
                        className={'verification_button'} onClick={collect}>收取验证码</Button>
                <div className='verification_footer'>登录时遇到问题</div>
            </div>
            <div className='password_button'>密码登录</div>
        </div>
    );
};

export default Index;