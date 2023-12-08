const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    examName: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: [String],
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const ExamModel = mongoose.model("Exam", examSchema);

module.exports = ExamModel;
