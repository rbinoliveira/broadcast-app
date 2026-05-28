import '@/shared/styles/index.css'

import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { AppProviders } from '@/app/providers'
import { router } from '@/app/router'
import { FullScreenLoader } from '@/shared/components/full-screen-loader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <Suspense fallback={<FullScreenLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppProviders>
  </StrictMode>,
)
