import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SignUp: React.FC = () => {
  const { register } = useAuth()

  const [data, setData] = useState({
  name: '',
  email: '',
  password: '',
})


console.log(data)

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setData({
    ...data,
    [e.target.name]: value,
  })
}

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const mydata = await register(data.name, data.email, data.password);
    console.log(mydata)

      navigate('/Sign-In')
      console.log(data)
      console.log('sign-up successful')
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-slate-950">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded"
              placeholder="Full Name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-slate-950 text-slate-300 py-2 px-10 rounded-md mt-2 w-fit hover:bg-slate-500 font-bold focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
