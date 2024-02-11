import React, { useEffect, useState } from 'react';
import './index.scss';
import { LeftOutline } from 'antd-mobile-icons';
import { Button, Input, Toast } from 'antd-mobile';
import { test } from '@/api/Login/index.js';

const Index = ({ areaCode, phone, verification_code, back, phoneClose }) => {
    // 验证码
    const [verificode, setVerificode] = useState('');
    // 挂载
    useEffect(() => {
        // 将之前的验证码置为空 bug
        setVerificode('');
        // 提示验证码信息
        // Toast.show({
        //     content: `您的验证码为${verification_code}，十分钟内有效！`,
        //     position: 'top',
        //     duration: 3000,
        //     maskClickable: false,
        // });
    }, []);
    // 登录
    const user_login = async () => {
        // 进行登录
        const result = await test({ phone });
        console.log(result);
        // 将之前的验证码置为空 bug
        setVerificode('');
        // 成功
        Toast.show({
            content: `登录中${verification_code}`,
            icon: 'loading',
            duration: 2000,
            maskClickable: false,
            afterClose: () => {
                // 进行个人信息的存储（redux）和回显


                // 跳转之前的页面
                // 关闭验证码pop
                // back();
                // // 关闭phone登录pop
                // phoneClose();
            }
        });
    };
    return (
        <>
            {/*主体登录容器*/}
            <div className={'verificode_container'}>
                <div className='backToPhone'><LeftOutline className={'backToPhone_button'} onClick={back} /></div>
                <div className='verificode'>
                    <div className='verificode_title'>输入验证码</div>
                    <div
                        className='verificode_info'>验证码已发送至&nbsp;{areaCode}&nbsp;{phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')}</div>
                    <div className='verificode_body'>
                        <Input
                            clearable
                            type={'number'}
                            className={'verificode_input'}
                            placeholder='请输入验证码'
                            value={verificode}
                            onChange={value => {
                                setVerificode(value);
                            }}
                        />
                    </div>
                    <Button disabled={!(verificode && verificode.length === 6)}
                            className={'verificode_button'} onClick={user_login}>登录</Button>
                </div>
            </div>

        </>
    );
};

export default Index;