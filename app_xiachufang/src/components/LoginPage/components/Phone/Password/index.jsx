import React, { useState } from 'react';
import './index.scss';
import { DownFill, LeftOutline } from 'antd-mobile-icons';
import { Button, Input, Popup, Toast } from 'antd-mobile';
import VerifiCode from '@/components/LoginPage/components/Phone/VerifiCode/index.jsx';

const Index = ({ onClose }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [areaCode, setAreaCode] = useState('+86');
    const [verification_code, setVerification_code] = useState(100000);
    const changeArea = () => {
        Toast.show({
            content: '暂只支持中国大陆用户'
        });
    };
    // 手机正则
    const chinesePhoneNumberRegex = /^1[3456789]\d{9}$/;
    // 收取验证码
    const collect = () => {
        // 在此之前测试连接是否正常，若是正常则跳转并且获取验证码
        setVerification_code(123456);
        Toast.show({
            content: `已向手机号码${phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')}发送验证码，请注意查收！`,
            position: 'top',
            maskClickable: false,
        });
    };
    return (
        <>
            {/*主体登录容器*/}
            <div className={'password_container'}>
                <div className='password_back'><LeftOutline className={'password_back_button'} onClick={onClose} />
                </div>
                <div className='password '>
                    <div className='password_title'>密码登录</div>
                    <div className='password_body'>
                        <div className='password_phone_area' onClick={changeArea}>{areaCode}&nbsp;<DownFill /></div>
                        <Input
                            clearable
                            type={'number'}
                            className={'password_phone_input'}
                            placeholder='请输入手机号码'
                            value={phone}
                            onChange={value => {
                                setPhone(value);
                            }}
                        />
                        <Input
                            clearable
                            type={'password'}
                            className={'password_input'}
                            placeholder='请输入密码'
                            value={password}
                            onChange={value => {
                                setPassword(value);
                            }}
                        />
                    </div>
                    <Button disabled={!chinesePhoneNumberRegex.test(phone)}
                            className={'verification_button'} onClick={collect}>登录</Button>
                    <div className='verification_footer'>登录时遇到问题</div>
                </div>
                <div className='password_button'>验证码登录</div>
            </div>
        </>
    );
};

export default Index;