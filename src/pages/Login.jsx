import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [showPassword,setShowPassword]=useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password:'',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,[e.target.name]:e.target.value,
    }))
  }

  const validate = () => {
    const newErrors={}

    //email validation
    if (!formData.email) {
      newErrors.email="Email is required"
    } else if (!formData.email.includes("@")) {
      newErrors.email="Enter valid email"
    }

    //password validation
   if (!formData.password) {
     newErrors.password = "Password is required";
   } else if (formData.password.length < 8) {
     newErrors.password = "Password must be at least 8 characters";
   } else if (!/[A-Z]/.test(formData.password)) {
     newErrors.password = "Password must contain at least one uppercase letter";
   } else if (!/\d/.test(formData.password)) {
     newErrors.password = "Password must contain at least one number";
   } else if (!/[@$!%*?&]/.test(formData.password)) {
     newErrors.password =
       "Password must contain at least one special character";
   }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return
    
    //api call

    setFormData({
      email: '',
      password:'',
    })

    navigate("/")
  }
  return (
    <div className=" h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-96 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {/*email*/}
        <div >
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Example: abc@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/*password*/}
        <div className="relative">
          <label className="font-semibold">Password</label>
          <input
            type={showPassword?"text":"password"}
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full border rounded p-2 mt-1"
            placeholder="Example: abc134"
          />
          <span onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-9 cursor-pointer'>{showPassword ? "🙈" : "🐵"}</span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-center text-white rounded font-bold p-2 hover:bg-blue-600 transition cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login