import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <div>404 Not Found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
