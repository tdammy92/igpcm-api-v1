const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    examName: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    questions: [
      {
        qstNumber: { type: Number },
        question: { type: String, required: true },
        options: [String],
        answer: { type: String, required: true },
      },
    ],
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const examModel = mongoose.model("Exam", examSchema);

module.exports = examModel;
