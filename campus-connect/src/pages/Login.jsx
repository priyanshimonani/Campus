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
    <div className='flex justify-center items-center'>
      <div className='container'>
        <div>
          <h1 className=''>Login</h1>

          <div>
            <input
              type='text'
              placeholder='Username'
              className='mw-full border-b'
              onChange={(e) => setUsername(e.target.value)}
            />
            <br/>

            <input
              type='password'
              placeholder='Password'
              className='mw-full border-b'
              onChange={(e) => setPassword(e.target.value)}
            />
            <br/>

            <button
              className='border rounded-full px-12 mt-4 admin-btn'
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
