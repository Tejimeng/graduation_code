// 用户子仓库
import { createSlice } from '@reduxjs/toolkit';
import { setLocalToken, getLocalToken } from '@/utils/localStorage.js';

const userStore = createSlice({
    name: 'user',
    initialState: {
        accessKey: getLocalToken() || '',
        // 用户的个人信息
        account: '',
        username: '',
        avatar: '',
        gender: '',
        birthday: '',
        hometown: '',
        bio: ''
    },
    // 同步修改
    reducers: {
        setAccessKey(state, action) {
            state.accessKey = action.payload;
            setLocalToken(state.accessKey);
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
const { setAccessKey, setUserProfile } = userStore.actions;
export { setAccessKey, setUserProfile };
export default userStore.reducer;