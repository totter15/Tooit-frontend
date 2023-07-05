import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
<<<<<<< HEAD
import Vote from './pages/Vote';
import My from './pages/My';
import Header from './components/Header';
import Account from './pages/Account';
=======
import Start from './pages/Start';
import MakeVote from './pages/MakeVote';
import Header from './components/Header';
>>>>>>> feature/home

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Start />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: '/home',
      element: <Home />,
      errorElement: <div>404 Not Found</div>,
    },
    {
<<<<<<< HEAD
      path: '/vote',
      element: <Vote />,
    },
    {
      path: '/my',
      element: <My />,
    },
    {
      path: '/account',
      element: <Account />,
=======
      path: '/makeVote',
      element: <MakeVote />,
      errorElement: <div>404 Not Found</div>,
>>>>>>> feature/home
    },
  ]);

  return (
    <div className="app">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
