export const setupInterceptors = (api) => {
    // Request interceptor
    api.interceptors.request.use(
      (config) => {
        // Get token from localStorage
        const token = localStorage.getItem("token")
  
        // If token exists, add to headers
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
  
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  
    // Response interceptor
    api.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // Handle 401 Unauthorized errors
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token")
          window.location.href = "/login"
        }
  
        return Promise.reject(error)
      },
    )
  }
  
  