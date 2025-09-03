import React from 'react'

const ProfileCard = ({avatar, user}) => {
  return (
    <div className="flex flex-col items-center p-4 bg-blue-50 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-50">
      <div className="relative">
        <img
          src={avatar}
          alt=""
          className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
        />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xs animate-pulse">
          ✨
        </div>
      </div>
      <h3 className="mt-2 text-xl font-bold text-blue-700">{user}</h3>
      <p className="text-sm text-gray-600">Currently typing...</p>
    </div>
  )
}

export default ProfileCard