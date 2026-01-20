import React, { useState } from 'react';

const EventModal = ({ event, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!event) return null;

  const handleRegister = () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }
    console.log("Registered:", { name, email, event });
    alert("Registration successful!");
    onClose();
  };

  return (
    // Backdrop - fixed and centered
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="container rounded-lg w-full max-w-lg shadow-xl flex flex-col max-h-[90vh] text-black" >
        
        {/* Header - Stays pinned at the top */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="line-clamp-1 title1">
            {event.title}
          </h2>
          <div className='right-100'>
            <button 
            onClick={onClose}
            className="text-2xl px-2 title1"
          >
            &times;
          </button>
          </div>
          
        </div>

        {/* Body - This section scrolls (Equivalent to modal-dialog-scrollable) */}
        <div className="overflow-y-auto p-6 flex-1">
          <div className='flex justify-center'>
            <img 
            src={event.poster} 
            alt={event.title}
            className="rounded-md mb-4 object-cover h-100 w-auto" 
          />
          </div>
          
          
          <div className="space-y-2 mb-6">
            <p className="font-semibold">{event.date}</p>
            <p className="">📍 {event.venue}</p>
            <p className=" leading-relaxed">
              {event.description}
              
            </p>
          </div>

          <div className=" p-4 rounded-lg border bg-black text-white">
            <h3 className="font-semibold mb-3 text-white">Register Now</h3>
            <input
              type="text"
              placeholder="Your Name"
              className="border w-full mb-3 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border w-full mb-1 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Footer - Stays pinned at the bottom */}
        <div className="p-4 rounded-b-lg">
          <button
            onClick={handleRegister}
            className="bg-gray-900 text-white w-full py-3 px-2 rounded-md font-bold hover:bg-black transition-colors"
          >
            Submit Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;