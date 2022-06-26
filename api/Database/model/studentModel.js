const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		surname: { type: String, required: true },
		firstName: { type: String, required: true },
		middleName: { type: String },
		dob: { type: Date },
		email: { type: String, required: true, unique: true, lowercase: true },
		phoneNumber: String,
		country: { type: String },
		state: { type: String },
		eduQualification: { type: String },
		password: { type: String, required: true, minlength: 6 },

		currentEmploymet: {
			organization: { type: String },
			startDate: { type: Date },
			position: { type: String },
			location: { type: String },
		},

		membershipCadre: {
			type: String,
		},

		applicationFee: {
			type: String,
		},
	},
	{ timestamps: true }
);

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
