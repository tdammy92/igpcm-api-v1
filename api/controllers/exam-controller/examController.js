const examModel = require("../../Database/model/examsModel");
const cloudinary = require("../../utils/cloudinary");

// get all exams
async function getAllExams(req, res) {
  console.log("gettng all exams");
  try {
    return res.status(200).json({
      data: "All exams",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

//upload exams
async function uploadExams(req, res) {
  console.log("uploading exams");
  try {
    return res.status(201).json({
      data: "Exam uploaded",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong from catch",
      error: error,
    });
  }
}

//delete an exam
async function deleteExams(req, res) {
  console.log("deleting exams");
  try {
    return res.status(201).json({
      data: "Exam deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Image could not be deleted from catch",
      error: error,
    });
  }
}

module.exports = { getAllExams, uploadExams, deleteExams };
