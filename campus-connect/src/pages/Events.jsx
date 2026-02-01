import React, { useEffect, useState } from 'react'
import EventCard from "../components/EventCard"
import EventModal from '../components/EventModal'
import API from "../api"

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [events, setEvents] = useState([])
  const [searchedEvents, setSearchedEvents] = useState("")
  const [selectedTags, setSelectedTags] = useState([]) 
  const [committeeFilter, setCommitteeFilter] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 🔹 NEW: sort state
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(() => console.error("Failed to load events"))
  }, [])

  const allTags = [
    ...new Set(events.flatMap(event => event.tags || []))
  ]

  const committees = [
    ...new Set(events.map(event => event.committeeId))
  ]

  /* 🔍 FILTER */
  const filteredEvents = events.filter(event => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const eventDate = new Date(event.date)
    eventDate.setHours(0, 0, 0, 0)

    const searchMatch =
      event.title.toLowerCase().includes(searchedEvents.toLowerCase()) ||
      event.description.toLowerCase().includes(searchedEvents.toLowerCase())

    const tagMatch =
      selectedTags.length === 0 ||
      event.tags?.some(tag => selectedTags.includes(tag))

    const committeeMatch =
      !committeeFilter || event.committeeId === committeeFilter

    const timeMatch =
      statusFilter === "all" ||
      (statusFilter === "upcoming" && eventDate >= today) ||
      (statusFilter === "past" && eventDate < today)

    const fromMatch = !fromDate || eventDate >= new Date(fromDate)
    const toMatch = !toDate || eventDate <= new Date(toDate)

    return (
      searchMatch &&
      tagMatch &&
      committeeMatch &&
      timeMatch &&
      fromMatch &&
      toMatch
    )
  })

  /* 🔃 SORT */
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    return sortOrder === "oldest"
      ? dateA - dateB
      : dateB - dateA
  })

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="max-w-8xl mx-auto p-14 pt-40">

      <div className='flex justify-center split-text-container'>
        <h1 className="title1 mb-4 text-part left mr-2"> All Campus Events </h1>
        <h1 className="title1 mb-4 text-part right text-white!"> One Page</h1>
      </div>

      {/* 🔍 SEARCH */}
      <div className='flex justify-center mb-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <path fill="#10b981" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19z"/>
        </svg>

        <input
          type="text"
          placeholder="Search events..."
          className="border rounded-full px-4 py-1 text-emerald-500"
          onChange={(e) => setSearchedEvents(e.target.value)}
        />
      </div>

      {/* 🎛 FILTERS */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">

        {/* Committee */}
        <select
          className="border rounded-full px-4 py-1 text-emerald-600"
          value={committeeFilter}
          onChange={e => setCommitteeFilter(e.target.value)}
        >
          <option value="">All Committees</option>
          {committees.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Time */}
        <select
          className="border rounded-full px-4 py-1 text-emerald-600"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>

        {/* 🔹 NEW: SORT */}
        <select
          className="border rounded-full px-4 py-1 text-emerald-600"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="newest">Date ↓ (Newest)</option>
          <option value="oldest">Date ↑ (Oldest)</option>
        </select>

        {/* Date Range */}
        
        <label className=' text-emerald-600'>From:</label>
        <input
          type="date"
          className="border rounded-full px-3 py-1 text-emerald-600"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
        />
        <label className=' text-emerald-600'>To:</label>
        <input
          type="date"
          className="border rounded-full px-3 py-1 text-emerald-600"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
        />
      </div>

      {/* 🏷 TAGS */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition
                ${selectedTags.includes(tag)
                  ? "bg-emerald-500 text-white shadow"
                  : "bg-transparent text-emerald-500 border border-emerald-500 hover:scale-105 hover:shadow-[0_0_15px_rgba(16,185,129,0.8)]"}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* 📦 EVENTS */}
      <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {sortedEvents.map(event => (
          <EventCard
            key={event._id}
            event={{
              title: event.title,
              dateog: event.date,
              date: new Date(event.date).toDateString(),
              description: event.description,
              venue: event.venue,
              image: event.poster
            }}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {/* MODAL */}
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
