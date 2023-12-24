const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    total_score: { type: Number, required: true },
    total_answered: { type: Number },
    pass: { type: Boolean },
    correct_answers: { type: Number, required: true },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

const resultModel = mongoose.model("Result", resultSchema);

module.exports = resultModel;
