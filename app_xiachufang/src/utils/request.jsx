import axios from 'axios';
import { Toast } from 'antd-mobile';
import { FrownFill, GlobalOutline } from 'antd-mobile-icons';

const request = axios.create({
    baseURL: 'http://localhost:9210/xiachufang',
    timeout: 5000
});
// 请求拦截器
request.interceptors.request.use((config) => {
    // 仓库token储存，以及相关的用户信息储存
    // let useStore=useUserStore()
    // // token为公共参数，如果用户登录则需要携带才能发起相应的请求
    // if (useStore.userInfo.token){
    //     config.headers.token=useStore.userInfo.token
    // }
    //config:请求拦截器回调注入的对象（配置对象），配置对象的身上最终要的一件事情headers属性
    //可以通过请求头携带公共参数-token
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