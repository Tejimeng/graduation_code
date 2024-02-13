import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/index.jsx';
import { Provider } from 'react-redux';
import store from '@/store/index.js';
import 'amfe-flexible';
import '@/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router}>
                    <App />
                </RouterProvider>
            </Suspense>
        </Provider>
    </React.StrictMode>
);
