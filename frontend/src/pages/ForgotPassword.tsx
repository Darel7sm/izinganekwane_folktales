// src/pages/ForgotPassword.tsx
import React, { useState } from 'react'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(
        'http://localhost:5400/api/users/forgot-password',
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ email })
      
    })
    const data = await response.json()
    console.log(data)

    } catch (error) {
      setMessage('Error sending reset link')
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  )
}

export default ForgotPassword
