const adminModel = require("../../Database/model/adminModel");
const certificateModel = require("../../Database/model/certificateModel");
const serialNumberModel = require("../../Database/model/serialnumberModel");

// get all results
async function getAllCertificate(req, res) {
  // const type = req.query?.type;

  try {
    const response = await certificateModel
      .find({})
      .populate({ path: "selectedCourse", select: ["courseTitle"] })
      .sort({ createdAt: -1 });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

//upload results
async function createCertificate(req, res) {
  const payload = await req.body;

  try {
    //check if certificate doesnt not exist
    const checkCertificate = await certificateModel
      .where({
        studentName: payload?.studentName,
        selectedCourse: payload?.selectedCourse,
      })
      .findOne();

    //if certificate already exist return
    if (checkCertificate) {
      throw new Error("certificate has already been created");
    }

    //get serial number id;
    const querySerial = payload?.serialNumber;
    const serialQ = serialNumberModel.where({ serial: querySerial });
    const serial = await serialQ.findOne();

    //update certificate data
    const uploadData = {
      ...payload,
      serialNumber: serial?._id,
    };

    //save certificate
    const result = new certificateModel(uploadData);
    const response = await result.save();

    if (!response) {
      throw new Error("certificate could'nt be created");
    }

    //update serial number
    const updatedSerialNumb = await serialNumberModel.updateOne(
      { _id: serial?._id },
      {
        isValid: false,
        user: response?._id,
        userType: "Certificate",
        dateUsed: Date.now(),
      }
    );

    return res.status(201).json({
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
}

//delete a result
async function deleteCertificateById(req, res) {
  const certificateId = req.params?.id;
  const profileId = req.body?.profileId;

  try {
        //check if certificate doesnt not exist
        const checkIsSuperAdmin = await adminModel
        .where({
          _id: profileId,
          role: 'SUPER_ADMIN',
        })
        .findOne();
  
    
      if (!checkIsSuperAdmin) {
        throw new Error("Authorization failed");
      }

    //remove certificate
    const deleteResponse = await certificateModel.findOneAndDelete({
      _id: certificateId,
    });


    // if certificate is not found return
    if (!deleteResponse) {
      throw new Error("could not delete certficate");
    }

    return res.status(201).json({
      data: "Certificate deleted",
    });

  } catch (error) {
    return res.status(500).json({
      message: "could not delete certficate",
      error: error,
    });
  }
}

module.exports = {
  getAllCertificate,
  createCertificate,
  deleteCertificateById,
};
