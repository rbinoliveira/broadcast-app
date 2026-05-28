import { createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { PublicRoute } from '@/features/auth/components/public-route'
import { FullScreenLoader } from '@/shared/components/full-screen-loader'

export const router = createBrowserRouter([
  {
    hydrateFallbackElement: <FullScreenLoader />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/login',
            lazy: async () => {
              const { LoginPage } =
                await import('@/features/auth/pages/login-page')
              return { Component: LoginPage }
            },
          },
          {
            path: '/signup',
            lazy: async () => {
              const { SignupPage } =
                await import('@/features/auth/pages/signup-page')
              return { Component: SignupPage }
            },
          },
          {
            path: '/forgot-password',
            lazy: async () => {
              const { ForgotPasswordPage } =
                await import('@/features/auth/pages/forgot-password-page')
              return { Component: ForgotPasswordPage }
            },
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            lazy: async () => {
              const { DashboardPage } =
                await import('@/features/dashboard/pages/dashboard-page')
              return { Component: DashboardPage }
            },
          },
          {
            path: '/connections',
            lazy: async () => {
              const { ConnectionsPage } =
                await import('@/features/connections/pages/connections-page')
              return { Component: ConnectionsPage }
            },
          },
          {
            path: '/contacts',
            lazy: async () => {
              const { ContactsPage } =
                await import('@/features/contacts/pages/contacts-page')
              return { Component: ContactsPage }
            },
          },
          {
            path: '/connections/:connectionId/contacts',
            lazy: async () => {
              const { ContactsPage } =
                await import('@/features/contacts/pages/contacts-page')
              return { Component: ContactsPage }
            },
          },
          {
            path: '/messages',
            lazy: async () => {
              const { MessagesPage } =
                await import('@/features/messages/pages/messages-page')
              return { Component: MessagesPage }
            },
          },
        ],
      },
    ],
  },
])
