import axios from 'axios';
import { Toast } from 'antd-mobile';
import { FrownFill, GlobalOutline } from 'antd-mobile-icons';
import store from '@/store/index.js';

const request = axios.create({
    baseURL: 'http://localhost:9210/xiachufang',
    timeout: 5000
});
// 请求拦截器
request.interceptors.request.use((config) => {
    let state = store.getState();
    let accessKey = state.user.accessKey;
    if (accessKey) {
        config.headers.authorization = accessKey;
    }
    return config;
});
// 响应拦截器
request.interceptors.response.use((response) => {
    // 数据简化
    return response.data;
}, (error) => {
    // 处理http网络错误
    let status = error.response.status;
    switch (status) {
        case 404:
            // 错误提示信息
            Toast.show({
                content: '发生错误了，请稍后再试！',
                duration: 1000,
                icon: <FrownFill />
            });
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            // 错误提示信息
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