import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './Context.js';
import MyRoutes from './MyRoutes.js';
ReactDOM.render(
  <ThemeProvider>
    <MyRoutes />
  </ThemeProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
