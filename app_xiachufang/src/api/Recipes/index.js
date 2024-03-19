import request from '@/utils/request.jsx';
// 验证码登录
export const uploadRecipes = (data) =>
    request({
        url: '/uploadRecipes',
        method: 'POST',
        data
    });
