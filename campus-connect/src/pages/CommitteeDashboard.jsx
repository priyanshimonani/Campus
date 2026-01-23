import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const CommitteeDashboard = () => {
  const navigate = useNavigate()
  const [committee, setCommittee] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    API.get('/dashboard')
      .then(res => setCommittee(res.data.committee))
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('committee')
        navigate('/login')
      })

    API.get('/events/my')
      .then(res => setEvents(res.data))
      .catch(() => { })
  }, [navigate])
  if (!committee) return null
  return (
    <div>
      <div className='flex justify-center'>
        <h1 className='title1'>{committee.name}</h1>
      </div>

      <p>Logo here</p>

      <p className='title1 text-sm ml-5'>About Us</p><br />

      <div className='ml-50 mr-50'>
        <p className='neoncontainer min-w-full text-emerald-500'>{committee.description}</p><br />
      </div>

      {/* 🔹 MY EVENTS */}
      <div className='ml-4 mr-4 mb-4'>
        <p className='title1 text-xs'>My Events</p>
        {events.length === 0 && <p>No events created yet</p>}
        {/* onClick={() => navigate(`/manage/${event._id}`)} */}
        <div className='grid md:grid-cols-4 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
          {events.map(event => (
            
            <div
              onClick={() => navigate(`/manage/${event._id}`)}
              className="group relative h-96 w-full overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-emerald-500"
            >
              <img
                src={event.poster}
                alt={event.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/80" />
              <div className="absolute inset-0 z-10 flex flex-col  p-6 text-white opacity-0 transition-all duration-500 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0">
                <h2 className="text-2xl font-bold leading-tight">{event.title}</h2>
                <p className="mt-3 line-clamp-10 text-sm text-gray-200 opacity-90">
                  {event.description}
                </p>
                <div className="mt-2 space-x-3 text-sm font-medium text-gray-300">
                  <p>{new Date(event.date).toDateString()}</p>
                  <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                  <p>📍{event.venue}</p>
                </div>

              </div>
            </div>
          ))}
          {/* end of map */}
        </div>
      </div>

      <div className='flex justify-center'>
        <button
          className='admin-btn animate-bounce absolute bottom-0.5'
          onClick={() => navigate('/manage')}
        >
          Add New Event
        </button>
      </div>
    </div>
  )
}

export default CommitteeDashboard
