'use client'
import React, { useEffect, useState } from 'react'
import Map from '@/components/Map'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [city, setCity] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [cost, setCost] = useState('')
  const [rating, setRating] = useState('')
  const [places, setPlaces] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('token') !== 'true') {
      router.push('/login')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const requestData = {
      city: city,
      cuisine: cuisine,
      cost: parseInt(cost),
      rating: parseFloat(rating),
    }

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const placesArray = data.map(
        (place) => `${place.Name}, ${place.Location}, Rating: ${place.Rating}`
      )
      setPlaces(placesArray)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Search Section */}
      <div className="bg-white shadow-md w-full p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Find a Restaurant</h1>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            className="w-full rounded-md bg-gray-100 px-4 py-3"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full rounded-md bg-gray-100 px-4 py-3"
            placeholder="Cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
          <input
            type="number"
            className="w-full rounded-md bg-gray-100 px-4 py-3"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
          <input
            type="number"
            className="w-full rounded-md bg-gray-100 px-4 py-3"
            placeholder="Minimum Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            step="0.1"
            required
          />

          {/* Full-Width Button */}
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 md:col-span-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-4 py-3 transition"
          >
            Get Recommendations
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="flex-1 w-full">
        <Map places={places} />
      </div>
    </div>
  )
}

export default Page
