import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-800 py-10'>
        <div className="container flex items-center justify-between">
            <span className="font-bold text-3xl text-white trackin-wide">
                Mernholidays.com
            </span>
            <span className="text-white font-semibold flex gap-4 tracking-tight">
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
            </span>
        </div>
    </div>
  )
}

export default Footer