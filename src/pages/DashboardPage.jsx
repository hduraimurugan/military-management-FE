// src/pages/DashboardPage.jsx
import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Optional: Add this effect to protect dashboard further
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className="p-8">
      <div className="card bg-base-100 shadow-lg max-w-md mx-auto">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p>Welcome back, <strong>{user?.name}</strong>!</p>
          <p className="mt-2 text-sm text-gray-500">{user?.email}</p>

          <div className="mt-6 flex gap-4">
            <button onClick={logout} className="btn btn-outline btn-error btn-sm">
              Logout
            </button>
            <Link to="/" className="btn btn-primary btn-sm">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}