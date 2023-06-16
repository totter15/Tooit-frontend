import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Vote from './pages/Vote';
import My from './pages/My';

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
    {
      path: '/my',
      element: <My />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
