import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

function LocationSelector(props) {
  const { onLocationSelect, initialPosition } = props
  const [position, setPosition] = useState(null)

  useEffect(() => {
    if (initialPosition) {
      const { lat, lng } = initialPosition
      if (!isNaN(lat) && !isNaN(lng)) {
        setPosition([lat, lng])
      }
    }
  }, [initialPosition])

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition([lat, lng])
      onLocationSelect({ lat, lng })
    },
  })

  return position ? <Marker position={position}></Marker> : null
}

LocationSelector.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
  initialPosition: PropTypes.object,
}

function LocationPicker(props) {
  const { onLocationSelect, initialPosition } = props

  return (
    <div className={styles.container}>
      <MapContainer
        center={[48.612546095210405, 22.301494488492608]}
        zoom={13}
        style={{ height: '300px', width: '80%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationSelector
          initialPosition={initialPosition}
          onLocationSelect={onLocationSelect}
        />
      </MapContainer>
    </div>
  )
}

LocationPicker.propTypes = {
  initialPosition: PropTypes.object,
  onLocationSelect: PropTypes.func.isRequired,
}

export default LocationPicker
