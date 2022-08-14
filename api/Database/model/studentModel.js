const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
	{
	

			title: { type: String, required: true, },
			surname: { type: String, required: true },
			firstName: { type: String, required: true },
			middleName: { type: String },
			dob: { type: Date },
			email: { type: String, required: [true,"please enter a valid email"], unique: [true,"The email is already in use"], lowercase: true },
			phoneNumber: String,
			country: { type: String },
			state: { type: String },
			eduQualification: { type: String },
	
	
		currentEmploymet: {
			organization: { type: String },
			startDate: { type: Date },
			position: { type: String },
			location: { type: String },
		},

		membershipCadre: {
			type: String,
		},

		membershipType:{
			type:[String]
		},
		academicPrograms:{
			type:[String]
		},

		membershipRoute:{
			type:String
		},

		applicationFee: {
			type: String,
		},
		pgdCourses: {
			type: String,
		},
		paymentMethods: {
			type: String,
		},

		serialNumber:{
	
				type: mongoose.Schema.Types.ObjectId,
				ref: "serialNumber",
		
		}
	},
	{ timestamps: true }
);

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
