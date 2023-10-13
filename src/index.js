import React from 'react';
  
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  
    
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
     
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
