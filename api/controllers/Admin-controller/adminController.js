const adminModel = require("../../Database/model/adminModel");
const studentModel = require("../../Database/model/studentModel");
const serialNumberModel = require("../../Database/model/serialnumberModel");
const galleryModel = require("../../Database/model/galleryModel");
const examModel = require("../../Database/model/examsModel");


async function getCounts(req, res) {
  try {
    const totalStudents = await studentModel.estimatedDocumentCount();
    const totalSerialNumber = await serialNumberModel.estimatedDocumentCount();
    const totalGallery = await galleryModel.estimatedDocumentCount();
    const totalExam = await examModel.estimatedDocumentCount();


	const response = {Students: totalStudents, 'Serial Number':totalSerialNumber,Gallery: totalGallery ,Exams:totalExam};

    if (response) {
      return res.status(200).json(
         response
      );
    } else {
      return res.status(401).json({
        Count: Nil,
      });
    }
  } catch (error) {}
}

module.exports = {  getCounts };
