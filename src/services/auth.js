// Simple JWT helpers
export const TOKEN_KEY = 'accessToken'
export const USER_KEY = 'user'

export function saveAuth({ accessToken, user }) {
  if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken)
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  window.location.href = '/login'
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function isAuthed() {
  return !!getToken()
}

export function hasRole(role) {
  const u = getUser()
  return u && u.role === role
}
