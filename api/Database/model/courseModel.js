const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseTitle: { type: String, required: true,unique: true},
    courseDescription: { type: String,},
    exams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;