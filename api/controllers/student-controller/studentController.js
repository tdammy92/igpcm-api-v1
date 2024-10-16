const studentModel = require("../../Database/model/studentModel");
const serialNumberModel = require("../../Database/model/serialnumberModel");
const cloudinary = require("../../utils/cloudinary");
const { PAGE_LIMIT } = require("../../utils");

// get all student route
async function getAllStudent(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || PAGE_LIMIT;

  try {
    const startIndex = (page - 1) * limit;
    const total = await studentModel.countDocuments();

    // const response = await  studentModel.find({}).populate('user');
    const result = await studentModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const response = {
      page: result,
      meta: {
        currentPage: page,
        pageLimit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return res.send(response);
  } catch (error) {
    return res.status(500).json({
      message: "Somthing went wrong",
      error: error,
    });
  }
}

// get all student route
async function getRecentStudent(req, res) {
  try {
    // const response = await  studentModel.find({}).populate('user');
    const response = await studentModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5);
    // const recent = response?.slice(0, 5);

    return res.send(response);
  } catch (error) {
    return res.status(500).json({
      message: "Somthing went wrong",
    });
  }
}

// get total student count
async function getTotalStudentCount(req, res) {
  try {
    // const response = await  studentModel.find({}).populate('user');
    const response = await studentModel.estimatedDocumentCount();

    if (response) {
      return res.status(200).json({
        count: response,
      });
    } else {
      return res.status(401).json({
        Count: Nil,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Somthing went wrong",
    });
  }
}

//get student by Id
async function getStudentById(req, res) {
  const id = req.params.id;

  try {
    const response = await studentModel.findById(id);

    if (response) {
      return res.send(response);
    } else {
      return res.status(400).json({
        status: "failure",
        message: "Somthing went wrong",
      });
    }
  } catch (error) {
    // console.log({ error });
    return res.status(400).json({
      status: "failure",
      message: "Somthing went wrong",
    });
  }
}

async function studentRegistration(req, res) {
  const payload = req.body;

  try {
    //check if user email is  already registered:
    const existingUser = await studentModel.findOne({ email: payload.email });

    if (existingUser) {
      //if user exist throw error
      throw new Error("email already in use");
    }

    const passport = payload?.image_data;

    //check if passport was included in the object
    if (!passport || passport === "")
      return res
        .status(404)
        .json({ status: "failed", message: "Please attache a passport" });

    //upload passport
    const uploadPassport = await cloudinary.uploader.upload(passport, {
      upload_preset: "igpcm_passport",
    });

    //check if password was uploaded successfully
    if (!uploadPassport)
      return res
        .status(404)
        .json({ status: "failed", message: "Form could not be uploaded" });

    const heigestQualification = payload?.documents?.higestQualification?.file;
    const heigestQualificationFileName =
      payload?.documents?.higestQualification?.name;

    const jamb = payload?.documents?.jamb?.file;
    const jambFileName = payload?.documents?.jamb?.name;

    let JambQ = null;
    let highestQ = null;

    if (jamb) {
      const jambQualification = await cloudinary.uploader.upload(jamb, {
        upload_preset: "igpcm_document",
      });

      if (jambQualification) {
        JambQ = jambQualification;
      }
    }

    if (heigestQualification) {
      const uploadHighestQualification = await cloudinary.uploader.upload(
        heigestQualification,
        {
          upload_preset: "igpcm_document",
        }
      );

      if (uploadHighestQualification) {
        highestQ = uploadHighestQualification;
      }
    }

    //upload  documents

    const newPayload = {
      passport: uploadPassport,
      title: payload?.title,
      surname: payload?.surname,
      firstName: payload?.firstName,
      middleName: payload?.middleName,
      gender: payload?.gender,
      dob: payload?.dob,
      phoneNumber: payload?.phoneNumber,
      email: payload?.email,
      country: payload?.country,
      state: payload.state,
      eduQualification: payload.eduQualification,
      currentEmploymet: payload?.currentEmploymet,
      membershipCadre: payload?.membershipCadre,
      membershipRoute: payload?.membershipRoute,
      applicationFee: payload.applicationFee,
      paymentMethods: payload?.paymentMethods,
      academicPrograms: payload?.academicPrograms,
      serialNumber: payload?.serialNumber,
      documents: [
        ...(highestQ
          ? [{ name: heigestQualificationFileName, file: highestQ }]
          : []),
        ...(JambQ ? [{ name: jambFileName, file: JambQ }] : []),
      ],
    };

    //submit form
    const newStudent = new studentModel(newPayload);

    const newRegistration = await newStudent.save();

    if (!newRegistration)
      return res
        .status(404)
        .json({ status: "failed", message: "Form could not be Submitted" });

    const updatedSerialNumb = await serialNumberModel.updateOne(
      { _id: newRegistration?.serialNumber },
      { isValid: false, user: newRegistration?._id, dateUsed: Date.now(), userType: "Student", }
    );

    if (!updatedSerialNumb)
      return res
        .status(404)
        .json({ status: "failed", message: "Form could not be Submitted" });

    return res.status(201).json(newRegistration);
  } catch (error) {
    // console.log({ error });
    return res.status(400).json({
      status: "failure",
      message: "user registration failed",
    });
  }
}

//delete student controller
async function deleteStudent(req, res) {
  const { mongoStudentId, cloudinaryPublicIds } = req?.body;

  try {
    const deletedImages = await cloudinary.api.delete_resources(
      cloudinaryPublicIds,
      function (error, result) {
        // console.log(result, error);
      }
    );
    //remove the image from MongoDB
    const deleteResponse = await studentModel.findOneAndDelete({
      _id: mongoStudentId,
    });

    if (!deleteResponse?._id?.toString()) {
      return res.status(404).json({
        message: "student could not be deleted",
        error: error,
      });
    }

    return res.status(200).json({
      data: deleteResponse,
      message: "student deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        typeof error === "string"
          ? error
          : error?.message ?? "Invalid Serial Number",
    });
  }

  //   studentModel.findByIdAndDelete(Id, (err, newStudent) => {
  //     if (err) {
  //       return res.status(404).json({
  //         message: err,
  //       });
  //     }

  //     return res.json({
  //       data: newStudent,
  //       message: "student deleted successfully",
  //     });
  //   });
}

module.exports = {
  getAllStudent,
  getRecentStudent,
  getTotalStudentCount,
  getStudentById,
  studentRegistration,
  deleteStudent,
};
