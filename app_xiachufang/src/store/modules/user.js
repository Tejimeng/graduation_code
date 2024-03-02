// 用户子仓库
import { createSlice } from '@reduxjs/toolkit';
import { setLocalToken, getLocalToken, clearToken } from '@/utils/localStorage.js';

const userStore = createSlice({
    name: 'user',
    initialState: {
        accessKey: getLocalToken() || '',
        // 用户的个人信息
        account: '',
        username: '',
        avatar: 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
        gender: '',
        birthday: '',
        hometown: '',
        bio: ''
    },
    reducers: {
        setAccessKey(state, action) {
            state.accessKey = action.payload;
            setLocalToken(state.accessKey);
        },
        clearAccessKey(state) {
            console.log(getLocalToken());
            state.accessKey = '';
            clearToken();
            console.log(getLocalToken());
        },
        setUserProfile(state, action) {
            // 一次性处理多个用户个人信息
            const { account, username, avatar, gender, birthday, hometown, bio } = action.payload;
            state.account = account;
            state.username = username;
            state.avatar = avatar;
            state.gender = gender;
            state.birthday = birthday;
            state.hometown = hometown;
            state.bio = bio;
        }
    }
});
//actionCreater
const { setAccessKey, setUserProfile, clearAccessKey } = userStore.actions;
export { setAccessKey, setUserProfile, clearAccessKey };
export default userStore.reducer;
