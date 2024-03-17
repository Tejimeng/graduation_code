import axios from 'axios';
import { Toast } from 'antd-mobile';
import { FrownFill, GlobalOutline } from 'antd-mobile-icons';
import store from '@/store/index.js';
import { setUserExit } from '@/store/modules/user.js';
import { clearToken } from '@/utils/localStorage.js';

const request = axios.create({
    baseURL: 'http://localhost:9210/xiachufang',
    timeout: 5000
});
request.interceptors.request.use((config) => {
    // 不监控
    let accessKey = store.getState().user.accessKey;
    if (accessKey) {
        config.headers.authorization = accessKey;
    }
    return config;
});
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log(error);
    let status = error.response.status;
    switch (status) {
        case 403:
            Toast.show({
                content: '您的身份信息失效了，请重新登录',
                duration: 1000,
                icon: <FrownFill />,
                afterClose: () => {
                    // 清除用户的信息
                    clearToken()
                    // 暂时不知道为什么不会调用，先手动拉起清理
                    // setUserExit();
                    // 认证过期，进行重定向到首页
                    // 暂时直接跳转，这样做会导致页面重新刷新，后期考虑使用钩子实现
                    window.location.href = '/';
                }
            });
            break;
        case 404:
            Toast.show({
                content: '发生错误了，请稍后再试！',
                duration: 1000,
                icon: <FrownFill />
            });
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            Toast.show({
                content: '服务器发生错误，请稍后再试！',
                duration: 1000,
                icon: <GlobalOutline />
            });
            break;
    }
    return Promise.reject(new Error(error.message));
});

export default request;