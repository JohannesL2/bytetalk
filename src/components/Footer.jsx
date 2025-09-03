import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-gray-100 rounded-b-3xl py-8">
  <div className="max-w-6xl mx-auto py-10 px-4 text-center space-y-4">
    <div className="flex justify-center space-x-6">
      <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">About</a>
      <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Support</a>
      <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Terms</a>
      <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Privacy</a>
    </div>
    <p className="text-gray-400 text-sm">&copy; 2025 ByteChat. All rights reserved.</p>
  </div>
</footer>

  )
}
