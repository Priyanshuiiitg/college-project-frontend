import React, { useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

const MapWithGeocoding = ({ places }) => {
    const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default center
    const [markers, setMarkers] = useState([]); // Array to store all marker positions

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GAPI || 'YOUR_API_KEY',
    });

    useEffect(() => {
        if (isLoaded && places.length) {
            const geocoder = new window.google.maps.Geocoder();
            const newMarkers = [];

            // Geocode each place in the `places` array
            places.forEach((place, index) => {
                geocoder.geocode({ address: place }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        const location = results[0].geometry.location;
                        const latLng = { lat: location.lat(), lng: location.lng() };
                        newMarkers.push(latLng);

                        // When all places have been geocoded, update the markers and center
                        if (newMarkers.length === places.length) {
                            setMarkers(newMarkers); // Set all marker positions
                            setCenter(newMarkers[0]); // Center the map on the first marker
                        }
                    } else {
                        console.error(`Geocoding failed for ${place}: ${status}`);
                    }
                });
            });
        }
    }, [isLoaded, places]);

    const zoom = markers.length > 0 ? 11 : 5; // Set zoom based on presence of markers

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <GoogleMap
                center={center}
                zoom={zoom}
                mapContainerStyle={{ width: '100%', height: '100vh' }}
            >
                {/* Render a marker for each geocoded position */}
                {markers.map((position, index) => (
                    <Marker key={index} position={position} />
                ))}
            </GoogleMap>
        </div>
    );
};

export default MapWithGeocoding;

