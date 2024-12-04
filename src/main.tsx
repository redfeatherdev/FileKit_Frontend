import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import { Toaster } from 'sonner'
import './index.css'
import './satoshi.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster richColors position='top-center' duration={2000} />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
