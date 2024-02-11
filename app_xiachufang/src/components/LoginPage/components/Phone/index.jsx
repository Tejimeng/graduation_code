import React, { useState } from 'react';
import './index.scss';
import { DownFill, LeftOutline } from 'antd-mobile-icons';
import { Button, Input, Popup, Toast } from 'antd-mobile';
import VerifiCode from '@/components/LoginPage/components/Phone/VerifiCode/index.jsx';
import Password from '@/components/LoginPage/components/Phone/Password/index.jsx';

const Index = ({ onClose }) => {
    const [phone, setPhone] = useState('');
    const [areaCode, setAreaCode] = useState('+86');
    const [verification_code, setVerification_code] = useState(100000);
    // 组件控制code 1为验证码组件 2为密码登录组件
    const [componentCode, setComponentCode] = useState(0);
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
            afterClose: () => {
                // 弹窗跳转
                setComponentCode(1);
                setVisibleOther(true);
            }
        });
    };
    // 密码登录
    const password_login = () => {
        // 弹窗跳转
        setComponentCode(2);
        setVisibleOther(true);
    };
    // pop控制
    const [visibleOther, setVisibleOther] = useState(false);
    // 顶部显示手机验证码，添加验证码输入框
    return (
        <>
            {/*主体登录容器*/}
            <div className={'phone_container'}>
                <div className='back'><LeftOutline className={'back_button'} onClick={onClose} /></div>
                <div className='verification '>
                    <div className='verification_title'>手机验证码登录</div>
                    <div className='verification_body'>
                        <div className='phone_area' onClick={changeArea}>{areaCode}&nbsp;<DownFill /></div>
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
                <div className='password_button' onClick={password_login}>密码登录</div>
            </div>
            {/*额外弹窗*/}
            <Popup
                visible={visibleOther}
                onMaskClick={() => {
                    setVisibleOther(false);
                }}
                position='right'
                bodyStyle={{ width: '100vw' }}
            >
                {componentCode === 1 ?
                    // 验证码组件
                    <VerifiCode verification_code={verification_code} areaCode={areaCode} phone={phone} back={() => {
                        setComponentCode(0);
                        setVisibleOther(false);
                    }} phoneClose={onClose}
                    /> :
                    // 密码组件
                    <Password
                        areaCode={areaCode} back={() => {
                        setComponentCode(0);
                        setVisibleOther(false);
                    }} phoneClose={onClose}
                    />}
            </Popup>
        </>
    );
};

export default Index;