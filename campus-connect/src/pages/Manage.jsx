import React from 'react'

const Manage = () => {
    return (
        <div className='flex justify-center px-10 min-h-screen'>
            <div className='flex flex-col items-center w-full max-w-xl p-1 rounded-lg container mb-4'>
                <h2 className="text-2xl font-bold mb-4 mt-0">Manage Event</h2>

                <input placeholder='Add Title' type='text' className='w-full border-b-2 border-gray-500 py-2 mt-5 focus:border-black outline-none' />
                <input placeholder='Add description here' type='text' className='w-full border-b border-gray-500 py-2 mt-5 outline-none' />
                <input type='date' className='w-full border-b border-gray-500 py-2 mt-5 outline-none' />
                <input placeholder='Add Venue here' type='text' className='w-full border-b border-gray-500 py-2 mt-5 outline-none' />
                <div className="flex flex-col items-center justify-center mt-3">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors p-5">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <span className="text-2xl mb-2 animate-pulse"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                                <g fill="none" stroke="#006D5B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    <path stroke-dasharray="18" d="M8 19h-1c-2.5 0 -4 -2 -4 -4c0 -2 1.5 -4 4 -4c1 0 1.5 0.5 1.5 0.5M16 19h1c2.5 0 4 -2 4 -4c0 -2 -1.5 -4 -4 -4c-1 0 -1.5 0.5 -1.5 0.5">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.525s" values="18;0" />
                                    </path>
                                    <path stroke-dasharray="12" stroke-dashoffset="12" d="M7 11v-1c0 -2.5 2 -5 5 -5M17 11v-1c0 -2.5 -2 -5 -5 -5">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.525s" dur="1.22s" to="0" />
                                    </path>
                                    <path stroke-dasharray="8" stroke-dashoffset="8" d="M12 20v-6">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="2.745s" dur="0.61s" to="0" />
                                    </path>
                                    <path stroke-dasharray="6" stroke-dashoffset="6" d="M12 13l2 2M12 13l-2 2">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="3.355s" dur="0.61s" to="0" />
                                    </path>
                                </g>
                            </svg></span>
                            <p className="text-sm text-gray-500 font-semibold">Click to upload image</p>
                            <p className="text-xs text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>

                        {/* The actual input is hidden */}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => console.log(e.target.files[0])}
                        />
                    </label>
                </div>

                <p>add selection of tags here</p>
                <div className='grid grid-cols-2 gap-2 w-full mt-10'>
                    <button className='bg-green-300 text-green-900 rounded-md py-3 hover:bg-green-400 transition'>Mark Completed</button>
                    <button className='bg-red-400 text-red-800 rounded-md py-3 hover:bg-red-500 transition'>Delete Event</button>
                </div>
            </div>
        </div>
    )
}

export default Manage
