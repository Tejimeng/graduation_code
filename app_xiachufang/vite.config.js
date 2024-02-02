import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postCssPxToRem from 'postcss-pxtorem';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // 别名配置
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    // 进行移动端的px和rem的适配
    css: {
        postcss: {
            plugins: [
                postCssPxToRem({
                    rootValue: 37.5,
                    propList: ['*']
                })
            ]
        }
    }
});
