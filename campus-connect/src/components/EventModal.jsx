import React, { useState, useEffect } from 'react';
import API from '../api';
import emailjs from "emailjs-com";

const EventModal = ({ event, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  if (!event) return null;

  useEffect(() => {
    const registeredEvents =
      JSON.parse(localStorage.getItem("registeredEvents")) || [];

    if (registeredEvents.includes(event._id)) {
      setRegistered(true);
    }
  }, [event]);

  const handleRegister = async () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    try {

      await API.post(`/registrations/${event._id}`, {
        name,
        email
      });


      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          event: event.title,
          name,
          email
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      const registeredEvents =
        JSON.parse(localStorage.getItem("registeredEvents")) || [];

      localStorage.setItem(
        "registeredEvents",
        JSON.stringify([...new Set([...registeredEvents, event._id])])
      );

     
      setRegistered(true);

    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
      <div className="container rounded-lg w-full max-w-lg shadow-xl flex flex-col max-h-[90vh] text-black">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="line-clamp-1 title1">{event.title}</h2>
          <button onClick={onClose} className="text-2xl px-2 title1">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">
          <div className='flex justify-center'>
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

          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-3">Register Now</h3>

            {registered ? (
              <p className="text-green-400 font-semibold text-center">
                ✅ Registered
              </p>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border w-full mb-3 px-3 py-2 rounded"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border w-full mb-1 px-3 py-2 rounded"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </>
            )}
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
  );
};

export default EventModal;
