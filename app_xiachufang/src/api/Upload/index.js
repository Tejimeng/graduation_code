import request from '@/utils/request.jsx';
// 验证码登录
export const uploadImage = (data) =>
    request({
        url: '/uploadImage',
        method: 'POST',
        data
    });
