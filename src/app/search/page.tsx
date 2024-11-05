'use client'
import React, { useState } from 'react'
import Map from '@/components/Map'
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from '@headlessui/react'

const Page = () => {
  const [city, setCity] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [cost, setCost] = useState('')
  const [places, setPlaces] = useState([])
  const [open, setOpen] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prepare data for API request
    const requestData = {
      city: city,
      cuisine: cuisine,
      cost: parseInt(cost), // Ensure cost is an integer
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/recommend/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      // Extract names and locations from the data to create a places array
      console.log(data)
      const placesArray = data.map(place => `${place.Name},${place.Location},${city}`)
      setPlaces(placesArray)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    }
  }

  return (
    <>
    <Dialog
      className="relative z-10"
      open={open}
      onClose={() => {
        setOpen(false)
        setCity('')
        setCuisine('')
        setCost('')
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-xl transform rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <h1 className="text-xl font-bold mb-4">Restaurant Recommendations</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2 overflow-hidden">
  <input
    type="text"
    className="flex-1 rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm"
    placeholder="City"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    required
  />
  <input
    type="text"
    className="flex-1 rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm"
    placeholder="Cuisine"
    value={cuisine}
    onChange={(e) => setCuisine(e.target.value)}
    required
  />
  <input
    type="number"
    className="flex-1 rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm overflow-hidden"
    placeholder="Cost"
    value={cost}
    onChange={(e) => setCost(e.target.value)}
    required
  />
</div>

  <button type="submit" className="w-full bg-blue-500 text-white rounded-md px-4 py-2 mt-4">
    Get Recommendations
  </button>
</form>

        </DialogPanel>
      </div>

      {/* Render the Map component with the fetched places */}
    </Dialog>
      <Map places={places} />
</>
  )
}

export default Page
