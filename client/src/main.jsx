import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GOOGLE_CLIENT_ID } from './utils/googleAuth'

/* Root entry — providers wrap the app for auth, routing, and toasts */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1E293B',
                color: '#F8FAFC',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
              },
              success: { iconTheme: { primary: '#22C55E', secondary: '#1E293B' } },
              error: { iconTheme: { primary: '#EF4444', secondary: '#1E293B' } },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
