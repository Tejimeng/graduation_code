import React, { useEffect, useState } from 'react';
import './index.scss';
import { DownFill, LeftOutline } from 'antd-mobile-icons';
import { Button, Input, Toast } from 'antd-mobile';

const Index = ({ phoneClose, back }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [areaCode, setAreaCode] = useState('+86');
    const changeArea = () => {
        Toast.show({
            content: '暂只支持中国大陆用户'
        });
    };
    // 挂载去除
    useEffect(() => {
        setPhone('');
        setPassword('');
    }, []);
    // 手机正则
    const chinesePhoneNumberRegex = /^1[3456789]\d{9}$/;
    // 收取验证码
    const collect = () => {
        // 置空
        setPhone('');
        setPassword('');
        // 在此之前进行密码登录的流程
        Toast.show({
            content: '正在登录中，请稍等~',
            position: 'top',
            duration: 2000,
            maskClickable: false,
            afterClose: () => {
                // 进行个人信息的存储（redux）和回显


                // 跳转之前的页面
                // 关闭验证码pop
                back();
                // 关闭phone登录pop
                phoneClose();
            }
        });
    };
    return (
        <>
            {/*主体登录容器*/}
            <div className={'password_container'}>
                <div className='password_back'><LeftOutline className={'password_back_button'} onClick={back} />
                </div>
                <div className='password '>
                    <div className='password_title'>密码登录</div>
                    <div className='password_phone'>
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
                    </div>
                    <div className={'password_input_container'}>
                        <Input
                            clearable
                            className={'password_input'}
                            type={'password'}
                            placeholder='请输入密码'
                            value={password}
                            onChange={value => {
                                setPassword(value);
                            }}
                        />
                    </div>
                    <Button disabled={!chinesePhoneNumberRegex.test(phone) || !password}
                            className={'login_button'} onClick={collect}>登录</Button>
                    <div className='password_footer'>登录时遇到问题</div>
                </div>
                <div className='password_verifi_button' onClick={back}>验证码登录</div>
            </div>
        </>
    );
};

export default Index;