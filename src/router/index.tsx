import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import Login from '../pages/Authentication/Login';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';



const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: localStorage.getItem('token') ?  <DefaultLayout>{route.element}</DefaultLayout> :  <BlankLayout><Login /></BlankLayout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
