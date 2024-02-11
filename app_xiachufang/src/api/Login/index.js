import request from '@/utils/request.jsx';

export const test = (data) => request({
    url: '/login',
    method: 'POST',
    data
});