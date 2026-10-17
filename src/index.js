import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContentPage from './ContentPage';
import site from './siteContent.json';
import reportWebVitals from './reportWebVitals';

const path = window.location.pathname.replace(/\/$/, '') || '/';
const page = site.pages.find(item => item.path === path);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {path === '/' ? <App /> : page ? <ContentPage page={page} /> : <main><h1>Page not found</h1><a href="/">Return to THE BARLI</a></main>}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
