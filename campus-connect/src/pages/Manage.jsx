import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api'

const Manage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    time: '',
    poster: '',
    tags: []
  })

  const [tagInput, setTagInput] = useState("") // ✅ NEW
  const [isCompleted, setIsCompleted] = useState(false)

  // Load event if editing
  useEffect(() => {
    if (id) {
      API.get('/events/my').then(res => {
        const event = res.data.find(e => e._id === id)
        if (event) {
          setForm({
            title: event.title,
            description: event.description,
            date: event.date?.split('T')[0],
            venue: event.venue,
            time: event.time,
            poster: event.poster || '',
            tags: event.tags || []
          })

          setTagInput((event.tags || []).join(', ')) // ✅ NEW
          setIsCompleted(event.isCompleted || false)
        }
      })
    }
  }, [id])

  // Handle image upload
  const handleImageUpload = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, poster: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    try {
      if (id) {
        await API.put(`/events/${id}`, { ...form, isCompleted })
      } else {
        await API.post('/events', form)
      }
      navigate('/dashboard')
    } catch {
      alert('Failed to save event')
    }
  }

  const markCompleted = async () => {
    if (!id) return
    const updatedStatus = !isCompleted
    await API.put(`/events/${id}`, { isCompleted: updatedStatus })
    setIsCompleted(updatedStatus)
  }

  const deleteEvent = async () => {
    if (!id) return
    await API.delete(`/events/${id}`)
    navigate('/dashboard')
  }

  return (
    <div className='flex justify-center px-10 min-h-screen '>
      <button
        className='container w-1 absolute top-6 left-3 rounded-full text-2xl hover:shadow-emerald-500'
        onClick={() => navigate('/dashboard')}
      >
        <span className='fa text-emerald-500'>&#xf100;</span>
      </button>

      <div className='flex flex-col items-center w-full max-w-xl p-1 rounded-lg mb-4'>
        <h2 className="title1 mb-4 mt- mt-50">Add/Edit Event</h2>

        <input
          placeholder='Add Title'
          type='text'
          className='container text-white mb-2'
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder='Add description here'
          type='text'
          className='container text-white mb-2'
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <div className='flex justify-end'>
          <input
            type='date'
            className='container text-white mb-2 mr-4'
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />

          <input
            placeholder='Add Time'
            type='text'
            className='container text-white mb-2'
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
          />
        </div>

        <input
          placeholder='Add Venue here'
          type='text'
          className='container text-white mb-2'
          value={form.venue}
          onChange={e => setForm({ ...form, venue: e.target.value })}
        />

        {/* ✅ TAG INPUT */}
        <input
          type="text"
          placeholder="Add tags (comma separated)"
          className="container text-white mb-2"
          value={tagInput}
          onChange={e => {
            const value = e.target.value
            setTagInput(value)
            setForm({
              ...form,
              tags: value
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean)
            })
          }}
        />

        {/* IMAGE UPLOAD */}
        <div className="flex flex-col items-center justify-center mt-3">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer neoncontainer transition-colors p-5">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 title1">
              <p className="text-sm font-semibold">Click to upload image</p>
              <p className="text-xs">PNG, JPG or GIF</p>
            </div>

            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </label>
        </div>

        <div className='grid grid-cols-2 gap-2 w-full mt-10'>
          <button
            className='bg-green-300 text-green-900 rounded-md py-3 hover:bg-green-400 transition'
            onClick={markCompleted}
          >
            {isCompleted ? 'Unmark Completed' : 'Mark Completed'}
          </button>

          <button
            className='bg-red-400 text-red-800 rounded-md py-3 hover:bg-red-500 transition'
            onClick={deleteEvent}
          >
            Delete Event
          </button>
        </div>

        <button
          className='admin-btn mt-6'
          onClick={handleSubmit}
        >
          Save Event
        </button>
      </div>
    </div>
  )
}

export default Manage
