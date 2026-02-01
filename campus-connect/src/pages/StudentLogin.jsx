import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const StudentLogin = () => {
  const navigate = useNavigate()

  // 🔹 state added
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields required")
      return
    }

    try {
      const res = await API.post('/students/login', {
        email,
        password
      })

      // 🔐 store student token
      localStorage.setItem("studentToken", res.data.token)

      navigate('/') // go to events page
    } catch (err) {
      alert("Login failed")
      console.error(err)
    }
  }

  return (
    <div>
      <div className='flex justify-center split-text-container'>
        <h1 className="title1 mb-4 text-part left mr-2"> Campus </h1>
        <h1 className="title1 mb-4 text-part right text-white!"> Connect</h1><br/>
      </div>

      <div id='new login'>
        <div className="backgroundlogin">
          <div className="shapelogin"></div>
          <div className="shapelogin"></div>
        </div>

        <form id='loginform'>
          <h3 className='title1'>Login</h3>

          <label>Email</label>
          <input
            type='text'
            placeholder='Email'
            className='container'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            className='container'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            type='button'
            className='admin-btn'
            onClick={handleLogin}
          >
            Login
          </button>

          <label>
            Dont have an account? Click <a href='/signup'><u>here</u></a>
          </label>
        </form>
      </div>
    </div>
  )
}

export default StudentLogin
