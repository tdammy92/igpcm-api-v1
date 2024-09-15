const mongoose = require("mongoose");

const serialnumberSchema = new mongoose.Schema(
	{
		serial: { type: String, required: true, unique: true },
		dateGenerated: { type:Date,default:Date.now()},
        dateUsed:{type:Date},
		isValid: {type:Boolean,default:true},
		userType: { type: String, enum: ['Student', 'Certificate'] },
        user:{
            type: mongoose.Schema.Types.ObjectId,
			refPath: 'userType'
        }
	},
	{ timestamps: true }
);

const serialModel = mongoose.model("serialNumber", serialnumberSchema);

module.exports = serialModel;
