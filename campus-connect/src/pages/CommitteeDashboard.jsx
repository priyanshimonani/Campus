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
    <div>
      <div className='flex justify-center'>
        <h1 className='title1'>{committee.name}</h1>
      </div>
      <p>Logo here</p>
      <p className='title1 text-xs ml-5'>Description</p><br/>
      <div className='ml-4 mr-4'>
        <p className='container min-w-full'>{committee.description}</p><br/>
      </div>
      
      <div className='flex justify-center'>
        <button className='admin-btn animate-bounce absolute bottom-4'>
        <a href='/manage'>Add New Event</a>
      </button>
      </div>
      
    </div>
  )
}

export default CommitteeDashboard
