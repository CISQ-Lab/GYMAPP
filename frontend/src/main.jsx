import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GymProvider } from './context/GymContext.jsx'
import { CashDrawerProvider } from './context/CashDrawerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <GymProvider>
            <CashDrawerProvider>
              <App />
            </CashDrawerProvider>
          </GymProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
