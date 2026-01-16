import React from 'react'

const EventCard = ({ event, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-lg p-4 shadow hover:shadow-md transition bg-white cursor-pointer"
    >
      <img
        src={event.image}
        className="rounded-md shadow-xl mb-2"
      />

      <h2 className="text-xl font-semibold">{event.title}</h2>

      <p className="text-gray-600 text-sm mt-1">{event.date}</p>

      <p className="text-gray-700 mt-2 line-clamp-2">
        {event.description}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        📍 {event.venue}
      </p>
    </div>
  )
}

export default EventCard
