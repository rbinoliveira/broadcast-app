import { createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { PublicRoute } from '@/features/auth/components/public-route'
import { ForgotPasswordPage } from '@/features/auth/pages/forgot-password-page'
import { LoginPage } from '@/features/auth/pages/login-page'
import { SignupPage } from '@/features/auth/pages/signup-page'
import { ConnectionsPage } from '@/features/connections/pages/connections-page'
import { ContactsPage } from '@/features/contacts/pages/contacts-page'
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page'
import { MessagesPage } from '@/features/messages/pages/messages-page'

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
      { path: '/', element: <DashboardPage /> },
      { path: '/connections', element: <ConnectionsPage /> },
      { path: '/contacts', element: <ContactsPage /> },
      {
        path: '/connections/:connectionId/contacts',
        element: <ContactsPage />,
      },
      { path: '/messages', element: <MessagesPage /> },
    ],
  },
])
