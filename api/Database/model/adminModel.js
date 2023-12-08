const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    isSuperAdmin: { type: Boolean, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
