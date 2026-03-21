import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'

const App = () => {
  return (
    <div className=' bg-gray-200 min-h-screen'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App