import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"]

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" })
  }

  const parts = authHeader.split(" ")

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid authorization format" })
  }

  const token = parts[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.committee = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export default verifyToken
