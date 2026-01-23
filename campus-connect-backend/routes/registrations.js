import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// Student registers for an event
router.post("/:eventId", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fields required" });
    }

    const registration = await Registration.create({
      eventId: req.params.eventId,
      name,
      email
    });

    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ message: "Registration failed" });
  }
});

export default router;
