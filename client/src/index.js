import React from 'react';
import './index.css';
import App from './App';
import DataProvider from './redux/store';
import { createRoot } from 'react-dom/client';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
  <DataProvider>
    <App />
    </DataProvider>
</React.StrictMode>);
