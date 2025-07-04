import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './responsive.css';


import { BrowserRouter } from 'react-router-dom';

/*  ➡️ toastify  */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    {/* toast container must be rendered once, at app root */}
    <ToastContainer position="top-right" autoClose={3000} newestOnTop />
  </BrowserRouter>
);
