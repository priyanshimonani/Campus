import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

API.interceptors.request.use(req => {
  const studentToken = localStorage.getItem("studentToken")
  const committeeToken = localStorage.getItem("token")

  // Prefer student token if available
  const token = studentToken || committeeToken

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})


export default API