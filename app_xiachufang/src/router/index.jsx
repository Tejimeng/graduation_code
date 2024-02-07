import { createBrowserRouter } from 'react-router-dom';

import routes from './routes.jsx';

//可传第二个参数，配置base路径 { basename: "/app"}，用作nginx转发路径
const router = createBrowserRouter(routes);

export default router;
