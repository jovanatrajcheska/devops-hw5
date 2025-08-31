import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Swaps() {
  const [users, setUsers] = useState([])
  const [toys, setToys] = useState([])
  const [swaps, setSwaps] = useState([])
  const [form, setForm] = useState({ fromUser:'', toUser:'', toyOffered:'', toyRequested:'', message:'' })
  const [filterUser, setFilterUser] = useState('')

  const load = async () => {
    setUsers((await api.get('/users')).data)
    setToys((await api.get('/toys')).data)
    setSwaps((await api.get('/swaps')).data)
  }
  useEffect(()=>{ load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    await api.post('/swaps', form)
    setForm({ fromUser:'', toUser:'', toyOffered:'', toyRequested:'', message:'' })
    load()
  }

  const accept = async (id) => { await api.patch(`/swaps/${id}/accept`); load() }
  const decline = async (id) => { await api.patch(`/swaps/${id}/decline`); load() }
  const pickup = async (id) => { await api.patch(`/swaps/${id}/confirm-pickup`); load() }

  const filtered = swaps.filter(s => !filterUser || s.fromUser?._id === filterUser || s.toUser?._id === filterUser)

  return (
    <div style={{padding:16}}>
      <h2>Swap Requests</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:600}}>
        <select value={form.fromUser} onChange={e=>setForm(f=>({...f,fromUser:e.target.value}))} required>
          <option value="">From user</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <select value={form.toUser} onChange={e=>setForm(f=>({...f,toUser:e.target.value}))} required>
          <option value="">To user</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
        <select value={form.toyOffered} onChange={e=>setForm(f=>({...f,toyOffered:e.target.value}))} required>
          <option value="">Toy offered</option>
          {toys.map(t => <option key={t._id} value={t._id}>{t.name} ({t.owner?.name})</option>)}
        </select>
        <select value={form.toyRequested} onChange={e=>setForm(f=>({...f,toyRequested:e.target.value}))} required>
          <option value="">Toy requested</option>
          {toys.map(t => <option key={t._id} value={t._id}>{t.name} ({t.owner?.name})</option>)}
        </select>
        <input placeholder="Message (optional)" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/>
        <button>Create Swap</button>
      </form>

      <div style={{marginTop:16}}>
        <label>Filter by user: </label>
        <select value={filterUser} onChange={e=>setFilterUser(e.target.value)}>
          <option value="">(All)</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>
      </div>

      <ul style={{marginTop:16}}>
        {filtered.map(s => (
          <li key={s._id}>
            <b>{s.fromUser?.name}</b> offers <b>{s.toyOffered?.name}</b> to <b>{s.toUser?.name}</b> for <b>{s.toyRequested?.name}</b> — status: <b>{s.status}</b>
            {' '}
            {s.status === 'pending' && <>
              <button onClick={()=>accept(s._id)}>Accept</button>
              <button onClick={()=>decline(s._id)} style={{marginLeft:6}}>Decline</button>
            </>}
            {s.status === 'accepted' && <button onClick={()=>pickup(s._id)}>Confirm Pickup</button>}
          </li>
        ))}
      </ul>
    </div>
  )
}
