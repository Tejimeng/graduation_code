import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/index.jsx';
import 'amfe-flexible';
import '@/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </Suspense>
    // </React.StrictMode>
);
