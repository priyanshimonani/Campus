import React, { useState } from 'react'
import EventCard from "../components/EventCard"
import EventModal from '../components/EventModal'

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  // TEMP dummy data (later from DB)
  const events = Array(8).fill({
    title: "Hackathon 2026",
    date: "15 March 2026",
    description: "24 hour coding event",
    venue: "Main Auditorium",
    image: "https://cdn.vectorstock.com/i/1000v/81/75/temporary-rubber-stamp-vector-17998175.jpg"
  })

  return (
    <div className="max-w-8xl mx-auto p-14">
      <h1 className="text-2xl font-bold mb-4">Upcoming & Past Events</h1>

      <div className='flex'>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#000" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
      <input
        type="text"
        placeholder="Search events..."
        className="border rounded-full mb-4 px-4 py-1"
      />
      </div>

      

      <div className="grid md:grid-cols-5 gap-4">
        {events.map((event, index) => (
          <EventCard
            key={index}
            event={event}
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
