// 用户子仓库
import { createSlice } from '@reduxjs/toolkit';
import { setLocalToken, getLocalToken, clearToken } from '@/utils/localStorage.js';

const userStore = createSlice({
    name: 'user',
    initialState: {
        accessKey: getLocalToken() || '',
        isLogin: !!getLocalToken(),
        // 用户的个人信息
        account: '',
        username: '',
        avatar: 'https://s11.ax1x.com/2023/06/09/pCEADYt.jpg',
        gender: '',
        birthday: '',
        hometown: '',
        bio: ''
    },
    reducers: {
        setUserLogin(state, action) {
            state.accessKey = action.payload;
            state.isLogin = !!action.payload;
            setLocalToken(state.accessKey);
        },
        setUserExit(state) {
            state.accessKey = '';
            state.isLogin = false;
            clearToken();
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
//actionCreater`
const { setUserLogin, setUserProfile, setUserExit } = userStore.actions;
export { setUserLogin, setUserProfile, setUserExit };
export default userStore.reducer;
