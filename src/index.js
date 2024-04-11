import 'bootstrap/dist/css/bootstrap.min.css';
import 'helpers/initFA';
import { AuthProvider } from 'providers/AuthProvider';
import { UserProvider } from 'providers/UserProvider';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';

const container = document.getElementById('main');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
