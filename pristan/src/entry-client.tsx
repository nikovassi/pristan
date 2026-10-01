import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const root = document.getElementById('root')!
const norm = (p: string) => p.replace(/\/+$/, '') || '/'
if (root.hasChildNodes() && norm(root.dataset.route || '') === norm(window.location.pathname)) hydrateRoot(root, app)
else {
  root.innerHTML = ''
  createRoot(root).render(app)
}
