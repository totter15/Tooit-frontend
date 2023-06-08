import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Vote from './pages/Vote';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: '/vote',
      element: <Vote />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
