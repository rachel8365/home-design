import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/js/bootstrap"

<html lang="en" dir="rtl"></html>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  /*   <div dir="rtl"> */
  <React.StrictMode>
    <App />
  </React.StrictMode>
  /*  </div> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
