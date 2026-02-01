import React, { useState, useEffect } from 'react'
import API from '../api'
import emailjs from "emailjs-com"

const EventModal = ({ event, onClose }) => {
  const [registered, setRegistered] = useState(false)

  if (!event) return null

  /* 🔁 CHECK REGISTRATION ON MODAL OPEN */
  useEffect(() => {
    const checkRegistration = async () => {
      const token = localStorage.getItem("studentToken")
      if (!token) return

      try {
        const res = await API.get(`/registrations/${event._id}`)
        if (res.data.registered) {
          setRegistered(true)
        }
      } catch {
        // ignore
      }
    }

    checkRegistration()
  }, [event._id])

  /* 🔐 DECODE STUDENT JWT (NO OTHER FILE TOUCH) */
  const getStudentFromToken = () => {
    try {
      const token = localStorage.getItem("studentToken")
      if (!token) return {}

      const payload = JSON.parse(atob(token.split(".")[1]))
      return {
        name: payload.name || "",
        email: payload.email || ""
      }
    } catch {
      return {}
    }
  }

  /* 📝 REGISTER */
  const handleRegister = async () => {
    const token = localStorage.getItem("studentToken")
    if (!token) {
      alert("Please login as student to register")
      return
    }

    const { name, email } = getStudentFromToken()

    try {
      // 1️⃣ Save registration
      await API.post(`/registrations/${event._id}`)

      // 2️⃣ Send email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          event: event.title,
          name,
          
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      setRegistered(true)
    } catch (err) {
      if (err.response?.status === 400) {
        setRegistered(true)
      } else {
        alert("Registration failed")
      }
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="container rounded-lg w-200 max-w-lg shadow-xl flex flex-col max-h-[90vh] text-black">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="line-clamp-1 title1">{event.title}</h2>
          <button onClick={onClose} className="text-2xl px-2 title1 cursor-pointer">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">
          <div className="flex justify-center">
            <img
              src={event.poster}
              alt={event.title}
              className="rounded-md mb-4 object-cover h-100 w-auto"
            />
          </div>

          <div className="space-y-2 mb-6">
            <p className="font-semibold">
              {new Date(event.date).toDateString()}
            </p>
            <p>📍 {event.venue}</p>
            <p className="leading-relaxed">{event.description}</p>
          </div>

          
        </div>

        {/* Footer */}
        <div className="p-4 rounded-b-lg">
          <button
            onClick={handleRegister}
            disabled={registered || new Date(event.date) < new Date()}
            className={`w-full py-3 px-2 rounded-md font-bold transition-colors
              ${registered || new Date(event.date) < new Date()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black text-white"}`}
          >
            {registered ? "Registered" : "Submit Registration"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventModal
