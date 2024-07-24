import { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../assets/the folktales.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5400/api/users/', {
          withCredentials: true,
        })
        if (response.status === 200) {
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error('Error checking login status', error)
      }
    }
    checkLoginStatus()
  }, [])

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5400/api/users/sign-out', {
        withCredentials: true,
      })
      setIsLoggedIn(false)
      localStorage.removeItem('token')
      navigate('/Sign-In')
    } catch (error) {
      console.error('Error during logout', error)
    }
  }

  const links = [
    { path: '/', label: 'Home' },
    { path: '/All-Posts', label: 'All Posts' },
    ...(isLoggedIn
      ? [
          { path: '/Create-Post', label: 'Create Post' },
          { path: '/My-Posts', label: 'My Posts' },
          { path: '/Favorites', label: 'Favorites' },
        ]
      : []),
  ]

  return (
    <div className="bg-gray-950 text-slate-300 py-5">
      <div className="flex justify-between px-5 place-items-center">
        <div onClick={() => (window.location.href = '/')}>
          <img src={logo} alt="Logo" className="w-40" />
        </div>
        <div className="flex gap-3 text-slate-300">
          {isLoggedIn ? (
            <>
              <Link to="/Account">
                <button className="border-solid border-slate-300 border-2 px-2 rounded-md">
                  Account
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="border-solid border-slate-300 border-2 px-2 rounded-md">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/Sign-In">
                <button className="border-solid border-slate-300 border-2 px-2 rounded-md">
                  Sign-In
                </button>
              </Link>
              <Link to="/Sign-Up">
                <button className="border-solid border-slate-300 border-2 px-2 rounded-md">
                  Sign-Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex place-content-center">
        <ul className="flex gap-5 text-slate-300">
          {links.map(
            (link) =>
              location.pathname !== link.path && (
                <li
                  key={link.path}
                  className="hover:underline underline-offset-8 decoration-2 decoration-slate-500">
                  <Link to={link.path}>{link.label}</Link>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
