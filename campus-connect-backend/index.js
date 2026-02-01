import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import eventRoutes from "./routes/events.js"


import authRoutes from "./routes/auth.js"
import verifyToken from "./middleware/verifyToken.js"
import { committees } from "./data/committees.js"
import mongoose from "mongoose"
import registrationRoutes from "./routes/registrations.js";

import studentAuthRoutes from "./routes/studentAuth.js"


dotenv.config()

const app = express()

/* ---------- MIDDLEWARE ---------- */
app.use(cors())
app.use(express.json({ limit: "10mb" }))

// connecting backend
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err))


/* ---------- ROUTES ---------- */

// Auth routes (login)
app.use("/api/auth", authRoutes)
app.use("/api/events", eventRoutes) //events mongo
app.use("/api/registrations", registrationRoutes);
app.use("/api/students", studentAuthRoutes)


// Protected dashboard route
app.get("/api/dashboard", verifyToken, (req, res) => {

  // 🔐 ensure only committees access this
  if (req.user.role !== "committee") {
    return res.status(403).json({ message: "Access denied" })
  }

  const committeeId = req.user.id

  const committee = committees.find(
    c => String(c.id) === String(committeeId)
  )

  if (!committee) {
    return res.status(404).json({ message: "Committee not found" })
  }

  res.json({
    committee: {
      id: committee.id,
      name: committee.name,
      description: committee.description
    }
  })
})


/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
