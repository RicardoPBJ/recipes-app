import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DrinksProvider, MealsProvider } from './hooks';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DrinksProvider>
      <MealsProvider>
        <App />
      </MealsProvider>
    </DrinksProvider>
  </BrowserRouter>,
);
