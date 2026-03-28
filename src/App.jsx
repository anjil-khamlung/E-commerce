import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className=" bg-gray-200 min-h-screen">
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App