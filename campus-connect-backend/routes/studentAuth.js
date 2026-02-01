import express from "express"
import jwt from "jsonwebtoken"
import Student from "../models/Student.js"

const router = express.Router()

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body

  try {
    const exists = await Student.findOne({ email })
    if (exists)
      return res.status(400).json({ message: "Email already registered" })

    const student = await Student.create({ name, email, password })

    res.status(201).json({ message: "Signup successful" })
  } catch {
    res.status(500).json({ message: "Signup failed" })
  }
})

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const student = await Student.findOne({ email })

    if (!student || student.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      {
        id: student._id,
        role: "student",
        name: student.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name
      }
    })
  } catch {
    res.status(500).json({ message: "Login failed" })
  }
})

export default router
