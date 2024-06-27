export const API_BASE_URL = 'http://localhost:8000'

export const ApiEndPoints = {
  AUTH: {
    register: `${API_BASE_URL}/api/v1/auth/register`,
    login: `${API_BASE_URL}/api/v1/auth/login`,
    me: `${API_BASE_URL}/api/v1/auth/me`
  },
  DASHBOARD: {
    count: `${API_BASE_URL}/api/v1/settings/dashboard`
  }
}
