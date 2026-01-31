import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', {
        username,
        password
      })

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('committee', JSON.stringify(res.data.committee))

      navigate('/dashboard')
    } catch {
      alert('Invalid credentials')
    }
  }

  return (
    <div>
      <div id='new login'>
        <div className="backgroundlogin">
          <div className="shapelogin"></div>
          <div className="shapelogin"></div>
        </div>
        <form id='loginform'>
          <h3 className='title1'>Login</h3>

          <label>Username</label>
          <input
            type='text'
            placeholder='Username'
            className='container'
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            className='container'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='button'
            className='admin-btn '
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
