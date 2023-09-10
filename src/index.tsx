import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './slices';
import { CookiesProvider } from 'react-cookie';

window.Kakao.init('eb0efa26dc3318fbc4fc44e031dd095c');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </CookiesProvider>,

  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
