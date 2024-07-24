import { useState, useEffect } from 'react'
import axios from 'axios'

interface UserDetails {
  name: string
  email: string
}

const Account: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
  })
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (userId) {
          const response = await axios.get<UserDetails>(
            `http://localhost:5400/api/users/${userId}`
          )
          setUserDetails(response.data)
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }
    fetchUserDetails()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setIsChanged(true)
  }

  const handleSaveChanges = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (userId) {
        await axios.put(
          `http://localhost:5400/api/users/${userId}`,
          userDetails
        )
        setIsChanged(false)
        alert('User details updated successfully')
      }
    } catch (error) {
      console.error('Error updating user details:', error)
    }
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-7">Account Details</h1>
      <div className="mb-4 w-1/4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4 w-1/4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleSaveChanges}
        disabled={!isChanged}
        className={`bg-slate-950 text-slate-300 py-2 px-10 rounded-md mt-10 w-fit hover:bg-slate-500 ${
          !isChanged && 'opacity-50 cursor-not-allowed'
        }`}>
        Save Changes
      </button>
      <p className='pt-20 text-red-600 hover:text-slate-950'>Delete Account</p>
    </div>
  )
}

export default Account
