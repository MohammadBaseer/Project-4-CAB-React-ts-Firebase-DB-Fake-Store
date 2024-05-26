import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
// import './assets/css/style.css'
import './assets/css/media-queries.css'
import '/node_modules/primeflex/primeflex.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
