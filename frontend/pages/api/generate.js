// This API route proxies the frontend request to the backend FastAPI (when using Vercel you can point this to the external backend URL)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const body = req.body
  try {
    // When developing locally with docker-compose, backend is at http://localhost:8000
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    const r = await fetch(`${backendUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await r.json()
    res.status(r.status).json(data)
  } catch (err) {
    res.status(500).json({ detail: err.message })
  }
}
