const mongoose = require("mongoose");

const serialnumberSchema = new mongoose.Schema(
	{
		serial: { type: String, required: true, unique: true },
		dateGenerated: { type:Date,default:Date.now()},
        dateUsed:{type:Date},
		isValid: {type:Boolean,default:true},
        user:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
        }
	},
	{ timestamps: true }
);

const serialModel = mongoose.model("serialNumber", serialnumberSchema);

module.exports = serialModel;
