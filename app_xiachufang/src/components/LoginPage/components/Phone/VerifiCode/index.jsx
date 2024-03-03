import React, { useEffect, useState } from 'react';
import './index.scss';
import { FrownFill, LeftOutline } from 'antd-mobile-icons';
import { Button, Input, Toast } from 'antd-mobile';
import { loginVerificationCode } from '@/api/Login/index.js';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '@/store/modules/user.js';

const Index = ({ areaCode, phone, verification_code, back, phoneClose }) => {
    // 仓库
    const dispatch = useDispatch();
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
        try {
            const result = await loginVerificationCode({ account: phone });
            // 成功
            if (result.status === 'success') {
                // 将之前的验证码置为空 bug
                setVerificode('');
                Toast.show({
                    content: result.message,
                    icon: result.status,
                    duration: 2000,
                    maskClickable: false,
                    afterClose: async () => {
                        // 进行个人信息的存储（redux）和回显
                        await dispatch(setUserLogin(result.data.accessKey));
                        // 跳转之前的页面
                        // 关闭验证码pop
                        back();
                        // // 关闭phone登录pop
                        phoneClose();
                    }
                });
            } else {
                Toast.show({
                    content: '登录出现问题，请稍后再试',
                    duration: 1000,
                    icon: 'fail',
                    maskClickable: false,
                    afterClose: () => {
                        // 进行记录回溯
                        back();
                        phoneClose();
                    }
                });
            }
        } catch (e) {
            console.log(e);
            Toast.show({
                content: '服务器开小差了，请稍等',
                duration: 1000,
                icon: <FrownFill />,
                maskClickable: false,
                afterClose: () => {
                    // 进行记录回溯
                    back();
                    phoneClose();
                }
            });
        }
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
                    <div className='tip'>未注册的用户将会直接注册</div>
                </div>
            </div>

        </>
    );
};

export default Index;