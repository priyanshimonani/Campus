import React from 'react'

const EventCard = ({ event, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-96 w-full overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-emerald-500"
    >
      <img
        src={event.image}
        alt={event.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/80" />
      <div className="absolute inset-0 z-10 flex flex-col  p-6 text-white opacity-0 transition-all duration-500 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0">
        <h2 className="text-2xl font-bold leading-tight">{event.title}</h2>
        <div className="mt-2 flex items-center space-x-3 text-sm font-medium text-gray-300">
          <p>{event.date}</p>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <p>📍 {event.venue}</p>
        </div>
        <p className="mt-3 line-clamp-10 text-sm text-gray-200 opacity-90">
          {event.description}
        </p>
      </div>
    </div>
  )
}

export default EventCard