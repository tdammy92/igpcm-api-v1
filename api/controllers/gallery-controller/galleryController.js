const galleryModel = require("../../Database/model/galleryModel");
const cloudinary = require("../../utils/cloudinary");

// get all Images route
async function getAllImages(req, res) {
  try {
    const response = await galleryModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

//upload Image to gallery
async function uploadImage(req, res) {
  const body = req?.body;

  const { imageFile, caption, uploadedBy } = body;

  try {
    if (imageFile === "") {
      return res.status(401).json({ message: "Image  file not found" });
    }

    const galleryCount = await galleryModel.estimatedDocumentCount();

    if (galleryCount <= 31) {
      //if image is less that 30 items then upload
      const uploadResponse = await cloudinary.uploader.upload(imageFile, {
        upload_preset: "igpcm_gallery",
      });

      if (!uploadResponse) {
        return res.status(500).json({
          message: "Something went wrong",
          error: error,
        });
      }

      const gallery = new galleryModel({
        image: uploadResponse,
        caption: caption,
        uploadedBy,
      });

      const response = await gallery.save();

      return res.status(201).json(response);
    } else {
      //else if image is  20 or equal to 20 items then remove the first item before upload

      //get last image from DB
      const lastItem = await galleryModel
        .findOne()
        .sort({ field: "asc", _id: 1 })
        .limit(1);

      if (!lastItem)
        return res.status(403).json({ message: "An error Occured" });

      //remove the last image from cloudinary
      const deletedImage = await cloudinary.uploader.destroy(
        lastItem?.image?.public_id
      );

      //if image could not be deleted return an error to the user
      if (deletedImage?.result !== "ok")
        return res.status(403).json({
          message: "Previous image could not be deleted from the cloud",
        });

      const deleteResponse = await galleryModel.findOneAndDelete({
        _id: lastItem?._id,
      });

      //if can not find delete response return an error
      if (!deleteResponse)
        return res.status(403).json({
          message: "Previous Image could not be deleted from the DB",
        });

      //if  image is deleted upload the new image
      const uploadResponse = await cloudinary.uploader.upload(imageFile, {
        upload_preset: "igpcm_gallery",
      });

      if (!uploadResponse) {
        return res.status(500).json({
          message: "Something went wrong",
          error: error,
        });
      }

      const gallery = new galleryModel({
        image: uploadResponse,
        caption: caption,
        uploadedBy,
      });

      const response = await gallery.save();

      return res.status(201).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong from catch",
      error: error,
    });
  }
}

//delete image from gallery
async function deleteImage(req, res) {
  const { mongoDbId, cloudinaryPublic } = req?.body;

  try {
    if (mongoDbId === undefined && cloudinaryPublic === undefined) {
      return res.status(404).json({
        message: "Image could not be deleted ",
      });
    }

    //check if image is in DB
    const isAvailable = await galleryModel.findById({
      _id: mongoDbId,
    });

    // console.log("Image is available", isAvailable?._id.toString());
    if (!isAvailable?.image) {
      return res.status(404).json({
        message: "Image not  found",
      });
    }

    // remove the image from cloudinary
    const deletedImage = await cloudinary.uploader.destroy(cloudinaryPublic);

    //if image could not be deleted return an error to the user
    if (deletedImage?.result !== "ok") {
      return res.status(404).json({
        message: "Image could not be deleted from the cloud",
      });
    }

    //remove the image from MongoDB
    const deleteResponse = await galleryModel.findOneAndDelete({
      _id: mongoDbId,
    });

    if (!deleteResponse?._id?.toString()) {
      return res.status(404).json({
        message: "Image could not be deleted from MOngo",
        error: error,
      });
    }

    return res.status(201).json({
      data: deleteResponse,
      message: "Image deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Image could not be deleted from catch",
      error: error,
    });
  }
}

module.exports = {
  getAllImages,
  uploadImage,
  deleteImage,
};
