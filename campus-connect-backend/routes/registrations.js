import express from "express"
import Registration from "../models/Registration.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

// 🔒 STUDENT — REGISTER FOR EVENT
router.post("/:eventId", verifyToken, async (req, res) => {
  try {
    // only students can register
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can register" })
    }

    const registration = await Registration.create({
      studentId: req.user.id,
      eventId: req.params.eventId
    })

    res.status(201).json(registration)
  } catch (err) {
    // duplicate registration
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already registered" })
    }

    res.status(500).json({ message: "Registration failed" })
  }
})

// 🔒 STUDENT — CHECK IF ALREADY REGISTERED
router.get("/:eventId", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.json({ registered: false })
    }

    const exists = await Registration.findOne({
      studentId: req.user.id,
      eventId: req.params.eventId
    })

    res.json({ registered: !!exists })
  } catch {
    res.json({ registered: false })
  }
})

export default router
