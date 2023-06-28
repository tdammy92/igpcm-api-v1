const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
	{
		image: { type: Object, required: true },
		caption: { type: String },
		uploadedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin",
		},
	},
	{ timestamps: true }
);

const galleryModel = mongoose.model("Gallery", gallerySchema);

module.exports = galleryModel;
