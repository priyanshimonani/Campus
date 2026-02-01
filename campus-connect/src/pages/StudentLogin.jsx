import React, { useState } from 'react'

const StudentLogin = () => {
    return (
        <div>
            <div id='new login'>
                <div className="backgroundlogin">
                    <div className="shapelogin"></div>
                    <div className="shapelogin"></div>
                </div>
                <form id='loginform'>
                    <h3 className='title1'>Login</h3>

                    <label>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        className='container'
                        
                    />

                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        className='container'
                       
                    />

                    <button type='button'
                        className='admin-btn '
                        
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StudentLogin