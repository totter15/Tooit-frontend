import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Start from './pages/Start';

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
