import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Vote from './pages/Vote';
import My from './pages/My';
import Header from './components/Header';
import Account from './pages/Account';
import Start from './pages/Start';
import MakeVote from './pages/MakeVote';

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
    },
    {
      path: '/makeVote',
      element: <MakeVote />,
    },
    {
      path: '/vote/:voteId',
      element: <Vote />,
    },
    {
      path: '/my',
      element: <My />,
    },
    {
      path: '/account',
      element: <Account />,
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
