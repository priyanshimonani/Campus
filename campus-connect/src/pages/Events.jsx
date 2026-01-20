import React, { useEffect, useState } from 'react'
import EventCard from "../components/EventCard"
import EventModal from '../components/EventModal'
import API from "../api"

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(() => console.error("Failed to load events"))
  }, [])

  return (
    <div className="max-w-8xl mx-auto p-14">
      <div className='flex justify-center'>
        <h1 className="title1 mb-4"> EVENTS</h1>
      </div>

      <div className='flex justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <path fill="#10b981" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/>
        </svg>

        <input
          type="text"
          placeholder="Search events..."
          className="border rounded-full mb-4 px-4 py-1 text-emerald-500"
        />
      </div>

      <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {events.map(event => (
          <EventCard
            key={event._id}
            event={{
              title: event.title,
              date: new Date(event.date).toDateString(),
              description: event.description,
              venue: event.venue,
              image: event.poster
            }}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}

export default Events
