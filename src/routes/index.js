import App from 'App';
import Landing from 'components/Landing';
import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';
import Spotify from 'components/spotify/Spotify';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import ErrorLayout from '../layouts/ErrorLayout';
import paths, { rootPaths } from './paths';

const routes = [
  {
    element: <App />,
    children: [
      {
        path: rootPaths.errorsRoot,
        element: <ErrorLayout />,
        children: [
          {
            path: paths.error404,
            element: <Error404 />
          },
          {
            path: paths.error500,
            element: <Error500 />
          }
        ]
      },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: paths.landing,
            element: <Landing />
          },
          {
            path: paths.spotify,
            element: <Spotify />
          }
        ]
      },
      {
        path: '*',
        element: <Navigate to={paths.error404} replace />
      }
    ]
  }
];

export const router = createBrowserRouter(routes, {
  basename: process.env.PUBLIC_URL
});

export default routes;
