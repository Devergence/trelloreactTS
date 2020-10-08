import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppStateProvide } from "./AppStateContext";

ReactDOM.render(
  <AppStateProvide>
    <App />
  </AppStateProvide>,
  document.getElementById('root')
);
