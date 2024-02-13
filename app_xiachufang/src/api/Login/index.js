import request from '@/utils/request.jsx';
// 验证码登录
export const loginVerificationCode = (data) => request({
    url: '/login_verification_code',
    method: 'POST',
    data
});
// 密码登录
export const loginPassword = (data) => request({
    url: '/login_password',
    method: 'POST',
    data
});