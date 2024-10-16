const { Login, Register } = require("./auth-controller/authController");
const { getCounts } = require("./Admin-controller/adminController");
const {
  getAllserialNumber,
  generateSerialNumber,
  getTotalSerialNumberCount,
  updateSerialNumber,
  validateSerialNumber
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
  getExamById,
  getAllExams,
  uploadExams,
  deleteExams,
} = require("./exam-controller/examController");

const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseName,
  deleteCourseById,
} = require("./course-controller");

const {
  getAllResults,
  getResultById,
  UploadResult,
  deleteResultById,
} = require("./result-controller/resultController");


const {
  getAllCertificate,
  createCertificate,
deleteCertificateById
} = require("./certificate-controller");




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
  validateSerialNumber,
  getRecentStudent,
  getAllImages,
  uploadImage,
  deleteImage,
  getExamById,
  getAllExams,
  uploadExams,
  deleteExams,
  getAllResults,
  getResultById,
  UploadResult,
  deleteResultById,
  getCounts,
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  getAllCertificate,
  createCertificate,
deleteCertificateById,
updateCourseName
};
