import { useState, useEffect } from 'react'
import './Users.css'

function Users() {
  const [persons, setPersons] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Admin',
    status: 'Active'
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/persons')
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      setPersons(data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch user list.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('http://localhost:3001/api/persons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add user')
      }

      setSuccess('User added successfully!')
      setFormData({ firstName: '', lastName: '', email: '', role: 'Admin', status: 'Active' })
      fetchPersons() // Refresh the list
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="users-page wrapper">
      <div className="users-header">
        <h1>User Management</h1>
        <p>Manage individuals stored in Neon DB Postgres</p>
      </div>

      <div className="users-content">
        <div className="add-user-card">
          <h2>Add New Person</h2>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}
          
          <form onSubmit={handleSubmit} className="add-user-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="e.g. John" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="e.g. Doe" />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="Admin">Admin</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Standard">Standard</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn">Save Person</button>
          </form>
        </div>

        <div className="users-table-card">
          <h2>Database Records</h2>
          {loading ? (
            <p className="loading-text">Loading records from Neon DB...</p>
          ) : persons.length === 0 ? (
            <p className="no-data">No persons stored yet. Add one above.</p>
          ) : (
            <div className="table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {persons.map((person) => (
                    <tr key={person.id}>
                      <td>{person.firstName} {person.lastName}</td>
                      <td>{person.email}</td>
                      <td><span className={`badge role-${person.role.toLowerCase()}`}>{person.role}</span></td>
                      <td><span className={`badge status-${person.status.toLowerCase()}`}>{person.status}</span></td>
                      <td>{new Date(person.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
