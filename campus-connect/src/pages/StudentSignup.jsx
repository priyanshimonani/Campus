import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const StudentSignup = () => {
  const navigate = useNavigate()

  // 🔹 state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields required")
      return
    }

    try {
      await API.post('/students/signup', {
        name: name,
        email: email,
        password: password
      })

      alert("Signup successful. Please login.")
      navigate('/slogin')
    } catch (err) {
      alert("Signup failed")
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
          <h3 className='title1'>Sign Up</h3>

          {/* 🔹 NAME */}
          <label>Username</label>
          <input
            type='text'
            placeholder='Username'
            className='container'
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {/* 🔹 USERNAME */}
          <label>Email</label>
          <input
            type='text'
            placeholder='Email'
            className='container'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {/* 🔹 PASSWORD */}
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
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentSignup
