import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form)
      login(res.data.user, res.data.token)
      toast.success('Welcome to Debate Arena!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚔️</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Join the Arena</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Create your free account</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            {[
              { label: 'Username', name: 'username', type: 'text', placeholder: 'debatemaster' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '8px', color: '#94a3b8' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%', padding: '11px 14px',
                    background: '#0f0f1a', border: '1px solid #2a2a4a',
                    borderRadius: '8px', color: '#e2e8f0', fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', padding: '12px', fontSize: '15px', justifyContent: 'center' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#94a3b8' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#6c63ff', fontWeight: 500 }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register