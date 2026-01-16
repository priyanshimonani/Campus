import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const CommitteeDashboard = () => {
  const navigate = useNavigate()
  const [committee, setCommittee] = useState(null)

  useEffect(() => {
    API.get('/dashboard')
      .then(res => {
        setCommittee(res.data.committee)
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('committee')
        navigate('/login')
      })
  }, [])

  if (!committee) return null

  return (
    <div className='flex justify-center'>
      <h1>{committee.name}</h1>
      <p>Logo here</p>
      <p>Description</p><br/>
      <p>{committee.description}</p><br/>
      <button className='admin-btn animate-bounce absolute bottom-4'>
        <a href='/manage'>Add New Event</a>
      </button>
    </div>
  )
}

export default CommitteeDashboard
