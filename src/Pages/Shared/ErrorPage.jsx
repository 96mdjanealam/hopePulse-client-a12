import React from 'react'

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        {/* Error Icon */}
        <span className="text-6xl" role="img" aria-label="Error">
        😔
        </span>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-red-500 mt-8">Opps ...</h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Go to Home Button */}
        <a
          href="/" // Replace with your home route
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </a>
      </div>
    </div>
  )
}
