import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App