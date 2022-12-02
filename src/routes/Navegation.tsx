import {
  AddOrEdit,
  Stories 
} from '@/pages'

import {
  createBrowserRouter
} from 'react-router-dom'
import App from '../App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Stories />
      },
      {
        path: '/add-story',
        element: <AddOrEdit />
      },
      {
        path: '/update/:id',
        element: <AddOrEdit />
      }
    ]
  },
  {
    path: '*',
    element: <p>There's nothing here: 404!</p>,
  }
])

export default router