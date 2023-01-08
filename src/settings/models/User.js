const mongoose = require("mongoose");

// The heart of the User, here is everything saved that the User does.
// Such as Levels, Courses, Premium, Enrolled, XP, Leaderboard.
const user = mongoose.Schema({
  Id: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  isPremium: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  premium: {
    redeemedBy: {
      type: mongoose.SchemaTypes.Array,
      default: null,
    },

    redeemedAt: {
      type: mongoose.SchemaTypes.Number,
      default: null,
    },

    expiresAt: {
      type: mongoose.SchemaTypes.Number,
      default: null,
    },

    plan: {
      type: mongoose.SchemaTypes.String,
      default: null,
    },
  },
});
module.exports = mongoose.model("user", user);
