import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    venue: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    poster: {
      type: String,
      default: ""
    },

    tags: {
      type: [String],
      default: []
    },

    updates: [
      {
        message: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    isCompleted: {
      type: Boolean,
      default: false
    },

    committeeId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Event = mongoose.model("Event", eventSchema)

export default Event
