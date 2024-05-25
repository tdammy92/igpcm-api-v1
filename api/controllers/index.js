const { Login, Register } = require("./Admin-controller/adminController");
const {
  getAllserialNumber,
  generateSerialNumber,
  getTotalSerialNumberCount,
  updateSerialNumber,
} = require("./serialNumber-Controller/serialNumberController");

const {
  getAllStudent,
  getRecentStudent,
  getTotalStudentCount,
  getStudentById,
  studentRegistration,
  deleteStudent,
} = require("./student-controller/studentController");

const {
  getAllImages,
  uploadImage,
  deleteImage,
} = require("./gallery-controller/galleryController");

const {
  getAllExams,
  uploadExams,
  deleteExams,
} = require("./exam-controller/examController");

const {
  getAllResults,
  getResultById,
  UploadResult,
  deleteResultById,
} = require("./result-controller/resultController");

module.exports = {
  Login,
  Register,
  getTotalStudentCount,
  getAllStudent,
  getStudentById,
  studentRegistration,
  deleteStudent,
  getAllserialNumber,
  getTotalSerialNumberCount,
  generateSerialNumber,
  updateSerialNumber,
  getRecentStudent,
  getAllImages,
  uploadImage,
  deleteImage,
  getAllExams,
  uploadExams,
  deleteExams,
  getAllResults,
  getResultById,
  UploadResult,
  deleteResultById,
};
