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
      
      {/* Modal Container: 
         'max-h-[90vh]' limits the height like Bootstrap.
         'flex-col' allows us to divide header/body/footer.
      */}
      <div className="bg-white rounded-lg w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        
        {/* Header - Stays pinned at the top */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {event.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl px-2"
          >
            &times;
          </button>
        </div>

        {/* Body - This section scrolls (Equivalent to modal-dialog-scrollable) */}
        <div className="overflow-y-auto p-6 flex-1">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full rounded-md mb-4 object-cover h-48" 
          />
          
          <div className="space-y-2 mb-6">
            <p className="text-blue-600 font-semibold">{event.date}</p>
            <p className="text-gray-500">📍 {event.venue}</p>
            <p className="text-gray-700 leading-relaxed">
              {event.description}
              {/* Adding extra text to demonstrate scrollability */}
              <br /><br />
              This content will scroll if it becomes too long, while the header 
              and the registration button stay fixed in place, just like 
              Bootstrap's scrollable modal.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-3">Register Now</h3>
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
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white w-full py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
          >
            Submit Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;