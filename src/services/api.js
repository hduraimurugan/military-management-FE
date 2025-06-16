const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1616"

// Assets API
export const assetsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/settings/assets/get`)
    if (!response.ok) throw new Error("Failed to fetch assets")
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/assets/get/${id}`)
    if (!response.ok) throw new Error("Failed to fetch asset")
    return response.json()
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/assets/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create asset")
    return response.json()
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/assets/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update asset")
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/assets/delete/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete asset")
    return response.json()
  },
}

// Bases API
export const basesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/settings/bases/get`)
    if (!response.ok) throw new Error("Failed to fetch bases")
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/bases/get/${id}`)
    if (!response.ok) throw new Error("Failed to fetch base")
    return response.json()
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/bases/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create base")
    return response.json()
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/bases/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update base")
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/bases/delete/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete base")
    return response.json()
  },
}

// User Api
export const userAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/get`)
    if (!response.ok) throw new Error("Failed to fetch users")
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/get/${id}`)
    if (!response.ok) throw new Error("Failed to fetch user")
    return response.json()
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create user")
    return response.json()
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update user")
    return response.json()
  },

  updatePassword: async (id, passwordData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/${id}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    })
    if (!response.ok) throw new Error("Failed to update password")
    return response.json()
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/delete/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete user")
    return response.json()
  },
}