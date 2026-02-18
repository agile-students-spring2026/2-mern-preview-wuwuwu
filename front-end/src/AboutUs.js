import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AboutUs() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const host = process.env.REACT_APP_SERVER_HOSTNAME || 'http://localhost:5002'
    axios
      .get(`${host}/about`)
      .then(res => setData(res.data))
      .catch(err => setError(err?.message || 'Failed to load About Us data'))
  }, [])

  if (error) return <div style={{ padding: 24 }}>Error: {error}</div>
  if (!data) return <div style={{ padding: 24 }}>Loading...</div>

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1>{data.title}</h1>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginTop: 16 }}>
        <img
          src={data.imageUrl}
          alt={data.imageAlt || 'About photo'}
          style={{ width: 220, borderRadius: 12 }}
        />

        <div>
          {Array.isArray(data.paragraphs) &&
            data.paragraphs.map((p, idx) => (
              <p key={idx} style={{ lineHeight: 1.6 }}>
                {p}
              </p>
            ))}
        </div>
      </div>
    </div>
  )
}
