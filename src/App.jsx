import React from 'react'
import User from './user/User'

function App() {
  return (
    <div className='w-full flex flex-col gap-3 py-5 text-white bg-black' >
      <div className="text-center uppercase text-5xl ">user data</div>
      <User/>
    </div>
  )
}

export default App
