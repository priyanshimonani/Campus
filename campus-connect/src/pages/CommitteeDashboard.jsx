import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const CommitteeDashboard = () => {
  const navigate = useNavigate()
  const [committee, setCommittee] = useState(null)
  const [events, setEvents] = useState([])
 const [showAbout, setShowAbout] = useState(false)


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
      <div className='flex justify-center mb-4'>
        <h1 className='title1'>{committee.name}</h1>
      </div>
            <div
  onClick={() => setShowAbout(!showAbout)}
  className={`
    mx-10 my-8
    cursor-pointer
    rounded-2xl
    border border-emerald-500/40
    bg-black/40 backdrop-blur-md
    transition-all duration-500
    ${showAbout
      ? "shadow-[0_0_30px_rgba(16,185,129,0.6)]"
      : "hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"}
  `}
>

  {/* Header */}
  <div className="px-6 py-5 flex justify-between items-center">
    <p className="title1 text-emerald-400 tracking-wide">
      About the Committee
    </p>

    <button
  className={`
    h-9 w-9
    flex items-center justify-center
    rounded-full
    border border-emerald-400
    text-emerald-400
    transition-all duration-500
    hover:shadow-[0_0_15px_rgba(16,185,129,0.9)]
    ${showAbout
      ? "rotate-45 shadow-[0_0_25px_rgba(16,185,129,1)]"
      : ""}
  `}
>
  +
</button>

  </div>

  {/* Expandable Content */}
  <div
    className={`
      overflow-hidden
      transition-all duration-700 ease-in-out
      ${showAbout ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
    `}
  >
    <div className="px-6 pb-6 text-emerald-300 leading-relaxed">
      {committee.description}
    </div>
  </div>

</div>


      {/* 🔹 MY EVENTS */}
      <div className='ml-4 mr-4 mb-4'>

        <div className='flex justify-center'>
      <p className='title1 text-sm ml-5'>My Events</p><br />

        {events.length === 0 && <p>No events created yet</p>}</div>
        {/* onClick={() => navigate(`/manage/${event._id}`)} */}
        <div className='grid md:grid-cols-4 gap-4 sm:grid-cols-3 lg:grid-cols-5 '>
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
