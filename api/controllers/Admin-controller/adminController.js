const adminModel = require("../../Database/model/adminModel");
const studentModel = require("../../Database/model/studentModel");
const serialNumberModel = require("../../Database/model/serialnumberModel");
const galleryModel = require("../../Database/model/galleryModel");
const examModel = require("../../Database/model/examsModel");
const courseModel = require("../../Database/model/courseModel");
const certificateModel = require("../../Database/model/certificateModel");


async function getCounts(req, res) {
  try {
    const totalStudents = await studentModel.estimatedDocumentCount();
    const totalSerialNumber = await serialNumberModel.estimatedDocumentCount();
    const totalGallery = await galleryModel.estimatedDocumentCount();
    const totalExam = await examModel.estimatedDocumentCount();
    const totalCourses = await courseModel.estimatedDocumentCount();
    const totalCertificate = await certificateModel.estimatedDocumentCount();

    const response = {
      Students: totalStudents,
      "Serial Number": totalSerialNumber,
      Gallery: totalGallery,
      Exams: totalExam,
      Courses: totalCourses,
      "Student Certificate":totalCertificate
    };

    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(401).json({
        Count: Nil,
      });
    }
  } catch (error) {}
}

module.exports = { getCounts };
