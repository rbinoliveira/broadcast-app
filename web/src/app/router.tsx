import { createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { PublicRoute } from '@/features/auth/components/public-route'
import { ForgotPasswordPage } from '@/features/auth/pages/forgot-password-page'
import { LoginPage } from '@/features/auth/pages/login-page'
import { SignupPage } from '@/features/auth/pages/signup-page'
import { ContactsPage } from '@/features/contacts/pages/contacts-page'
import { HomePage } from '@/features/home/pages/home-page'

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/contacts', element: <ContactsPage /> },
      {
        path: '/connections/:connectionId/contacts',
        element: <ContactsPage />,
      },
    ],
  },
])
