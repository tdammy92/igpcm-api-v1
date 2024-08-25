const mongoose = require("mongoose");

const studentExamSchema = new mongoose.Schema(
    {
        studentExamId: { type: mongoose.Schema.Types.ObjectId, auto: true },
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
        score: { type: Number },
        
    },
    { timestamps: true }
);

const studentExamModel = mongoose.model("studentExam", studentExamSchema);

module.exports = studentExamModel;