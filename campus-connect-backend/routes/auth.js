import express from "express"
import jwt from "jsonwebtoken"
import { committees } from "../data/committees.js"

const router = express.Router()

router.post("/login", (req, res) => {
  const { username, password } = req.body

  const committee = committees.find(
    c => c.username === username && c.password === password
  )

  if (!committee) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    {
      id: committee.id,          // ✅ unified ID
      role: "committee",         // ✅ role-based auth
      name: committee.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({
    token,
    committee: {
      id: committee.id,
      name: committee.name
    }
  })
})

export default router
