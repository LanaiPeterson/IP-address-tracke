import { useState } from 'react'
import useFetch from './hooks/useFetch'
import './App.css'
import { useEffect } from 'react'
import IPAddress from './components/IPAddress'

function App() {
  const [ip, setIp] = useState('')
  const [ipData, setIpData] = useState(null)
  const { data, loading, error } = useFetch(`https://ipapi.co/${ip}/json/`)

  useEffect(() => {
    if (data) {
      setIpData(data)
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIp(ip.trim())
  }

  return (
    <div className="App">
      <h1>IP Address Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter IP address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button type="submit">Track</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {ipData && (
        <div className="ip-data">
          <h2>IP Information</h2>
          <p><strong>IP:</strong> {ipData.ip}</p>
          <p><strong>City:</strong> {ipData.city}</p>
          <p><strong>Region:</strong> {ipData.region}</p>
          <p><strong>Country:</strong> {ipData.country_name}</p>
          <p><strong>Latitude:</strong> {ipData.latitude}</p>
          <p><strong>Longitude:</strong> {ipData.longitude}</p>
        </div>
      )}
    </div>
  )
}

export default App
