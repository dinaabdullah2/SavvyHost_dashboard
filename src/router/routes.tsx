import { lazy, useContext } from 'react';
import BlogsList from '../pages/Blogs/BlogsList';
import EventsList from '../pages/Events/EventsList';
import { Navigate } from 'react-router-dom';
import CategoriesList from '../pages/Categories/CategoriesList';
import Login from '../pages/Authentication/Login';
import PageBuilder from '../pages/PageBuilder/PageBuilder';
import DomainsList from '../pages/Domains/DomainsList';
import SubscribersList from '../pages/Subscribers/SubscribersList';
import SurroundingsTypesList from '../pages/Hotels/SurroundingsTypesList';
const Index = lazy(() => import('../pages/Index'));

const UsersList = lazy(() => import('../pages/Users/UsersList'));
const PagesList = lazy(() => import('../pages/Pages/PagesList'));
const LoginBoxed = lazy(() => import('../pages/Authentication/Login'));

const routes = [
    // dashboard

    {
        path: '/',
        element: <Index />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/categories',
        element: <CategoriesList />,
    },

    {
        path: '/users',
        element: <UsersList />,
    },
    {
        path: '/pages',
        element: <PagesList />,
    },
    {
        path: '/builder',
        element: <PageBuilder />,
    },
    {
        path: '/blogs',
        element: <BlogsList />,
    },
    {
        path: '/events',
        element: <EventsList />,
    },
    {
        path: '/domains',
        element: <DomainsList />,
    },
    {
        path: '/subscribers',
        element: <SubscribersList />,
    }
    ,
    {
        path: '/surrounding-types',
        element: <SurroundingsTypesList />,
    }
];

export { routes };
