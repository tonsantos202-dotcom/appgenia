import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState('')

  async function handleGenerate(e) {
    e.preventDefault()
    setLoading(true)
    setOutput('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, max_tokens: 1500 })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Erro na geração')
      setOutput(data.result)
    } catch (err) {
      setOutput('Erro: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{padding: '2rem', fontFamily: 'Arial, sans-serif'}}>
      <h1>AppGenIA — Gerador por IA (Ueverton Santos)</h1>
      <p>Escreva o que quer que a IA gere — por exemplo: "Gere um CRUD em FastAPI com usuários e auth".</p>
      <form onSubmit={handleGenerate}>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={8} style={{width: '100%'}} />
        <div style={{marginTop: '1rem'}}>
          <button type="submit" disabled={loading}>{loading ? 'Gerando...' : 'Gerar'}</button>
        </div>
      </form>
      <section style={{marginTop: '1.5rem'}}>
        <h2>Resultado</h2>
        <pre style={{whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '1rem'}}>{output}</pre>
      </section>
      <footer style={{marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem'}}>
        Criado por Ueverton Santos — AppGenIA v1.0
      </footer>
    </main>
  )
}
