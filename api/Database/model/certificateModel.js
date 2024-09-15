const { required } = require("joi");
const mongoose = require("mongoose");



const certificateSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    selectedCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    genrated: { type: String, enum: ['automated', 'manual'], default: 'manual' },
    dateGenerated:{type:Date,required:true},
    serialNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serialNumber",
    },
  },
  { timestamps: true }
);

const certificateModel = mongoose.model("Certificate", certificateSchema);

module.exports = certificateModel;