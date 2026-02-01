import express from "express"
import Event from "../models/Event.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

/* 🔓 PUBLIC — GET ALL EVENTS */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.json(events)
  } catch {
    res.status(500).json({ message: "Failed to fetch events" })
  }
})

/* 🔒 COMMITTEE — GET MY EVENTS */
router.get("/my", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "committee") {
      return res.status(403).json({ message: "Access denied" })
    }

    const events = await Event.find({
      committeeId: req.user.id
    })

    res.json(events)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

/* 🔒 COMMITTEE — CREATE EVENT */
router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "committee") {
      return res.status(403).json({ message: "Access denied" })
    }

    const {
      title,
      description,
      venue,
      date,
      time,
      poster,
      tags
    } = req.body

    const event = new Event({
      title,
      description,
      venue,
      date,
      time,
      poster,
      tags,
      committeeId: req.user.id
    })

    await event.save()
    res.status(201).json(event)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: "Event creation failed" })
  }
})

/* 🔒 COMMITTEE — UPDATE EVENT */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "committee") {
      return res.status(403).json({ message: "Access denied" })
    }

    const event = await Event.findById(req.params.id)

    if (!event)
      return res.status(404).json({ message: "Event not found" })

    if (event.committeeId !== req.user.id)
      return res.status(403).json({ message: "Not allowed" })

    Object.assign(event, req.body)
    await event.save()

    res.json(event)
  } catch {
    res.status(400).json({ message: "Invalid event ID" })
  }
})

/* 🔒 COMMITTEE — DELETE EVENT */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "committee") {
      return res.status(403).json({ message: "Access denied" })
    }

    const event = await Event.findById(req.params.id)

    if (!event)
      return res.status(404).json({ message: "Event not found" })

    if (event.committeeId !== req.user.id)
      return res.status(403).json({ message: "Not allowed" })

    await event.deleteOne()
    res.json({ message: "Event deleted" })
  } catch {
    res.status(400).json({ message: "Invalid event ID" })
  }
})

export default router
