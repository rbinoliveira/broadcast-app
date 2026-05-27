import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './layout'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{ path: '/', element: <div>home</div> }],
  },
])
