const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    passport: { type: Object, required: true },
    title: { type: String },
    surname: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    gender: {
      type: String,
      // enum: ["Male", "Female", "other"],
      // default: "Male",
    },
    dob: { type: Date },
    email: {
      type: String,
      required: [true, "please enter a valid email"],
      unique: [true, "The email is already in use"],
      lowercase: true,
    },
    phoneNumber: String,
    country: { type: String },
    state: { type: String },
    eduQualification: { type: String },

    currentEmploymet: {
      organization: { type: String },
      startDate: { type: Date },
      position: { type: String },
      yearsExperience: { type: String },
      location: { type: String },
    },

    membershipCadre: {
      type: String,
    },

    membershipRoute: {
      type: String,
    },

    applicationFee: {
      type: String,
    },

    paymentMethods: {
      type: String,
    },

    documents: { type: Array, default: [] },

    academicPrograms: { type: Array, default: [] },

    serialNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serialNumber",
    },

    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result",
      },
    ],
    Exams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
  },
  { timestamps: true }
);

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
