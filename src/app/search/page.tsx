'use client'
import React, { useEffect, useState } from 'react'
import Map from '@/components/Map'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [city, setCity] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [cost, setCost] = useState('')
  const [rating, setRating] = useState('')
  const [places, setPlaces] = useState([])
  const [open, setOpen] = useState(true)
  const router=useRouter()
  useEffect(()=>{
    if(localStorage.getItem('token')!=='true'){
      router.push('/login')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const requestData = {
      city: city,
      cuisine: cuisine,
      cost: parseInt(cost),
      rating: parseFloat(rating),
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/recommend/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const placesArray = data.map(place => `${place.Name},${place.Location}, Rating: ${place.Rating}`)
      setPlaces(placesArray)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    }
  }

  return (
    <>
      <Dialog className="relative z-10" open={open} onClose={() => setOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-25" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20 flex items-center justify-center">
          <DialogPanel className="mx-auto max-w-xl transform rounded-xl bg-white p-6 shadow-2xl ring-1 ring-black ring-opacity-5">
            <h1 className="text-xl font-bold mb-4">Restaurant Recommendations</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2 overflow-x-auto">
                <input
                  type="text"
                  className="flex-shrink-0 w-1/4 min-w-[100px] rounded-md bg-gray-100 px-4 py-2.5"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="flex-shrink-0 w-1/4 min-w-[100px] rounded-md bg-gray-100 px-4 py-2.5"
                  placeholder="Cuisine"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="flex-shrink-0 w-1/4 min-w-[100px] rounded-md bg-gray-100 px-4 py-2.5"
                  placeholder="Cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
                <input
                  type="number"
                  className="flex-shrink-0 w-1/4 min-w-[100px] rounded-md bg-gray-100 px-4 py-2.5"
                  placeholder="Minimum Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  step="0.1"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white rounded-md px-4 py-2 mt-4">
                Get Recommendations
              </button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <Map places={places} />
    </>
  )
}

export default Page
